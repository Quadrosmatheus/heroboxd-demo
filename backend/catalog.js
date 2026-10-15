'use strict';

const items = [
  // Filmes (20)
  ['Filme','Marvel',2019,'Vingadores: Ultimato','Avengers: Endgame','Após perderem metade de toda a vida no universo, os Vingadores restantes se reúnem para tentar desfazer o estalo de Thanos.'],
  ['Filme','Marvel',2018,'Vingadores: Guerra Infinita','Avengers: Infinity War','Thanos inicia sua busca pelas Joias do Infinito, obrigando heróis de diferentes mundos a defender o universo.'],
  ['Filme','Marvel',2021,'Homem-Aranha: Sem Volta para Casa','Spider-Man: No Way Home','Peter Parker pede ajuda ao Doutor Estranho quando sua identidade pública transforma sua vida e a de seus amigos.'],
  ['Filme','Marvel',2018,'Homem-Aranha no Aranhaverso','Spider-Man: Into the Spider-Verse','Miles Morales descobre seus poderes e encontra outras versões do Homem-Aranha vindas de universos paralelos.'],
  ['Filme','Marvel',2018,'Pantera Negra','Black Panther (film)','T’Challa retorna a Wakanda para assumir o trono e proteger o futuro de seu povo diante de um desafiante.'],
  ['Filme','Marvel',2008,'Homem de Ferro','Iron Man','Depois de escapar do cativeiro, Tony Stark transforma sua tecnologia em uma armadura e decide redefinir o próprio legado.'],
  ['Filme','Marvel',2014,'Guardiões da Galáxia','Guardians of the Galaxy','Um grupo improvável de foras da lei precisa trabalhar junto para impedir que uma arma poderosa ameace a galáxia.'],
  ['Filme','Marvel',2014,'Capitão América: O Soldado Invernal','Captain America: The Winter Soldier','Steve Rogers investiga uma conspiração dentro da S.H.I.E.L.D. e enfrenta um adversário ligado ao seu passado.'],
  ['Filme','Marvel',2017,'Thor: Ragnarok','Thor: Ragnarok','Sem seu martelo e longe de Asgard, Thor precisa escapar de uma arena e impedir a destruição de seu reino.'],
  ['Filme','Marvel',2016,'Doutor Estranho','Doctor Strange','Um cirurgião brilhante aprende as artes místicas e descobre ameaças que desafiam as leis do tempo e do espaço.'],
  ['Filme','Marvel',2017,'Logan','Logan (film)','Em um futuro sombrio, Logan protege uma jovem mutante durante uma jornada que coloca à prova seu último vínculo com a esperança.'],
  ['Filme','Marvel',2016,'Deadpool','Deadpool','Após um tratamento experimental, Wade Wilson adota uma identidade irreverente e parte atrás de quem destruiu sua vida.'],
  ['Filme','Marvel',2014,'X-Men: Dias de um Futuro Esquecido','X-Men: Days of Future Past','Mutantes de duas épocas tentam alterar um acontecimento que ameaça apagar o futuro de sua espécie.'],
  ['Filme','DC',2008,'Batman: O Cavaleiro das Trevas','The Dark Knight','Batman, Gordon e Harvey Dent enfrentam um criminoso que usa o caos para testar os limites de Gotham.'],
  ['Filme','DC',2005,'Batman Begins','Batman Begins','Bruce Wayne retorna a Gotham e transforma o medo que o marcou em uma missão para combater o crime.'],
  ['Filme','DC',2019,'Coringa','Joker (2019 film)','Arthur Fleck enfrenta o isolamento e a desigualdade em uma cidade que parece não enxergar sua existência.'],
  ['Filme','DC',2017,'Mulher-Maravilha','Wonder Woman','Diana deixa sua ilha para descobrir seu papel em um mundo devastado pela guerra.'],
  ['Filme','DC',1978,'Superman: O Filme','Superman','Criado na Terra após a destruição de Krypton, Clark Kent aprende a usar seus poderes para proteger a humanidade.'],
  ['Filme','DC',2018,'Aquaman','Aquaman (film)','Arthur Curry precisa aceitar sua herança atlante e impedir uma guerra entre os oceanos e a superfície.'],
  ['Filme','DC',2022,'The Batman','The Batman','Em seu segundo ano como vigilante, Batman segue pistas de um criminoso que expõe a corrupção de Gotham.'],

  // Séries (20)
  ['Série','Marvel',2015,'Demolidor','Daredevil (TV series)','Matt Murdock equilibra seu trabalho como advogado com a luta noturna contra o crime em Hell’s Kitchen.'],
  ['Série','Marvel',2021,'WandaVision','WandaVision','Wanda e Visão vivem uma rotina suburbana que muda de época a cada episódio e esconde uma realidade inquietante.'],
  ['Série','Marvel',2021,'Loki','Loki (TV series)','Uma versão de Loki capturada pela AVT precisa ajudar a investigar rupturas na linha do tempo.'],
  ['Série','Marvel',2024,'X-Men ’97',"X-Men '97",'Os X-Men retomam a luta por convivência e justiça em um mundo que ainda teme os mutantes.'],
  ['Série','Marvel',2015,'Jessica Jones','Jessica Jones (TV series)','A investigadora particular Jessica Jones tenta reconstruir a própria vida enquanto encara um inimigo de seu passado.'],
  ['Série','Marvel',2021,'Falcão e o Soldado Invernal','The Falcon and the Winter Soldier','Sam Wilson e Bucky Barnes enfrentam uma crise global enquanto decidem o que significa carregar o escudo.'],
  ['Série','Marvel',2021,'Gavião Arqueiro','Hawkeye (2021 TV series)','Clint Barton tenta voltar para casa antes do Natal e acaba treinando uma jovem arqueira em Nova York.'],
  ['Série','Marvel',2022,'Cavaleiro da Lua','Moon Knight (TV series)','Um funcionário de museu descobre outra identidade e uma ligação perigosa com a mitologia egípcia.'],
  ['Série','Marvel',2022,'Ms. Marvel','Ms. Marvel (TV series)','Kamala Khan descobre habilidades extraordinárias e procura seu lugar entre família, comunidade e heroísmo.'],
  ['Série','Marvel',2013,'Agentes da S.H.I.E.L.D.','Agents of S.H.I.E.L.D.','Uma equipe liderada por Phil Coulson investiga ameaças extraordinárias em missões ao redor do mundo.'],
  ['Série','DC',1992,'Batman: A Série Animada','Batman: The Animated Series','Bruce Wayne enfrenta os criminosos de Gotham em histórias noir que exploram tanto o herói quanto seus adversários.'],
  ['Série','DC',2001,'Smallville','Smallville','Clark Kent cresce no Kansas e aprende, aos poucos, a lidar com seus poderes e com o destino que o aguarda.'],
  ['Série','DC',2012,'Arrow','Arrow (TV series)','Oliver Queen retorna a Starling City e usa suas habilidades para enfrentar uma rede de corrupção e violência.'],
  ['Série','DC',2014,'The Flash','The Flash (2014 TV series)','Barry Allen ganha supervelocidade e passa a proteger Central City ao lado de uma equipe de aliados.'],
  ['Série','DC',2022,'Pacificador','Peacemaker (TV series)','Christopher Smith recebe uma nova missão e tenta conciliar sua violência com relações que nunca soube construir.'],
  ['Série','DC',2019,'Patrulha do Destino','Doom Patrol (TV series)','Um grupo de pessoas transformadas por acidentes improváveis enfrenta ameaças enquanto procura pertencimento.'],
  ['Série','Outros',2019,'The Boys','The Boys (TV series)','Um grupo de vigilantes tenta expor os abusos de super-heróis celebrados por uma poderosa corporação.'],
  ['Série','Outros',2021,'Invencível','Invincible (TV series)','Mark Grayson descobre seus poderes e aprende que ser filho do maior herói da Terra envolve escolhas difíceis.'],
  ['Série','Outros',2019,'The Umbrella Academy','The Umbrella Academy (TV series)','Irmãos adotivos com poderes se reencontram e tentam impedir uma catástrofe ligada ao próprio passado.'],
  ['Série','Outros',2015,'One-Punch Man','One-Punch Man','Saitama procura um desafio à altura em um mundo onde monstros e heróis disputam a atenção do público.'],

  // Jogos (20)
  ['Jogo','Marvel',2018,'Marvel’s Spider-Man',"Marvel's Spider-Man (2018 video game)",'Peter Parker protege Nova York enquanto equilibra sua vida pessoal e a responsabilidade de ser o Homem-Aranha.'],
  ['Jogo','Marvel',2020,'Marvel’s Spider-Man: Miles Morales','Spider-Man: Miles Morales','Miles assume a defesa de Harlem e aprende a dominar poderes que o distinguem de Peter Parker.'],
  ['Jogo','Marvel',2023,'Marvel’s Spider-Man 2',"Marvel's Spider-Man 2",'Peter Parker e Miles Morales enfrentam novas ameaças em uma Nova York maior, com histórias que se cruzam.'],
  ['Jogo','Marvel',2024,'Marvel Rivals','Marvel Rivals','Heróis e vilões da Marvel se enfrentam em arenas de equipe com mapas e habilidades inspirados em seus universos.'],
  ['Jogo','Marvel',2021,'Marvel’s Guardians of the Galaxy','Guardians of the Galaxy (2021 video game)','Peter Quill conduz os Guardiões por uma aventura espacial em que as decisões do grupo moldam a jornada.'],
  ['Jogo','Marvel',2000,'Marvel vs. Capcom 2: New Age of Heroes','Marvel vs. Capcom 2: New Age of Heroes','Personagens da Marvel e da Capcom formam equipes de três lutadores em confrontos rápidos e cheios de combinações.'],
  ['Jogo','Marvel',2005,'X-Men Legends II: Rise of Apocalypse','X-Men Legends II: Rise of Apocalypse','X-Men e Irmandade deixam suas diferenças de lado para enfrentar Apocalipse em um RPG de ação cooperativo.'],
  ['Jogo','Marvel',2006,'Marvel: Ultimate Alliance','Marvel: Ultimate Alliance','Uma equipe de heróis da Marvel enfrenta o plano do Doutor Destino em uma campanha de ação cooperativa.'],
  ['Jogo','DC',2009,'Batman: Arkham Asylum','Batman: Arkham Asylum (video game)','Batman precisa recuperar o controle do asilo quando o Coringa transforma a ilha em uma armadilha.'],
  ['Jogo','DC',2011,'Batman: Arkham City','Batman: Arkham City','Batman investiga uma prisão a céu aberto construída dentro de Gotham e descobre uma conspiração em expansão.'],
  ['Jogo','DC',2015,'Batman: Arkham Knight','Batman: Arkham Knight','Uma nova ameaça coloca Gotham em perigo e leva Batman a enfrentar o passado e os limites de sua missão.'],
  ['Jogo','DC',2013,'Batman: Arkham Origins','Batman: Arkham Origins','Em uma Gotham coberta pela neve, um Batman mais jovem é caçado por assassinos durante a noite de Natal.'],
  ['Jogo','DC',2013,'Injustice: Gods Among Us','Injustice: Gods Among Us','Heróis da DC se dividem em lados opostos em uma realidade alternativa marcada por uma escolha de Superman.'],
  ['Jogo','DC',2017,'Injustice 2','Injustice 2','A luta pelo futuro da Terra continua quando uma nova ameaça força antigos rivais a reconsiderar alianças.'],
  ['Jogo','DC',2008,'LEGO Batman: The Videogame','Lego Batman: The Videogame','Batman e Robin enfrentam vilões de Gotham em fases de aventura construídas com humor e peças LEGO.'],
  ['Jogo','DC',2022,'Gotham Knights','Gotham Knights (video game)','Após a queda de Batman, Batgirl, Asa Noturna, Capuz Vermelho e Robin protegem Gotham em equipe.'],
  ['Jogo','DC',2024,'Esquadrão Suicida: Mate a Liga da Justiça','Suicide Squad: Kill the Justice League','O Esquadrão Suicida recebe a missão de deter uma Liga da Justiça controlada por uma força invasora.'],
  ['Jogo','Marvel',2020,'Marvel’s Avengers',"Marvel's Avengers (video game)",'Os Vingadores se reúnem novamente quando Kamala Khan descobre uma conspiração que ameaça os Inumanos.'],
  ['Jogo','Marvel',2011,'Ultimate Marvel vs. Capcom 3','Ultimate Marvel vs. Capcom 3','Heróis e lutadores de universos diferentes disputam combates em equipes com elenco ampliado.'],
  ['Jogo','Marvel',2009,'X-Men Origins: Wolverine','X-Men Origins: Wolverine (video game)','Wolverine atravessa uma campanha de ação que revisita os conflitos e as memórias de seu passado.'],

  // HQs (20)
  ['HQ','Marvel',2006,'Guerra Civil','Civil War (comics)','Uma lei de registro divide os heróis da Marvel e coloca Capitão América e Homem de Ferro em lados opostos.'],
  ['HQ','Marvel',1986,'Demolidor: A Queda de Murdock','Daredevil: Born Again','A identidade e a vida de Matt Murdock são destruídas quando Wilson Fisk decide atacar seu inimigo por todos os lados.'],
  ['HQ','Marvel',1980,'A Saga da Fênix Negra','The Dark Phoenix Saga','Jean Grey luta contra uma força cósmica que amplia seus poderes e ameaça tudo o que ela ama.'],
  ['HQ','Marvel',1987,'Kraven: A Última Caçada',"Kraven's Last Hunt",'Kraven prepara seu último desafio para provar que pode superar o Homem-Aranha em seus próprios termos.'],
  ['HQ','Marvel',1991,'A Manopla do Infinito','The Infinity Gauntlet','Thanos reúne as Joias do Infinito, e heróis da Terra e do cosmos se unem para enfrentar seu poder.'],
  ['HQ','Marvel',1984,'Guerras Secretas','Secret Wars (1984 comic book)','Heróis e vilões são levados a um planeta distante, onde conflitos e alianças mudam o destino de seus mundos.'],
  ['HQ','DC',1986,'Watchmen','Watchmen','Em uma realidade alternativa, a investigação de um assassinato revela tensões políticas e dilemas sobre poder e responsabilidade.'],
  ['HQ','DC',1986,'Batman: O Cavaleiro das Trevas','The Dark Knight Returns','Um Bruce Wayne mais velho volta a vestir o manto do Batman em uma Gotham que perdeu a esperança.'],
  ['HQ','DC',1987,'Batman: Ano Um','Batman: Year One','A origem de Batman e a chegada de James Gordon a Gotham são contadas em paralelo, no início de suas jornadas.'],
  ['HQ','DC',1996,'Batman: O Longo Dia das Bruxas','Batman: The Long Halloween','Batman, Gordon e Harvey Dent investigam um assassino que ataca em feriados e abala as famílias criminosas da cidade.'],
  ['HQ','DC',1988,'Batman: A Piada Mortal','Batman: The Killing Joke','Um confronto entre Batman e Coringa explora a origem do vilão e o limite entre tragédia e loucura.'],
  ['HQ','DC',1992,'A Morte do Superman','The Death of Superman','Superman enfrenta uma força imparável em uma batalha que muda Metrópolis e o legado do herói.'],
  ['HQ','DC',1996,'O Reino do Amanhã','Kingdom Come (comics)','Heróis veteranos retornam quando uma nova geração sem limites ameaça a ordem e o futuro do mundo.'],
  ['HQ','DC',2005,'All-Star Superman','All-Star Superman','Ao receber uma quantidade fatal de energia solar, Superman tenta concluir seus maiores feitos e preparar o futuro.'],
  ['HQ','DC',2002,'Batman: Silêncio','Batman: Hush','Um inimigo misterioso manipula os aliados e rivais de Batman em uma trama que alcança toda Gotham.'],
  ['HQ','Outros',1989,'Sandman: Prelúdios e Noturnos','The Sandman (comic book)','Sonho retorna ao seu reino depois de décadas preso e precisa reconstruir seu poder e suas relações.'],
  ['HQ','Outros',2012,'Saga','Saga (comics)','Dois amantes de povos rivais tentam proteger a filha enquanto fogem de uma guerra que atravessa a galáxia.'],
  ['HQ','Outros',2003,'Invencível','Invincible (comics)','Mark Grayson começa a atuar como herói e descobre que sua família guarda verdades capazes de mudar seu mundo.'],
  ['HQ','Outros',2006,'The Boys: O Nome do Jogo','The Boys (comics)','Um grupo de vigilantes enfrenta super-heróis tratados como celebridades e protegidos por uma grande corporação.'],
  ['HQ','Outros',1994,'Hellboy: Sementes da Destruição','Hellboy: Seed of Destruction','Hellboy investiga criaturas antigas e uma conspiração sobrenatural ligada à própria origem.']
];

