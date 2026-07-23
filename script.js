const squad = [
  ['Emiliano Martínez','Arquero','gk',true,23],['Gerónimo Rulli','Arquero','gk',false,12],['Juan Musso','Arquero','gk',false,1],
  ['Nahuel Molina','Defensor','def',true,26],['Gonzalo Montiel','Defensor','def',false,4],['Cristian Romero','Defensor','def',true,13],['Marcos Senesi','Defensor','def',false,2],['Nicolás Otamendi','Defensor','def',false,19],['Lisandro Martínez','Defensor','def',true,6],['Nicolás Tagliafico','Defensor','def',true,3],['Facundo Medina','Defensor','def',false,25],
  ['Leandro Paredes','Mediocampista','mid',false,5],['Alexis Mac Allister','Mediocampista','mid',true,20],['Rodrigo De Paul','Mediocampista','mid',true,7],['Giovani Lo Celso','Mediocampista','mid',false,11],['Exequiel Palacios','Mediocampista','mid',false,14],['Enzo Fernández','Mediocampista','mid',true,24],['Valentín Barco','Mediocampista','mid',false,8],
  ['Lionel Messi','Delantero','fwd',true,10],['Julián Álvarez','Delantero','fwd',true,9],['Lautaro Martínez','Delantero','fwd',false,22],['Thiago Almada','Delantero','fwd',false,16],['Nicolás Paz','Delantero','fwd',false,18],['Nicolás González','Delantero','fwd',true,15],['Giuliano Simeone','Delantero','fwd',false,17],['José Manuel López','Delantero','fwd',false,21]
];

