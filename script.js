const semesters = [
  ["Cálculo diferencial", "Matemáticas discretas 1", "Introducción al Área Profesional", "Algoritmos y programación 1", "Lengua Materna", "Humanidades 1"],
  ["Física del Movimiento", "Cálculo Integral", "Geometría vectorial", "Matemáticas discretas 2", "Semiótica informática", "Algoritmos y programación 2", "Deporte, Arte y Recreación", "Humanidades 2"],
  ["Electricidad y magnetismo", "Cálculo de varias variables", "Álgebra Lineal", "Taller de lenguajes de programación 1", "Algoritmos y programación 3", "Pedagogía Constitucional"],
  ["Electrónica digital", "Ecuaciones diferenciales", "Bases de datos 1", "Análisis de software", "Algoritmos y programación 4", "Emprendimiento empresarial TI", "Arquitectura de hardware"],
  ["Estadística Aplicada", "Lenguajes y compiladores", "Diseño de software", "Taller de lenguajes de programación 2", "Ecología", "Sistemas operativos"],
  ["Teoría de la información", "Numérico", "Proyecto de construcción de software", "Pruebas y gestión de la configuración", "Humanidades 3", "Metodología de la Investigación"],
  ["Redes de comunicaciones", "Investigación de operaciones", "Inteligencia artificial", "Sistemas organizacionales", "Evaluación y comunicación de proyectos TI", "Ética"],
  ["Gestión de redes y servicios", "Simulación", "Profundización 1", "Integrador", "Arquitectura y diseño distribuido", "Electiva 1", "Electiva 2"],
  ["Profundización 2", "Gestión de proyectos de TI", "Trabajo de Grado", "Electiva 3"]
];

const prerequisites = {
  "Cálculo Integral": ["Cálculo diferencial"],
  "Matemáticas discretas 2": ["Matemáticas discretas 1"],
  "Semiótica informática": ["Introducción al Área Profesional"],
  "Algoritmos y programación 2": ["Algoritmos y programación 1"],
  "Humanidades 2": ["Humanidades 1"],
  "Electricidad y magnetismo": ["Física del Movimiento"],
  "Cálculo de varias variables": ["Cálculo Integral"],
  "Álgebra Lineal": ["Geometría vectorial"],
  "Taller de lenguajes de programación 1": ["Algoritmos y programación 2"],
  "Algoritmos y programación 3": ["Algoritmos y programación 2"],
  "Electrónica digital": ["Electricidad y magnetismo"],
  "Ecuaciones diferenciales": ["Cálculo de varias variables"],
  "Bases de datos 1": ["Álgebra Lineal"],
  "Análisis de software": ["Semiótica informática"],
  "Algoritmos y programación 4": ["Algoritmos y programación 3"],
  "Arquitectura de hardware": ["Electrónica digital"],
  "Estadística Aplicada": ["Ecuaciones diferenciales"],
  "Lenguajes y compiladores": ["Bases de datos 1"],
  "Diseño de software": ["Análisis de software"],
  "Taller de lenguajes de programación 2": ["Taller de lenguajes de programación 1"],
  "Sistemas operativos": ["Arquitectura de hardware"],
  "Teoría de la información": ["Estadística Aplicada"],
  "Numérico": ["Lenguajes y compiladores"],
  "Proyecto de construcción de software": ["Diseño de software"],
  "Pruebas y gestión de la configuración": ["Taller de lenguajes de programación 2"],
  "Humanidades 3": ["Humanidades 2"],
  "Redes de comunicaciones": ["Teoría de la información"],
  "Investigación de operaciones": ["Numérico"],
  "Inteligencia artificial": ["Bases de datos 1"],
  "Sistemas organizacionales": ["Proyecto de construcción de software"],
  "Evaluación y comunicación de proyectos TI": ["Pruebas y gestión de la configuración"],
  "Profundización 1": ["Inteligencia artificial"],
  "Integrador": ["Sistemas organizacionales"],
  "Arquitectura y diseño distribuido": ["Evaluación y comunicación de proyectos TI"],
  "Profundización 2": ["Profundización 1"],
  "Gestión de proyectos de TI": ["Arquitectura y diseño distribuido"],
  "Trabajo de Grado": ["Integrador"],
  "Electiva 3": ["Electiva 2"]
};

const saved = JSON.parse(localStorage.getItem("progress") || "{}");
const container = document.getElementById("semesters");

function updateStatuses() {
  document.querySelectorAll(".course").forEach(div => {
    const name = div.dataset.name;
    if (saved[name]) {
      div.className = "course completed";
    } else if (
      !prerequisites[name] || prerequisites[name].every(pr => saved[pr])
    ) {
      div.className = "course unlocked";
    } else {
      div.className = "course blocked";
    }
  });
}

function toggleCourse(name) {
  if (saved[name]) {
    delete saved[name];
  } else if (!prerequisites[name] || prerequisites[name].every(pr => saved[pr])) {
    saved[name] = true;
  }
  localStorage.setItem("progress", JSON.stringify(saved));
  updateStatuses();
}

function buildGrid() {
  semesters.forEach((courses, index) => {
    const col = document.createElement("div");
    col.className = "semester";
    const title = document.createElement("h2");
    title.textContent = `Semestre ${index + 1}`;
    col.appendChild(title);

    courses.forEach(name => {
      const div = document.createElement("div");
      div.classList.add("course");
      div.textContent = name;
      div.dataset.name = name;
      div.addEventListener("click", () => toggleCourse(name));
      col.appendChild(div);
    });

    container.appendChild(col);
  });

  updateStatuses();
}

document.getElementById("reset").addEventListener("click", () => {
  localStorage.clear();
  Object.keys(saved).forEach(k => delete saved[k]);
  updateStatuses();
});

buildGrid();
