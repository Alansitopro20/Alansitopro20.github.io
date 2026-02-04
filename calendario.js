let fechaActual=new Date();
let fechaSeleccionada="";

/* === EVENTOS === */
const getE=()=>JSON.parse(localStorage.getItem("eventos"))||[];
const saveE=e=>localStorage.setItem("eventos",JSON.stringify(e));

function crearCalendario(){
  calendar.innerHTML="";
  const y=fechaActual.getFullYear();
  const m=fechaActual.getMonth();
  mesTexto.textContent=fechaActual.toLocaleDateString("es",{month:"long",year:"numeric"});

  const firstDay=new Date(y,m,1).getDay()||7;
  for(let i=1;i<firstDay;i++) calendar.appendChild(document.createElement("div"));

  const days=new Date(y,m+1,0).getDate();
  for(let d=1;d<=days;d++){
    const f=`${y}-${String(m+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;
    const ev=getE().filter(e=>e.fecha===f);
    const div=document.createElement("div");
    div.className="day";
    div.innerHTML=`<strong>${d}</strong>`;
    if(ev.length) div.innerHTML+=`<div class="dots">${"•".repeat(ev.length)}</div>`;
    div.onclick=()=>abrirModal(f);
    calendar.appendChild(div);
  }
}

function cambiarMes(v){
  fechaActual.setMonth(fechaActual.getMonth()+v);
  crearCalendario();
}

function abrirModal(f){
  fechaSeleccionada=f;
  modal.style.display="flex";
  mostrarEventosDia();
}
function cerrarModal(){modal.style.display="none"}

function guardarEvento(){
  if(!titulo.value||!hora.value) return;
  const e=getE();
  e.push({id:crypto.randomUUID(),fecha:fechaSeleccionada,titulo:titulo.value,hora:hora.value});
  saveE(e);
  titulo.value="";hora.value="";
  mostrarEventosDia();crearCalendario();mostrarEventosHoy();
}

function mostrarEventosDia(){
  eventosDia.innerHTML="";
  getE().filter(e=>e.fecha===fechaSeleccionada)
    .sort((a,b)=>a.hora.localeCompare(b.hora))
    .forEach(e=>{
      const li=document.createElement("li");
      li.innerHTML=`${e.hora} - ${e.titulo}
      <button class="danger" onclick="delE('${e.id}')">🗑</button>`;
      eventosDia.appendChild(li);
    });
}

function delE(id){
  saveE(getE().filter(e=>e.id!==id));
  mostrarEventosDia();crearCalendario();mostrarEventosHoy();
}

function mostrarEventosHoy(){
  const hoy=new Date().toISOString().split("T")[0];
  eventosHoy.innerHTML="";
  getE().filter(e=>e.fecha===hoy)
    .sort((a,b)=>a.hora.localeCompare(b.hora))
    .forEach(e=>{
      const li=document.createElement("li");
      li.innerHTML=`<label><input type="checkbox"> ${e.hora} - ${e.titulo}</label>`;
      li.querySelector("input").onchange=()=>delE(e.id);
      eventosHoy.appendChild(li);
    });
}

/* === LIBRES === */
const getL=()=>JSON.parse(localStorage.getItem("libres"))||[];
const saveL=l=>localStorage.setItem("libres",JSON.stringify(l));

function renderLibres(f=""){
  listaLibres.innerHTML="";
  getL().filter(p=>p.titulo.toLowerCase().includes(f)||p.categoria.toLowerCase().includes(f))
  .forEach(p=>{
    const li=document.createElement("li");
    li.innerHTML=`<label><input type="checkbox"> ${p.titulo} <small>(${p.categoria})</small></label>
    <button class="danger" onclick="delL('${p.id}')">🗑</button>`;
    li.querySelector("input").onchange=()=>delL(p.id);
    listaLibres.appendChild(li);
  });
}

function delL(id){
  saveL(getL().filter(p=>p.id!==id));
  renderLibres();updateCat();
}

formLibre.onsubmit=e=>{
  e.preventDefault();
  const l=getL();
  l.push({id:crypto.randomUUID(),titulo:libreTitulo.value,categoria:libreCategoria.value||"General"});
  saveL(l);
  libreTitulo.value="";libreCategoria.value="";
  renderLibres();updateCat();
};

buscar.oninput=e=>renderLibres(e.target.value.toLowerCase());

function updateCat(){
  categorias.innerHTML="";
  [...new Set(getL().map(p=>p.categoria))].forEach(c=>{
    const o=document.createElement("option");o.value=c;categorias.appendChild(o);
  });
}

crearCalendario();mostrarEventosHoy();renderLibres();updateCat();