const targetMap={gk:'goalkeepers',def:'defenders',mid:'midfielders',fwd:'forwards'};
const noMinutes=new Set(['Gerónimo Rulli','Juan Musso']);
const positionCodes={Arquero:'ARQ',Defensor:'DEF',Mediocampista:'MED',Delantero:'DEL'};
const worldCupStats={
  'Emiliano Martínez':[8,8,0],'Gerónimo Rulli':[0,0,0],'Juan Musso':[0,0,0],
  'Nahuel Molina':[7,5,0],'Gonzalo Montiel':[6,2,0],'Cristian Romero':[7,7,1],'Marcos Senesi':[2,1,0],'Nicolás Otamendi':[7,1,0],'Lisandro Martínez':[7,7,1],'Nicolás Tagliafico':[7,5,0],'Facundo Medina':[5,3,0],
  'Leandro Paredes':[7,4,0],'Alexis Mac Allister':[8,7,1],'Rodrigo De Paul':[7,6,0],'Giovani Lo Celso':[1,1,1],'Exequiel Palacios':[1,1,0],'Enzo Fernández':[7,7,2],'Valentín Barco':[1,0,0],
  'Lionel Messi':[8,7,8],'Julián Álvarez':[8,5,1],'Lautaro Martínez':[7,4,3],'Thiago Almada':[5,3,0],'Nicolás Paz':[2,1,0],'Nicolás González':[7,1,0],'Giuliano Simeone':[3,2,0],'José Manuel López':[2,0,0]
};
const teamTotals=[
  ['8','PARTIDOS'],['7–0–1','G–E–P'],['19–8','GF–GC'],['53%','POSESIÓN'],['115','REMATES'],['46','AL ARCO'],['15.45','GOLES ESPERADOS'],['41','CORNERS']
];
const worldCupMatches=[
  {stage:'group',stageLabel:'Grupos',date:'16 JUN',venue:'Kansas City Stadium · Kansas City',home:'Argentina',away:'Argelia',score:'3–0',result:'Victoria',scorers:'Messi (3)',stats:{possession:'44.6%',xg:'1.58',shots:'10',onTarget:'6',passes:'578',accuracy:'89%',lineBreaks:'102',finalThird:'68',crosses:'5',progressions:'18',pressures:'288',turnovers:'46',secondBalls:'50',distance:'108.4 km'}},
  {stage:'group',stageLabel:'Grupos',date:'22 JUN',venue:'Dallas Stadium · Dallas',home:'Argentina',away:'Austria',score:'2–0',result:'Victoria',scorers:'Messi (2)',stats:{possession:'48.2%',xg:'2.45',shots:'12',onTarget:'5',passes:'564',accuracy:'90%',lineBreaks:'87',finalThird:'103',crosses:'6',progressions:'14',pressures:'229',turnovers:'41',secondBalls:'53',distance:'104.4 km'}},
  {stage:'group',stageLabel:'Grupos',date:'27 JUN',venue:'Dallas Stadium · Dallas',home:'Jordania',away:'Argentina',score:'1–3',result:'Victoria',scorers:'Mac Allister, Messi, Lo Celso',stats:{possession:'67.6%',xg:'2.52',shots:'13',onTarget:'4',passes:'824',accuracy:'92%',lineBreaks:'130',finalThird:'144',crosses:'10',progressions:'25',pressures:'184',turnovers:'42',secondBalls:'48',distance:'105.9 km'}},
  {stage:'r32',stageLabel:'16avos',date:'3 JUL',venue:'Miami Stadium · Miami',home:'Argentina',away:'Cabo Verde',score:'3–2',result:'Victoria',scorers:'Ver informe de partido',stats:{possession:'59.2%',xg:'2.73',shots:'22',onTarget:'12',passes:'862',accuracy:'93%',lineBreaks:'152',finalThird:'262',crosses:'19',progressions:'33',pressures:'289',turnovers:'51',secondBalls:'77',distance:'140.6 km'}},
  {stage:'r16',stageLabel:'8vos',date:'7 JUL',venue:'Atlanta Stadium · Atlanta',home:'Argentina',away:'Egipto',score:'3–2',result:'Victoria',scorers:'Messi, Enzo Fernández, Lautaro Martínez',stats:{possession:'57.1%',xg:'2.63',shots:'19',onTarget:'7',passes:'618',accuracy:'90%',lineBreaks:'129',finalThird:'231',crosses:'26',progressions:'32',pressures:'190',turnovers:'39',secondBalls:'65',distance:'110.4 km'}},
  {stage:'qf',stageLabel:'4tos',date:'11 JUL',venue:'Kansas City Stadium · Kansas City',home:'Argentina',away:'Suiza',score:'3–1',result:'Victoria',scorers:'Ver informe de partido',stats:{possession:'54.7%',xg:'1.99',shots:'22',onTarget:'7',passes:'716',accuracy:'88%',lineBreaks:'98',finalThird:'256',crosses:'16',progressions:'21',pressures:'241',turnovers:'39',secondBalls:'69',distance:'136.7 km'}},
  {stage:'sf',stageLabel:'Semis',date:'15 JUL',venue:'Atlanta Stadium · Atlanta',home:'Inglaterra',away:'Argentina',score:'1–2',result:'Victoria',scorers:'Enzo Fernández, Lautaro Martínez',stats:{possession:'56.5%',xg:'1.47',shots:'15',onTarget:'5',passes:'610',accuracy:'90%',lineBreaks:'115',finalThird:'230',crosses:'20',progressions:'26',pressures:'188',turnovers:'39',secondBalls:'55',distance:'106.6 km'}},
  {stage:'final',stageLabel:'Final',date:'19 JUL',venue:'New York New Jersey Stadium · East Rutherford',home:'España',away:'Argentina',score:'1–0',result:'Derrota',scorers:'—',stats:{possession:'32.5%',xg:'0.07',shots:'2',onTarget:'0',passes:'476',accuracy:'79%',lineBreaks:'87',finalThird:'52',crosses:'9',progressions:'22',pressures:'445',turnovers:'54',secondBalls:'69',distance:'142 km'}}
];
// Cada registro representa un partido en el que el jugador tuvo minutos. Los
// campos ausentes no se inventan: la ficha los muestra como dato no disponible.
// La estructura permite completar el resto de los informes oficiales sin tocar
// la interfaz.
const playerMatchStats={
  'Lionel Messi':[
    {match:0,minutes:80,goals:3,assists:0},{match:1,minutes:90,goals:2,assists:0},
    {match:2,minutes:30,goals:1,assists:0},{match:3,minutes:120,goals:1,assists:0},
    {match:4,minutes:90,goals:1,assists:1},{match:5,minutes:120,goals:0,assists:1},
    {match:6,minutes:90,goals:0,assists:2},{match:7,minutes:120,goals:0,assists:0}
  ]
};
const officialDistributionStats={"Emiliano Martínez":[[0,41,76],[1,26,77],[2,19,100],[3,33,85],[4,20,70],[5,45,64],[6,27,74],[7,57,60]],"Gonzalo Montiel":[[0,22,91],[3,5,60],[4,15,93],[5,22,77],[6,17,88],[7,19,63]],"Lisandro Martínez":[[0,67,96],[1,73,96],[3,118,97],[4,51,94],[5,76,87],[6,39,97],[7,26,81]],"Rodrigo De Paul":[[0,54,91],[1,50,90],[3,76,95],[4,55,89],[5,35,91],[6,28,96],[7,29,90]],"Lionel Messi":[[0,40,75],[1,40,72],[2,21,81],[3,46,85],[4,53,77],[5,75,83],[6,57,75],[7,35,77]],"Cristian Romero":[[0,66,98],[1,47,96],[3,117,97],[4,61,97],[5,43,95],[6,55,98],[7,41,90]],"Thiago Almada":[[0,33,91],[1,38,89],[2,37,95],[3,34,85],[5,28,93]],"Alexis Mac Allister":[[0,65,95],[1,66,95],[2,46,91],[3,89,90],[4,40,85],[5,54,94],[6,40,90],[7,30,83]],"Lautaro Martínez":[[0,15,80],[1,8,100],[2,22,82],[3,13,100],[4,6,50],[5,7,86]],"Enzo Fernández":[[0,69,94],[1,70,90],[3,111,92],[4,84,92],[5,65,94],[6,84,95],[7,36,89]],"Facundo Medina":[[0,36,97],[1,53,92],[3,50,94],[7,24,79]],"Julián Álvarez":[[0,10,80],[1,8,100],[2,32,75],[3,22,91],[4,37,86],[5,45,89],[6,44,86],[7,17,76]],"Nicolás González":[[0,11,91],[1,9,56],[3,27,78],[4,10,100],[5,31,87],[6,15,80],[7,6,83]],"Nicolás Paz":[[0,4,100],[2,52,96]],"Nicolás Otamendi":[[0,16,81],[1,26,96],[2,96,98],[5,7,86],[6,18,100],[7,24,92]],"Nahuel Molina":[[0,29,66],[1,39,87],[3,60,95],[4,37,95],[5,38,82],[6,46,85],[7,27,70]],"Nicolás Tagliafico":[[1,2,100],[2,58,88],[3,21,100],[4,30,87],[5,25,84],[6,41,90],[7,40,80]],"Leandro Paredes":[[1,9,100],[2,166,93],[3,40,98],[4,119,97],[5,118,94],[6,69,97],[7,44,82]],"Marcos Senesi":[[2,73,96],[7,6,83]],"Giovani Lo Celso":[[2,51,92]],"Exequiel Palacios":[[2,94,95]],"Giuliano Simeone":[[2,37,95],[6,30,83],[7,15,67]],"Valentín Barco":[[2,20,85]],"José Manuel López":[[5,2,100]]};
Object.entries(officialDistributionStats).forEach(([name,records])=>{
  const known=playerMatchStats[name]||[];
  playerMatchStats[name]=records.map(([match,passes,passAccuracy])=>({...(known.find(game=>game.match===match)||{}),match,passes,passAccuracy}));
});
const verifiedPlayerNames=['Emiliano Martínez','Gerónimo Rulli','Juan Musso','Nahuel Molina','Gonzalo Montiel','Cristian Romero','Marcos Senesi','Nicolás Otamendi','Lisandro Martínez','Nicolás Tagliafico','Facundo Medina','Leandro Paredes','Alexis Mac Allister','Rodrigo De Paul','Giovani Lo Celso','Exequiel Palacios','Enzo Fernández','Valentín Barco','Lionel Messi','Julián Álvarez','Lautaro Martínez','Thiago Almada','Nicolás Paz','Nicolás González','Giuliano Simeone','José Manuel López'];
const verifiedPlayerFields=['minutes','shots','shotsOnTarget','passes','keyPasses','tackles','interceptions','duelsWon','fouls','yellowCards','redCards','goals','assists','xg','clearances','saves'];
const verifiedPlayerRows=
[[[0,90,0,0,41,0,0,0,0,0,0,0,0,0,0,1,0],[1,90,0,0,24,0,0,0,0,0,0,0,0,0,0,0,1],[2,90,0,0,15,0,0,0,0,0,0,0,0,0,0,0,0],[3,120,0,0,28,0,0,0,0,0,0,0,0,0,0,0,3],[4,90,0,0,19,0,0,0,0,0,0,0,0,0,0,0,0],[5,120,0,0,42,0,0,0,0,0,0,0,0,0,0,2,4],[6,90,0,0,24,0,0,0,1,0,0,0,0,0,0,1,1],[7,120,0,0,53,0,0,0,0,0,0,0,0,0,0,1,11]],[],[],[[0,44,0,0,24,1,1,1,2,0,0,0,0,0,0,1,0],[1,90,0,0,37,0,2,2,6,1,0,0,0,0,0,3,0],[3,104,0,0,54,0,3,0,7,1,0,0,0,0,0,0,0],[4,73,0,0,31,2,3,0,5,0,0,0,0,0,0,1,0],[5,85,1,0,34,0,1,2,3,0,0,0,0,0,0.02,2,0],[6,72,0,0,45,0,2,1,4,1,0,0,0,0,0,1,0],[7,62,0,0,26,0,3,2,6,0,0,0,0,0,0,2,0]],[[0,46,0,0,21,0,2,1,3,1,0,0,0,0,0,2,0],[3,16,1,0,5,0,0,0,1,1,1,0,0,0,0.1,0,0],[4,17,0,0,14,1,0,0,0,0,0,0,0,1,0,1,0],[5,35,0,0,18,0,0,0,2,1,0,0,0,0,0,1,0],[6,18,0,0,13,0,0,0,1,0,0,0,0,0,0,0,0],[7,58,0,0,13,0,1,2,5,1,0,0,0,0,0,2,0]],[[0,80,0,0,66,0,2,0,7,2,0,0,0,0,0,2,0],[1,57,0,0,48,0,1,2,6,1,0,0,0,0,0,5,0],[3,120,1,0,117,0,2,3,9,2,0,0,0,0,0.1,1,0],[4,90,1,1,64,0,3,2,11,1,0,0,1,0,0.2,4,0],[5,106,1,0,43,0,2,1,6,1,0,0,0,0,0.02,3,0],[6,90,0,0,53,0,4,2,10,2,1,0,0,0,0,10,0],[7,70,0,0,40,0,1,0,1,0,1,0,0,0,0,1,0]],[[2,90,1,0,72,0,0,2,5,0,0,0,0,0,0.59,1,0],[7,18,0,0,7,0,0,0,2,0,0,0,0,0,0,0,0]],[[0,10,0,0,16,0,2,1,2,0,0,0,0,0,0,1,0],[1,33,0,0,26,0,0,1,2,2,0,0,0,0,0,5,0],[2,90,1,0,96,0,1,2,4,1,0,0,0,0,0.05,3,0],[4,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[5,14,0,0,7,0,1,0,4,0,0,0,0,0,0,6,0],[6,18,0,0,18,0,0,0,3,0,0,0,0,0,0,3,0],[7,76,0,0,29,0,0,1,9,1,0,0,0,0,0,4,0]],[[0,90,0,0,67,0,2,1,2,0,0,0,0,0,0,4,0],[1,90,0,0,73,1,1,0,6,1,0,0,0,0,0,7,0],[3,120,1,1,119,1,0,1,5,0,0,0,1,1,0.03,6,0],[4,90,1,0,54,0,4,2,11,2,0,0,0,0,0.03,7,0],[5,120,2,1,77,0,4,1,13,2,0,0,0,0,0.09,4,0],[6,72,0,0,41,0,0,0,4,1,1,0,0,0,0,4,0],[7,44,0,0,29,0,1,1,5,1,1,0,0,0,0,2,0]],[[1,8,0,0,1,0,0,0,4,0,0,0,0,0,0,2,0],[2,90,0,0,54,1,0,0,4,1,0,0,0,0,0,1,0],[3,34,0,0,20,0,3,0,7,0,0,0,0,0,0,3,0],[4,66,0,0,30,1,0,1,7,2,0,0,0,0,0,0,0],[5,78,0,0,22,0,0,1,10,1,0,0,0,0,0,0,0],[6,81,0,0,35,0,2,1,7,0,0,0,0,0,0,3,0],[7,120,0,0,34,1,3,3,14,5,0,0,0,0,0,2,0]],[[0,90,0,0,32,0,2,0,5,2,0,0,0,0,0,1,0],[1,82,0,0,47,1,3,1,10,1,1,0,0,1,0,5,0],[3,86,0,0,47,0,3,0,4,0,0,0,0,0,0,3,0],[4,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[7,50,0,0,17,0,1,1,3,0,0,0,0,0,0,5,0]],[[1,8,0,0,9,0,0,0,1,1,1,0,0,0,0,0,0],[2,90,0,0,164,0,0,1,3,0,0,0,0,0,0,0,0],[3,36,1,1,41,0,1,1,1,0,0,0,0,0,0.02,6,0],[4,90,2,0,119,0,3,0,6,0,0,0,0,0,0.03,1,0],[5,110,0,0,119,2,1,1,6,2,0,0,0,0,0,1,0],[6,64,1,0,70,2,4,0,9,2,0,0,0,0,0.02,1,0],[7,74,0,0,45,0,1,3,11,4,1,0,0,0,0,1,0]],[[0,90,2,1,64,1,1,2,8,2,0,0,0,0,0.08,1,0],[1,90,0,0,67,0,4,1,11,2,0,0,0,0,0,1,0],[2,29,0,0,45,0,3,1,8,0,0,0,0,0,0,0,0],[3,120,2,0,89,2,4,1,14,1,0,0,0,1,0.18,1,0],[4,90,2,1,40,1,3,0,10,0,0,0,0,0,0.29,0,0],[5,120,4,1,53,1,3,4,14,1,0,0,1,0,0.63,4,0],[6,90,3,1,38,0,1,1,7,0,0,0,0,0,0.32,0,0],[7,120,0,0,30,0,2,1,15,3,1,0,0,0,0,2,0]],[[0,90,0,0,51,1,3,2,10,0,0,0,0,1,0,1,0],[1,82,0,0,49,0,1,0,2,0,0,0,0,0,0,1,0],[3,84,0,0,76,1,1,1,4,1,0,0,0,0,0,0,0],[4,66,1,1,51,2,1,1,4,1,0,0,0,0,0.05,0,0],[5,85,0,0,36,0,0,2,5,0,0,0,0,0,0,1,0],[6,18,1,0,28,2,0,0,0,0,1,0,0,0,0.02,0,0],[7,70,0,0,28,0,0,0,4,0,0,0,0,0,0,0,0]],[[2,60,1,1,46,2,1,1,6,1,0,0,1,0,0.09,0,0]],[[2,90,0,0,87,0,4,5,6,1,0,0,0,0,0,3,0]],[[0,90,0,0,67,1,4,2,11,1,0,0,0,0,0,1,0],[1,90,2,0,70,1,2,1,11,2,0,0,0,0,0.14,2,0],[3,120,4,2,111,0,1,0,11,1,0,0,0,0,0.32,2,0],[4,90,2,1,80,0,1,0,10,2,0,0,1,0,0.32,0,0],[5,91,0,0,63,1,0,0,3,0,0,0,0,0,0,0,0],[6,90,4,1,84,1,2,0,10,3,0,0,1,0,0.06,2,0],[7,90,0,0,36,0,1,2,11,3,1,1,0,0,0,1,0]],[[2,19,0,0,20,0,1,0,2,0,0,0,0,0,0,0,0]],[[0,80,6,4,37,2,2,0,8,1,0,0,3,0,0.61,1,0],[1,90,7,4,39,2,2,0,15,0,0,0,2,0,1.95,0,0],[2,30,2,1,21,2,0,0,1,0,0,0,1,0,0.1,0,0],[3,120,9,6,45,4,1,0,16,1,0,0,1,0,0.98,0,0],[4,90,5,2,50,6,1,0,16,0,0,0,1,1,1.29,0,0],[5,120,4,1,69,6,3,1,15,0,0,0,0,1,0.28,0,0],[6,90,1,0,54,4,1,0,22,0,0,0,0,2,0.01,0,0],[7,120,1,0,34,0,1,0,12,1,0,0,0,0,0.01,0,0]],[[0,35,0,0,10,0,1,0,6,1,0,0,0,0,0,0,0],[1,26,1,1,9,0,0,0,1,0,0,0,0,0,0.4,0,0],[2,82,1,1,33,0,0,0,4,0,0,0,0,0,0.18,1,0],[3,57,1,0,21,1,0,2,5,1,0,0,0,0,0.1,0,0],[4,90,2,1,37,0,1,0,10,3,0,0,0,0,0.26,0,0],[5,120,3,1,42,2,2,0,9,3,0,0,1,0,0.05,1,0],[6,90,3,1,40,1,0,0,6,0,0,0,0,0,0.44,2,0],[7,102,0,0,16,0,1,1,11,3,0,0,0,0,0,1,0]],[[0,55,1,1,13,0,1,0,6,2,0,0,0,0,0.1,0,0],[1,65,0,0,9,0,2,0,11,2,0,0,0,0,0,3,0],[2,60,3,1,23,1,0,0,4,1,0,0,1,0,1.23,0,0],[3,63,0,0,14,1,0,0,10,2,0,0,0,0,0,1,0],[4,24,3,0,5,1,0,0,3,0,0,0,0,1,0.72,0,0],[5,35,2,1,7,2,0,1,4,1,1,0,1,0,0.2,1,0],[6,9,1,1,0,0,0,0,0,0,0,0,1,0,0.36,0,0]],[[0,55,1,0,35,0,2,0,6,0,0,0,0,0,0.02,0,0],[1,64,0,0,38,1,3,0,5,0,0,0,0,0,0,0,0],[2,30,1,0,34,0,0,0,2,0,0,0,0,0,0.05,0,0],[3,63,0,0,34,1,0,0,5,1,0,0,0,0,0,0,0],[5,29,3,2,27,1,0,0,2,1,1,0,0,0,0.52,0,0]],[[0,10,0,0,4,0,2,0,4,1,0,0,0,0,0,0,0],[2,61,1,0,53,0,1,0,9,1,0,0,0,0,0.09,0,0]],[[0,35,0,0,13,1,0,0,2,0,0,0,0,1,0,1,0],[1,25,2,0,8,0,0,0,5,0,0,0,0,0,0.26,1,0],[3,57,2,0,29,1,3,0,12,1,0,0,0,0,0.27,2,0],[4,24,0,0,8,2,0,1,4,2,0,0,0,0,0,0,0],[5,42,2,0,29,1,0,0,7,0,0,0,0,0,0.08,4,0],[6,26,1,1,14,1,2,1,4,1,0,0,0,0,0.08,4,0],[7,46,0,0,9,0,0,0,7,0,0,0,0,0,0,0,0]],[[2,71,0,0,38,0,2,0,5,1,0,0,0,0,0,0,0],[6,72,0,0,31,2,2,1,14,5,0,0,0,0,0,0,0],[7,50,1,0,18,1,2,0,8,3,0,0,0,0,0.13,0,0]],[[2,8,1,0,0,0,1,0,3,0,0,0,0,0,0.04,1,0],[5,10,0,0,3,1,0,0,3,1,1,0,0,1,0,1,0]]];
verifiedPlayerNames.forEach((name,index)=>{const previous=playerMatchStats[name]||[];playerMatchStats[name]=verifiedPlayerRows[index].map(row=>({...(previous.find(game=>game.match===row[0])||{}),match:row[0],...Object.fromEntries(verifiedPlayerFields.map((field,fieldIndex)=>[field,row[fieldIndex+1]]))}));});
const commonPlayerMetrics=[
  ['minutes','Minutos','sum'],['goals','Goles','sum'],['assists','Asistencias','sum'],
  ['shots','Remates','sum'],['shotsOnTarget','Al arco','sum'],['passes','Pases','sum'],
  ['passAccuracy','Precisión de pase','percent'],['keyPasses','Pases clave','sum'],
  ['recoveries','Recuperaciones','sum'],['duelsWon','Duelos ganados','sum'],
  ['fouls','Faltas','sum'],['yellowCards','Amarillas','sum'],['redCards','Rojas','sum']
];
const rolePlayerMetrics={
  gk:[['saves','Atajadas','sum'],['goalsConceded','Goles recibidos','sum'],['cleanSheet','Valla invicta','sum'],['passAccuracy','Precisión de pase','percent']],
  def:[['tackles','Entradas','sum'],['interceptions','Intercepciones','sum'],['clearances','Despejes','sum'],['blocks','Bloqueos','sum']],
  mid:[['keyPasses','Pases clave','sum'],['lineBreaks','Rupturas de línea','sum'],['progressions','Progresiones','sum'],['recoveries','Recuperaciones','sum']],
  fwd:[['xg','Goles esperados','decimal'],['xa','Asistencias esperadas','decimal'],['chancesCreated','Chances creadas','sum'],['dribbles','Regates','sum'],['shots','Remates','sum'],['shotsOnTarget','Al arco','sum']]
};
const supabaseUrl='https://pfpospcwwkyxkhtqhttx.supabase.co';
const supabaseKey='sb_publishable_n2mdK4VkE_pXZqiWe7aBrw_rzkYqD1D';
const supabaseClient=window.supabase?.createClient?window.supabase.createClient(supabaseUrl,supabaseKey):null;
let submissionsCache=[];
const scoreOptions=()=>'<option value="">—</option>'+Array.from({length:19},(_,i)=>{const n=(i+2)/2;return `<option value="${n}">${Number.isInteger(n)?n:n.toFixed(1)}</option>`}).join('');
const escapeHtml=value=>String(value).replace(/[&<>'"]/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
const entries=()=>[...squad.map(([name,role])=>({name,role:positionCodes[role]})),{name:'Lionel Scaloni',role:'DT'}];
const ratingPositionCodes=['ARQ','DEF','MED','DEL','DT'];
const activeRatingPositions=new Set();
let ratingSort='average';

function renderPlayer([name,role,area,starter,number]){
  const inactive=noMinutes.has(name);
  return `<article class="player ${starter?'starter':''} ${inactive?'off':''}"><div class="shirt" aria-label="Dorsal ${number}">${number}</div><span class="player-name">${name}</span><select data-player="${name}" aria-label="Puntaje de ${name}" ${inactive?'disabled':''}>${inactive?'<option>OFF</option>':scoreOptions()}</select></article>`;
}

squad.forEach(player=>document.getElementById(targetMap[player[2]]).insertAdjacentHTML('beforeend',renderPlayer(player)));
function renderPlayerStats(){
  const groups=[['Arquero','Arqueros','gk'],['Defensor','Defensores','def'],['Mediocampista','Mediocampistas','mid'],['Delantero','Delanteros','fwd']];
  document.getElementById('playerStats').innerHTML=groups.map(([role,label,id])=>`<details class="player-stat-group"><summary>${label}<small>${squad.filter(([,playerRole])=>playerRole===role).length} jugadores</small></summary><div class="player-stats-grid">${squad.filter(([,playerRole])=>playerRole===role).map(([name,, , ,number])=>{const [apps,starts,goals]=worldCupStats[name]||[0,0,0];return `<article class="stat-player ${noMinutes.has(name)?'off':''}" data-player-stat="${name}" tabindex="0" role="button"><span class="stat-number">${number}</span><div><strong>${name}</strong><small>${id.toUpperCase()}</small></div><span class="stat-line">${apps} · ${starts} · ${goals}</span></article>`;}).join('')}</div></details>`).join('');
}
renderPlayerStats();
function statCell(value,label){return `<div><strong>${value}</strong><span>${label}</span></div>`;}
function renderMatchStats(stages){
  const matches=worldCupMatches.filter(match=>stages.has(match.stage));
  document.getElementById('matchStats').innerHTML=matches.length?matches.map(match=>{const s=match.stats;return `<details class="match-card"><summary><span class="match-stage">${match.stageLabel}<br>${match.date}</span><div><strong>${match.home} vs. ${match.away}</strong><small>${match.venue}</small></div><span class="match-score">${match.score}</span></summary><div class="match-detail"><div class="match-meta"><span>${match.result}</span><span>Goles ARG: ${match.scorers}</span></div><div class="match-stat-block"><p>ATAQUE</p><div>${statCell(s.xg,'Goles esperados')}${statCell(s.shots,'Remates')}${statCell(s.onTarget,'Al arco')}${statCell(s.crosses,'Centros')}</div></div><div class="match-stat-block"><p>CONTROL</p><div>${statCell(s.possession,'Posesión')}${statCell(s.passes,'Pases')}${statCell(s.accuracy,'Precisión')}${statCell(s.lineBreaks,'Rupturas de línea')}</div></div><div class="match-stat-block"><p>PRESIÓN Y PROGRESIÓN</p><div>${statCell(s.finalThird,'Recepciones ⅓ final')}${statCell(s.progressions,'Progresiones')}${statCell(s.pressures,'Presiones')}${statCell(s.turnovers,'Pérdidas forzadas')}</div></div><div class="match-stat-block"><p>TRABAJO FÍSICO</p><div>${statCell(s.secondBalls,'Segundas pelotas')}${statCell(s.distance,'Distancia')}</div></div></div></details>`;}).join(''):'<p class="empty-ratings">Seleccioná una o más instancias para ver los partidos.</p>';
}
const stageCodes=['group','r32','r16','qf','sf','final'];
const activeStages=new Set();
document.getElementById('teamTotals').innerHTML=teamTotals.map(([value,label])=>`<article><strong>${value}</strong><span>${label}</span></article>`).join('');
function syncStageFilters(){document.querySelectorAll('[data-stage]').forEach(button=>{const stage=button.dataset.stage;button.classList.toggle('active',stage==='all'?activeStages.size===stageCodes.length:activeStages.has(stage));});renderMatchStats(activeStages);}
document.querySelectorAll('[data-stage]').forEach(button=>button.addEventListener('click',()=>{const stage=button.dataset.stage;if(stage==='all'){if(activeStages.size===stageCodes.length)activeStages.clear();else stageCodes.forEach(code=>activeStages.add(code));}else if(activeStages.has(stage))activeStages.delete(stage);else activeStages.add(stage);syncStageFilters();}));
syncStageFilters();
const playerDialog=document.getElementById('playerDialog');
const playerMetricValue=(value,type)=>{
  if(value===undefined||value===null)return '—';
  if(type==='percent')return `${fmt(value)}%`;
  return type==='decimal'?Number(value).toFixed(2):fmt(value);
};
const playerMetricAverage=(games,key,type)=>{
  const values=games.map(game=>game[key]).filter(value=>value!==undefined&&value!==null);
  if(!values.length)return null;
  return values.reduce((total,value)=>total+Number(value),0)/values.length;
};
const playerDelta=(value,average,type)=>{
  if(value===undefined||value===null||average===null)return {text:'—',tone:'neutral'};
  const difference=Number(value)-average;
  if(Math.abs(difference)<0.005)return {text:'0%',tone:'neutral'};
  if(!average)return {text:difference>0?'+100%':'−100%',tone:difference>0?'positive':'negative'};
  const percentage=Math.round(Math.abs(difference/average)*100);
  return {text:`${difference>0?'+':'−'}${percentage}%`,tone:difference>0?'positive':'negative'};
};
function renderPlayerMetric(metric,game,games){
  const [key,label,type]=metric;
  const average=playerMetricAverage(games,key,type);
  const delta=playerDelta(game[key],average,type);
  return `<article class="player-metric"><span>${label}</span><strong>${playerMetricValue(game[key],type)}</strong><small>${game[key]===undefined||game[key]===null?'sin dato':`Prom. ${playerMetricValue(average,type)} · <b class="delta-${delta.tone}">${delta.text}</b>`}</small></article>`;
}
function renderPlayerMatch(name,gameIndex){
  const player=squad.find(([playerName])=>playerName===name);
  const games=playerMatchStats[name]||[];
  const game=games[gameIndex];
  if(!game)return '';
  const match=worldCupMatches[game.match];
  const metrics=[...commonPlayerMetrics,...rolePlayerMetrics[player[2]].filter(([key])=>!commonPlayerMetrics.some(([commonKey])=>commonKey===key))].filter(([key])=>games.some(item=>item[key]!==undefined&&item[key]!==null));
  return `<section class="player-match-panel"><header><span>${match.stageLabel} · ${match.date}</span><strong>${match.home} ${match.score} ${match.away}</strong><small>${match.venue}</small></header><div class="player-metric-grid">${metrics.map(metric=>renderPlayerMetric(metric,game,games)).join('')}</div></section>`;
}
function openPlayerStats(name){
  const player=squad.find(([playerName])=>playerName===name);
  const games=playerMatchStats[name]||[];
  const basic=worldCupStats[name]||[0,0,0];
  const content=games.length?`<div class="player-match-switcher" role="tablist" aria-label="Partidos de ${name}">${games.map((game,index)=>{const match=worldCupMatches[game.match];return `<button type="button" class="${index===0?'active':''}" data-player-match="${index}" role="tab">${match.stageLabel}<small>${match.date}</small></button>`;}).join('')}</div><div id="playerMatchDetail">${renderPlayerMatch(name,0)}</div>`:`<div class="player-data-pending"><strong>${basic[0]} PJ · ${basic[2]} goles</strong><p>El desglose partido a partido de este jugador todavía no fue publicado en una fuente oficial estructurada. No se muestran estimaciones.</p></div>`;
  document.getElementById('playerDialogContent').innerHTML=`<div class="dialog-content"><h3>${name}</h3><p>${positionCodes[player[1]]} · DORSAL ${player[4]} · MUNDIAL 2026</p>${content}</div>`;
  document.querySelectorAll('[data-player-match]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-player-match]').forEach(item=>item.classList.toggle('active',item===button));document.getElementById('playerMatchDetail').innerHTML=renderPlayerMatch(name,Number(button.dataset.playerMatch));}));
  playerDialog.showModal();
}
document.getElementById('playerStats').addEventListener('click',event=>{const card=event.target.closest('[data-player-stat]');if(card)openPlayerStats(card.dataset.playerStat);});
document.getElementById('playerStats').addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){const card=event.target.closest('[data-player-stat]');if(card){event.preventDefault();openPlayerStats(card.dataset.playerStat);}}});
document.getElementById('closePlayerDialog').addEventListener('click',()=>playerDialog.close());
document.querySelectorAll('select[data-player]').forEach(select=>{
  if(select.dataset.player==='Lionel Scaloni') select.innerHTML=scoreOptions();
  select.value=localStorage.getItem(`arg26-${select.dataset.player}`)||'';
  select.addEventListener('change',()=>{select.classList.remove('score-missing');localStorage.setItem(`arg26-${select.dataset.player}`,select.value);updateSummary();});
});