const expected = { Filme:20, Série:20, Jogo:20, HQ:20 };
for (const [type,count] of Object.entries(expected)) {
  const actual = items.filter(item => item[0] === type).length;
  if (actual !== count) throw new Error(`Catálogo inválido: ${type} tem ${actual}, esperado ${count}.`);
}

async function syncCatalog(pool) {
  const [columns] = await pool.execute('SELECT COLUMN_NAME FROM information_schema.COLUMNS WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME=? AND COLUMN_NAME=?',['media','is_active']);
  if (!columns.length) await pool.query('ALTER TABLE media ADD COLUMN is_active TINYINT(1) NOT NULL DEFAULT 1 AFTER poster_url');
  await pool.query('INSERT IGNORE INTO media_types(name) VALUES ("Filme"),("Série"),("Jogo"),("HQ")');
  await pool.query('INSERT IGNORE INTO publishers(name) VALUES ("Marvel"),("DC"),("Outros")');
  const [[types],[publishers]] = await Promise.all([
    pool.query('SELECT id,name FROM media_types'),
    pool.query('SELECT id,name FROM publishers')
  ]);
  const typeIds = new Map(types.map(row => [row.name,row.id]));
  const publisherIds = new Map(publishers.map(row => [row.name,row.id]));
  await pool.query('UPDATE media SET is_active=0');
  for (const [type,publisher,year,title,pageTitle,description] of items) {
    const publisherId = publisherIds.get(publisher);
    const typeId = typeIds.get(type);
    const [rows] = await pool.execute('SELECT id FROM media WHERE title=? AND publisher_id=? AND type_id=? ORDER BY id LIMIT 1',[title,publisherId,typeId]);
    if (rows.length) {
      await pool.execute('UPDATE media SET original_title=?,description=?,release_year=?,poster_url=NULL,is_active=1 WHERE id=?',[pageTitle,description,year,rows[0].id]);
    } else {
      await pool.execute('INSERT INTO media(title,original_title,description,release_year,publisher_id,type_id,poster_url,is_active) VALUES(?,?,?,?,?,?,NULL,1)',[title,pageTitle,description,year,publisherId,typeId]);
    }
  }
  console.log('Catálogo atualizado: 20 filmes, 20 séries, 20 jogos e 20 HQs.');
}

if (require.main === module) {
  const mysql = require('mysql2/promise');
  const dbName = process.env.DB_NAME || 'heroboxd';
  if (!/^[A-Za-z0-9_]+$/.test(dbName)) throw new Error('DB_NAME inválido.');
  const pool = mysql.createPool({host:process.env.DB_HOST||'127.0.0.1',port:Number(process.env.DB_PORT||3306),user:process.env.DB_USER||'root',password:process.env.DB_PASSWORD||'',database:dbName,charset:'utf8mb4',ssl:process.env.NODE_ENV==='production'?{}:undefined});
  syncCatalog(pool).catch(error => { console.error('Falha no catálogo:',error.code||error.name); process.exitCode=1; }).finally(() => pool.end());
}

module.exports = { items, syncCatalog };
