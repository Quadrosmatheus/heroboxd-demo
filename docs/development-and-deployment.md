# Desenvolvimento e publicação

## Requisitos

- Node.js 24 LTS.
- MySQL 8.4 ou superior.
- PowerShell para o atalho local de Windows; em outros sistemas, use um serviço MySQL instalado.

## Instalação em um clone limpo

Na raiz do repositório:

```powershell
npm ci
Copy-Item .env.example .env
```

Edite `.env` e configure as credenciais locais do MySQL. Depois, abra o cliente MySQL a partir da raiz e importe o esquema:

```powershell
mysql -u root -p
```

No prompt do MySQL:

```sql
source backend/schema.sql
```

Volte ao terminal do projeto, preencha o catálogo e inicie o servidor:

```powershell
npm run seed
npm start
```

O servidor local usa `127.0.0.1` e `PORT` do `.env` (4175 por padrão). `npm run seed` sincroniza os 80 títulos demonstrativos; os registros que não fazem parte do catálogo atual são marcados como inativos.

## Atalho local do Windows

`start-local.ps1` e `stop-local.ps1` são conveniências para esta instalação já preparada. Elas esperam encontrar a distribuição MySQL portátil em `tools/mysql-8.4.11-winx64/` e os dados em `data/`. Essas pastas são locais e estão excluídas do Git; por isso, o atalho não funciona sozinho em um clone novo. Para um clone novo, instale MySQL e siga a seção anterior.

Se a porta `4175` estiver ocupada, altere `PORT` no `.env`; o inicializador seguirá esse valor.

## Variáveis de ambiente

| Variável | Uso | Exemplo local |
| --- | --- | --- |
| `PORT` | Porta HTTP da aplicação | `4175` |
| `NODE_ENV` | Ambiente (`development` ou `production`) | `development` |
| `DB_HOST` | Host MySQL | `127.0.0.1` |
| `DB_PORT` | Porta MySQL | `3306` |
| `DB_USER` | Usuário MySQL | `root` |
| `DB_PASSWORD` | Senha do banco | Defina localmente; nunca versione |
| `DB_NAME` | Banco da aplicação | `heroboxd` |
| `SESSION_DAYS` | Duração máxima da sessão | `30` |
| `PUBLIC_BASE_URL` | URL base para gerar links de redefinição | `http://127.0.0.1:4175` |
| `RESEND_API_KEY` | Chave secreta Resend para e-mails transacionais | Configure no painel de segredos |
| `MAIL_FROM` | Remetente verificado no Resend | `HeroBoxd <contato@seudominio.com>` |

`.env.example` contém valores de demonstração. `.env` e outros arquivos `.env*` são ignorados pelo Git.

## Atualizar um banco existente

Para uma instalação criada antes do campo idade e nome maior, abra o cliente MySQL e execute uma vez:

```sql
source backend/migrations/001_add_user_age.sql
```

A migração preserva contas antigas; idade fica `NULL` para quem já estava cadastrado.

Para habilitar redefinição de senha em um banco existente, execute também `backend/migrations/002_add_password_reset_tokens.sql` uma vez.

## Publicar a aplicação

O repositório contém a aplicação, mas não inclui hospedagem, credenciais nem um banco remoto. Para compartilhar avaliações entre visitantes:

1. Escolha um host que execute Node.js 24 LTS (ou aceite a imagem Docker incluída) e um serviço MySQL 8.4+ persistente.
2. Configure as variáveis acima no painel de segredos do host. Use uma conta MySQL dedicada, acesso limitado e senha forte.
3. Importe `backend/schema.sql` no banco de produção e execute `npm run seed` uma vez para criar o catálogo inicial.
4. Defina `NODE_ENV=production`, `PORT` fornecida pelo host e termine TLS em um proxy HTTPS confiável.
5. Configure backup/restauração do banco, logs e monitoramento. Não exponha a porta MySQL à internet.

Em produção o Express escuta na interface do host e marca cookies de sessão como `Secure`. O banco local não deve ser copiado para produção nem compartilhado com GitHub.

### Imagem Docker

O `Dockerfile` usa Node.js 24 Alpine, instala apenas dependências de produção, executa com usuário sem privilégios e verifica `/api/health`. Construa a imagem na raiz com `docker build -t heroboxd .`. No host, configure as variáveis listadas acima; não inclua `.env`, arquivos do banco local ou credenciais na imagem.

### Antes de abrir o cadastro ao público

- Configure uma chave Resend, remetente verificado e `PUBLIC_BASE_URL` HTTPS para enviar links de redefinição. Em bancos existentes, aplique a migração 002. `npm run reset:local-password` serve apenas ao banco local.
- O servidor já limita login (8 tentativas por 15 min) e cadastro (5 por hora) por endereço, em memória. Em múltiplas instâncias, use limites compartilhados no proxy ou armazenamento compartilhado.
- A política inicial está em `frontend/public/privacidade.html`. Informe o contato do operador e confirme retenção, backups e processos reais antes de abrir o cadastro.
- O usuário pode solicitar exclusão da conta; isso remove em cascata avaliações, listas e sessões. Backups antigos seguem o ciclo de retenção do operador.
- A licença MIT cobre somente o código original. Verifique os direitos das imagens, marcas e personagens de terceiros antes de uso público.
- As miniaturas do catálogo vêm das páginas da Wikimedia e podem incluir imagens com licenças diferentes, inclusive conteúdo não livre. Antes de publicar o site, confira a licença e a atribuição de cada imagem e substitua as que não puder usar.
- `npm test` e `npm run check` rodam localmente e no GitHub Actions. O workflow não publica automaticamente o site.

## Enviar o código ao GitHub

O checkout local está organizado na branch `main`, com `.env`, banco, dependências e binários ignorados. Depois de criar um repositório vazio no GitHub, configure o remoto, revise o staging e envie o primeiro commit:

```powershell
git remote add origin <URL-DO-REPOSITORIO>
git status
git diff --cached
git commit -m "chore: prepare HeroBoxd portfolio"
git push -u origin main
```

Confira `git status --ignored` antes do envio para confirmar que arquivos de ambiente e dados locais continuam fora do repositório.