const raterName=document.getElementById('raterName');
raterName.value=localStorage.getItem('arg26-rater-name')||'';
raterName.addEventListener('input',()=>localStorage.setItem('arg26-rater-name',raterName.value.trim()));

function fmt(value){const rounded=Math.round(value*2)/2;return Number.isInteger(rounded)?String(rounded):rounded.toFixed(1);}
function currentScores(){return entries().map(person=>({...person,eligible:!noMinutes.has(person.name),score:Number(document.querySelector(`[data-player="${person.name}"]`).value)}));}
function getSubmissions(){return submissionsCache;}
async function loadSubmissions(){
  if(!supabaseClient){document.getElementById('submitStatus').textContent='No se pudo conectar con la base de datos compartida.';return;}
  const {data,error}=await supabaseClient.from('evaluations').select('id,rater_name,scores,created_at').order('created_at');
  if(error){document.getElementById('submitStatus').textContent='No se pudieron cargar las evaluaciones compartidas.';return;}
  submissionsCache=data.map(row=>({id:row.id,name:row.rater_name,scores:row.scores,submittedAt:row.created_at}));
  renderRatingsTable();
  updateSummary();
}

function updateSummary(){
  const submissions=getSubmissions();
  const submittedScores=submissions.flatMap(submission=>submission.scores.filter(score=>!noMinutes.has(score.name)).map(score=>score.score)).filter(Boolean);
  const average=submittedScores.length?submittedScores.reduce((sum,score)=>sum+Number(score),0)/submittedScores.length:null;
  document.getElementById('averageScore').textContent=average?fmt(average):'—';
  document.getElementById('averageMeter').style.width=average?`${average*10}%`:'0%';
  const sent=submissions.length;
  document.getElementById('ratedCount').textContent=`${sent} ${sent===1?'calificación enviada':'calificaciones enviadas'}`;
}

