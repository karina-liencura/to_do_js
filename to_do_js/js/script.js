let tareas = [];

function agregarTarea() {
  const input = document.getElementById("tarea");
  const descripcion = input.value.trim();
  if (descripcion === "") return;

  const nuevaTarea = {
    id: Math.floor(Math.random() * 1000),
    descripcion,
    realizada: false
  };

  tareas.push(nuevaTarea);
  input.value = "";
  renderizarTareas();
}

function renderizarTareas() {
  const tbody = document.getElementById("listaTareas");
  tbody.innerHTML = "";

  let realizadas = 0;

  tareas.forEach((tarea) => {
    if (tarea.realizada) realizadas++;

    const fila = document.createElement("tr");
    fila.className = "tarea-row";

    fila.innerHTML = `
      <td>${tarea.id}</td>
      <td class="${tarea.realizada ? 'realizada' : ''}">${tarea.realizada ? tarea.descripcion + ' (realizado)' : tarea.descripcion}</td>
      <td class="checkbox">
        <input type="checkbox" ${tarea.realizada ? 'checked' : ''} onchange="toggleRealizada(${tarea.id})">
      </td>
      <td class="checkbox">
        <span class="btn-eliminar" onclick="eliminarTarea(${tarea.id})">✖</span>
      </td>
    `;

    tbody.appendChild(fila);
  });

  document.getElementById("total").textContent = tareas.length;
  document.getElementById("realizadas").textContent = realizadas;
}

function toggleRealizada(id) {
  const tarea = tareas.find(t => t.id === id);
  if (tarea) {
    tarea.realizada = !tarea.realizada;
    renderizarTareas();
  }
}

function eliminarTarea(id) {
  tareas = tareas.filter(t => t.id !== id);
  renderizarTareas();
}

