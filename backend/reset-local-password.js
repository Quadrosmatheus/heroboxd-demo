'use strict';

const crypto = require('node:crypto');
const readline = require('node:readline');
const { createInterface } = require('node:readline/promises');
const mysql = require('mysql2/promise');

if (process.env.NODE_ENV === 'production') {
  console.error('Esta ferramenta é apenas para recuperação local; não execute em produção.');
  process.exit(1);
}

function askHidden(prompt) {
  return new Promise((resolve, reject) => {
    if (!process.stdin.isTTY || typeof process.stdin.setRawMode !== 'function') {
      reject(new Error('Execute este comando em um terminal interativo.'));
      return;
    }
    readline.emitKeypressEvents(process.stdin);
    const wasRaw = process.stdin.isRaw;
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdout.write(prompt);
    let value = '';
    const cleanup = () => {
      process.stdin.removeListener('keypress', onKeypress);
      process.stdin.setRawMode(wasRaw);
      process.stdin.pause();
    };
    const onKeypress = (character, key = {}) => {
      if (key.ctrl && key.name === 'c') {
        cleanup();
        process.stdout.write('\n');
        reject(new Error('Operação cancelada.'));
      } else if (key.name === 'return' || key.name === 'enter') {
        cleanup();
        process.stdout.write('\n');
        resolve(value);
      } else if (key.name === 'backspace') {
        value = value.slice(0, -1);
        process.stdout.write('\b \b');
      } else if (typeof character === 'string' && character.length === 1 && !key.ctrl && !key.meta) {
        value += character;
        process.stdout.write('*');
      }
    };
    process.stdin.on('keypress', onKeypress);
  });
}

async function main() {
  const input = createInterface({ input: process.stdin, output: process.stdout });
  let pool;
  try {
    const dbHost = process.env.DB_HOST || '127.0.0.1';
    if (!['127.0.0.1', 'localhost', '::1'].includes(dbHost.toLowerCase())) {
      throw new Error('Por segurança, a redefinição só funciona com um MySQL local configurado no .env.');
    }
    const email = (await input.question('E-mail da conta: ')).trim().toLowerCase();
    input.close();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('Informe um e-mail válido.');
    const password = await askHidden('Nova senha (10 a 200 caracteres): ');
    if (password.length < 10 || password.length > 200) throw new Error('A senha deve ter entre 10 e 200 caracteres.');
    const confirmation = await askHidden('Confirme a nova senha: ');
    if (password !== confirmation) throw new Error('As senhas não coincidem.');

    pool = mysql.createPool({
      host: dbHost,
      port: Number(process.env.DB_PORT || 3306),
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'heroboxd',
    });
    const [users] = await pool.execute('SELECT id FROM users WHERE email=? LIMIT 1', [email]);
    if (!users.length) throw new Error('Não encontrei uma conta com esse e-mail neste banco. Confira o .env e tente novamente.');
    const salt = crypto.randomBytes(16);
    const hash = await new Promise((resolve, reject) => {
      crypto.scrypt(password, salt, 64, (error, derived) => error ? reject(error) : resolve(derived));
    });
    await pool.execute('UPDATE users SET password_hash=?,password_salt=? WHERE id=?', [hash, salt, users[0].id]);
    await pool.execute('DELETE FROM sessions WHERE user_id=?', [users[0].id]);
    console.log('Senha redefinida. Entre no site com o e-mail informado e a nova senha.');
  } finally {
    input.close();
    if (pool) await pool.end();
  }
}

main().catch(error => {
  console.error(error.message);
  process.exitCode = 1;
});