function submissionScore(submission,playerName){return submission.scores.find(score=>score.name===playerName)?.score ?? null;}
function averageForSubmission(submission){const values=submission.scores.filter(score=>!noMinutes.has(score.name)).map(score=>score.score).filter(Boolean);return values.length?fmt(values.reduce((sum,value)=>sum+value,0)/values.length):'—';}
function averageForPlayer(submissions,playerName){const values=submissions.map(submission=>submissionScore(submission,playerName)).filter(value=>value!==null);return values.length?fmt(values.reduce((sum,value)=>sum+Number(value),0)/values.length):'—';}
function overallAverage(submissions){const values=submissions.flatMap(submission=>submission.scores.filter(score=>!noMinutes.has(score.name)).map(score=>score.score)).filter(Boolean);return values.length?fmt(values.reduce((sum,value)=>sum+Number(value),0)/values.length):'—';}
function renderRatingsTable(){
  const submissions=getSubmissions();
  const head=document.getElementById('ratingsHead');
  const body=document.getElementById('ratingsList');
  const table=head.closest('table');
  const totalColumns=submissions.length+3;
  const equalWidth=100/totalColumns;
  const positionWidth=equalWidth*.72;
  const standardWidth=(100-positionWidth)/(totalColumns-1);
  table.querySelector('colgroup')?.remove();
  table.insertAdjacentHTML('afterbegin',`<colgroup><col style="width:${standardWidth}%"><col style="width:${positionWidth}%">${Array.from({length:submissions.length+1},()=>`<col style="width:${standardWidth}%">`).join('')}</colgroup>`);
  head.innerHTML=`<tr><th>Jugador</th><th>POS</th>${submissions.map((submission,index)=>`<th class="rater-column"><span class="rater-name">${escapeHtml(submission.name)}</span><button class="delete-rater" type="button" data-submission="${index}">Eliminar</button></th>`).join('')}<th class="avg-column">Promedio</th></tr>`;
  let visibleEntries=entries().filter(person=>activeRatingPositions.has(person.role));
  const scoreForSort=person=>{const score=averageForPlayer(submissions,person.name);return score==='—'?-1:Number(score);};
  if(ratingSort==='average') visibleEntries.sort((a,b)=>scoreForSort(b)-scoreForSort(a)||a.name.localeCompare(b.name));
  if(ratingSort==='name') visibleEntries.sort((a,b)=>a.name.localeCompare(b.name));
  if(ratingSort==='position') visibleEntries.sort((a,b)=>ratingPositionCodes.indexOf(a.role)-ratingPositionCodes.indexOf(b.role)||scoreForSort(b)-scoreForSort(a)||a.name.localeCompare(b.name));
  if(!visibleEntries.length){
    body.innerHTML=`<tr><td class="empty-ratings" colspan="${submissions.length+3}">Seleccioná una o más posiciones para ver las calificaciones.</td></tr>`;
    return;
  }
  if(!submissions.length){
    body.innerHTML='<tr><td class="empty-ratings" colspan="3">Todavía no hay puntajes enviados.</td></tr>';
    return;
  }
  let lastRole='';
  body.innerHTML=visibleEntries.map(person=>{const divider=ratingSort==='position'&&person.role!==lastRole?`<tr class="position-divider"><td colspan="${submissions.length+3}">${person.role}</td></tr>`:'';lastRole=person.role;return `${divider}<tr><td>${person.name}</td><td>${person.role}</td>${submissions.map(submission=>{const score=submissionScore(submission,person.name);return `<td>${noMinutes.has(person.name)?'<span class="off-table">OFF</span>':score===null?'—':fmt(Number(score))}</td>`;}).join('')}<td class="avg-column">${noMinutes.has(person.name)?'<span class="off-table">OFF</span>':averageForPlayer(submissions,person.name)}</td></tr>`;}).join('');
}

