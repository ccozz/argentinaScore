const squad = [
  ['Emiliano Martínez','Arquero','gk',true,23],['Gerónimo Rulli','Arquero','gk',false,12],['Juan Musso','Arquero','gk',false,1],
  ['Nahuel Molina','Defensor','def',true,26],['Gonzalo Montiel','Defensor','def',false,4],['Cristian Romero','Defensor','def',true,13],['Marcos Senesi','Defensor','def',false,2],['Nicolás Otamendi','Defensor','def',false,19],['Lisandro Martínez','Defensor','def',true,6],['Nicolás Tagliafico','Defensor','def',true,3],['Facundo Medina','Defensor','def',false,25],
  ['Leandro Paredes','Mediocampista','mid',false,5],['Alexis Mac Allister','Mediocampista','mid',true,20],['Rodrigo De Paul','Mediocampista','mid',true,7],['Giovani Lo Celso','Mediocampista','mid',false,11],['Exequiel Palacios','Mediocampista','mid',false,14],['Enzo Fernández','Mediocampista','mid',true,24],['Valentín Barco','Mediocampista','mid',false,8],
  ['Lionel Messi','Delantero','fwd',true,10],['Julián Álvarez','Delantero','fwd',true,9],['Lautaro Martínez','Delantero','fwd',false,22],['Thiago Almada','Delantero','fwd',false,16],['Nicolás Paz','Delantero','fwd',false,18],['Nicolás González','Delantero','fwd',true,15],['Giuliano Simeone','Delantero','fwd',false,17],['José Manuel López','Delantero','fwd',false,21]
];

const targetMap={gk:'goalkeepers',def:'defenders',mid:'midfielders',fwd:'forwards'};
const noMinutes=new Set(['Gerónimo Rulli','Juan Musso']);
const positionCodes={Arquero:'ARQ',Defensor:'DEF',Mediocampista:'MED',Delantero:'DEL'};
const supabaseUrl='https://pfpospcwwkyxkhtqhttx.supabase.co';
const supabaseKey='sb_publishable_n2mdK4VkE_pXZqiWe7aBrw_rzkYqD1D';
const supabaseClient=window.supabase?.createClient?window.supabase.createClient(supabaseUrl,supabaseKey):null;
let submissionsCache=[];
const scoreOptions=()=>'<option value="">—</option>'+Array.from({length:19},(_,i)=>{const n=(i+2)/2;return `<option value="${n}">${Number.isInteger(n)?n:n.toFixed(1)}</option>`}).join('');
const escapeHtml=value=>String(value).replace(/[&<>'"]/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
const entries=()=>[...squad.map(([name,role])=>({name,role:positionCodes[role]})),{name:'Lionel Scaloni',role:'DT'}];

function renderPlayer([name,role,area,starter,number]){
  const inactive=noMinutes.has(name);
  return `<article class="player ${starter?'starter':''} ${inactive?'off':''}"><div class="shirt" aria-label="Dorsal ${number}">${number}</div><span class="player-name">${name}</span><select data-player="${name}" aria-label="Puntaje de ${name}" ${inactive?'disabled':''}>${inactive?'<option>OFF</option>':scoreOptions()}</select></article>`;
}

squad.forEach(player=>document.getElementById(targetMap[player[2]]).insertAdjacentHTML('beforeend',renderPlayer(player)));
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
  if(!submissions.length){
    body.innerHTML='<tr><td class="empty-ratings" colspan="3">Todavía no hay puntajes enviados.</td></tr>';
    return;
  }
  body.innerHTML=entries().map(person=>`<tr><td>${person.name}</td><td>${person.role}</td>${submissions.map(submission=>{const score=submissionScore(submission,person.name);return `<td>${noMinutes.has(person.name)?'<span class="off-table">OFF</span>':score===null?'—':fmt(Number(score))}</td>`;}).join('')}<td class="avg-column">${noMinutes.has(person.name)?'<span class="off-table">OFF</span>':averageForPlayer(submissions,person.name)}</td></tr>`).join('');
}

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

updateTheme();
updateSummary();
renderRatingsTable();
loadSubmissions();
if(supabaseClient) supabaseClient.channel('evaluations-live').on('postgres_changes',{event:'*',schema:'public',table:'evaluations'},loadSubmissions).subscribe();