function syncRatingFilters(){document.querySelectorAll('[data-rating-position]').forEach(button=>{const position=button.dataset.ratingPosition;button.classList.toggle('active',position==='all'?activeRatingPositions.size===ratingPositionCodes.length:activeRatingPositions.has(position));});renderRatingsTable();}
document.querySelectorAll('[data-rating-position]').forEach(button=>button.addEventListener('click',()=>{const position=button.dataset.ratingPosition;if(position==='all'){if(activeRatingPositions.size===ratingPositionCodes.length)activeRatingPositions.clear();else ratingPositionCodes.forEach(code=>activeRatingPositions.add(code));}else if(activeRatingPositions.has(position))activeRatingPositions.delete(position);else activeRatingPositions.add(position);syncRatingFilters();}));
document.getElementById('ratingSort').addEventListener('change',event=>{ratingSort=event.target.value;renderRatingsTable();});

document.getElementById('ratingsHead').addEventListener('click',async event=>{
  const button=event.target.closest('[data-submission]');
  if(!button) return;
  const submission=getSubmissions()[Number(button.dataset.submission)];
  const {error}=await supabaseClient.from('evaluations').delete().eq('id',submission.id);
  if(error){window.alert('No se pudo eliminar la evaluación. Intentá de nuevo.');return;}
  await loadSubmissions();
});

document.getElementById('resetScores').addEventListener('click',()=>{
  document.querySelectorAll('select[data-player]').forEach(select=>{
    if(!select.disabled){
      select.selectedIndex=0;
      select.value='';
    }
    select.classList.remove('score-missing');
    localStorage.removeItem(`arg26-${select.dataset.player}`);
  });
  document.getElementById('submitStatus').textContent='Las notas actuales fueron limpiadas.';
  updateSummary();
});

document.getElementById('submitScores').addEventListener('click',async()=>{
  const name=raterName.value.trim();
  const status=document.getElementById('submitStatus');
  const submissions=getSubmissions();
  const scoreSelects=[...document.querySelectorAll('select[data-player]:not(:disabled)')];
  const missing=scoreSelects.filter(select=>!select.value);
  missing.forEach(select=>select.classList.add('score-missing'));
  if(!name||missing.length){
    const message=[!name?'Escribí tu nombre.':'',missing.length?`Completá los ${missing.length} puntajes pendientes.`:''].filter(Boolean).join(' ');
    status.textContent=message;
    window.alert(message);
    (!name?raterName:missing[0]).focus();
    return;
  }
  const normalizedName=name.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase();
  if(submissions.some(submission=>submission.name.trim().normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase()===normalizedName)){
    status.textContent='Ya existe una evaluación enviada con ese nombre.';
    window.alert('Ya existe una evaluación enviada con ese nombre.');
    raterName.focus();
    return;
  }
  const scores=currentScores().map(({name:playerName,eligible,score})=>({name:playerName,score:eligible&&score?score:null}));
  const button=document.getElementById('submitScores');
  button.disabled=true;
  button.textContent='Guardando…';
  if(!supabaseClient){
    const message='No hay conexión con la base de datos compartida. Recargá e intentá de nuevo.';
    status.textContent=message;
    window.alert(message);
    button.disabled=false;
    button.innerHTML='Enviar puntajes <span>→</span>';
    return;
  }
  const {error}=await supabaseClient.from('evaluations').insert({rater_name:name,scores});
  button.disabled=false;
  button.innerHTML='Enviar puntajes <span>→</span>';
  if(error){
    const message=error.code==='23505'?'Ya existe una evaluación enviada con ese nombre.':'No se pudieron guardar los puntajes. Intentá de nuevo.';
    status.textContent=message;
    window.alert(message);
    return;
  }
  await loadSubmissions();
  status.textContent=`¡Listo, ${name}! Tu columna de puntajes quedó guardada.`;
});

const themeToggle=document.getElementById('themeToggle');
if(localStorage.getItem('arg26-theme')==='dark') document.body.classList.add('dark');
function updateTheme(){const dark=document.body.classList.contains('dark');themeToggle.textContent=dark?'Modo claro':'Modo oscuro';themeToggle.setAttribute('aria-pressed',dark);localStorage.setItem('arg26-theme',dark?'dark':'light');}
themeToggle.addEventListener('click',()=>{document.body.classList.toggle('dark');updateTheme();});

document.querySelectorAll('[data-view-button]').forEach(button=>button.addEventListener('click',()=>{
  const view=button.dataset.viewButton;
  document.querySelectorAll('.app-view').forEach(section=>section.classList.toggle('active',section.dataset.view===view));
  document.querySelectorAll('[data-view-button]').forEach(item=>item.classList.toggle('active',item===button));
  window.scrollTo({top:0,behavior:'smooth'});
}));

updateTheme();
updateSummary();
syncRatingFilters();
loadSubmissions();
if(supabaseClient) supabaseClient.channel('evaluations-live').on('postgres_changes',{event:'*',schema:'public',table:'evaluations'},loadSubmissions).subscribe();
