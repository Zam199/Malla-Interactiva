const courses = {
  "Cálculo diferencial": [],
  "Matemáticas discretas 1": [],
  "Introducción al Área Profesional": [],
  "Algoritmos y programación 1": [],
  "Lengua Materna": [],
  "Humanidades 1": [],
  "Física del Movimiento": [],
  "Cálculo Integral": ["Cálculo diferencial"],
  "Geometría vectorial": [],
  "Matemáticas discretas 2": ["Matemáticas discretas 1"],
  "Semiótica informática": ["Introducción al Área Profesional"],
  "Algoritmos y programación 2": ["Algoritmos y programación 1"],
  "Deporte, Arte y Recreación": [],
  "Humanidades 2": ["Humanidades 1"],
  "Electricidad y magnetismo": ["Física del Movimiento"],
  "Cálculo de varias variables": ["Cálculo Integral"],
  "Álgebra Lineal": ["Geometría vectorial"],
  "Taller de lenguajes de programación 1": ["Algoritmos y programación 2"],
  "Algoritmos y programación 3": ["Algoritmos y programación 2"],
  "Pedagogía Constitucional": [],
  "Electrónica digital": ["Electricidad y magnetismo"],
  "Ecuaciones diferenciales": ["Cálculo de varias variables"],
  "Bases de datos 1": ["Álgebra Lineal"],
  "Análisis de software": ["Semiótica informática"],
  "Algoritmos y programación 4": ["Algoritmos y programación 3"],
  "Emprendimiento empresarial TI": [],
  "Arquitectura de hardware": ["Electrónica digital"],
  "Estadística Aplicada": ["Ecuaciones diferenciales"],
  "Lenguajes y compiladores": ["Bases de datos 1"],
  "Diseño de software": ["Análisis de software"],
  "Taller de lenguajes de programación 2": ["Taller de lenguajes de programación 1"],
  "Ecología": [],
  "Sistemas operativos": ["Arquitectura de hardware"],
  "Teoría de la información": ["Estadística Aplicada"],
  "Numérico": ["Lenguajes y compiladores"],
  "Proyecto de construcción de software": ["Diseño de software"],
  "Pruebas y gestión de la configuración": ["Taller de lenguajes de programación 2"],
  "Humanidades 3": ["Humanidades 2"],
  "Metodología de la Investigación": [],
  "Redes de comunicaciones": ["Teoría de la información"],
  "Investigación de operaciones": ["Numérico"],
  "Inteligencia artificial": ["Bases de datos 2"],
  "Sistemas organizacionales": ["Proyecto de construcción de software"],
  "Evaluación y comunicación de proyectos TI": ["Pruebas y gestión de la configuración"],
  "Ética": [],
  "Gestión de redes y servicios": ["Redes de comunicaciones"],
  "Simulación": ["Investigación de operaciones"],
  "Profundización 1": ["Inteligencia artificial"],
  "Integrador": ["Sistemas organizacionales"],
  "Arquitectura y diseño distribuido": ["Evaluación y comunicación de proyectos TI"],
  "Electiva 1": [],
  "Electiva 2": [],
  "Profundización 2": ["Profundización 1"],
  "Gestión de proyectos de TI": ["Arquitectura y diseño distribuido"],
  "Trabajo de Grado": ["Integrador"],
  "Electiva 3": ["Electiva 2"]
};

const saved = JSON.parse(localStorage.getItem("progress") || "{}");
const grid = document.getElementById("grid");

function createCourse(name) {
  const div = document.createElement("div");
  div.classList.add("course");
  div.textContent = name;
  div.dataset.name = name;
  grid.appendChild(div);
  return div;
}

function updateStatuses() {
  document.querySelectorAll(".course").forEach(div => {
    const name = div.dataset.name;
    if (saved[name]) {
      div.className = "course completed";
    } else if (
      courses[name].every(prereq => saved[prereq])
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
  } else if (courses[name].every(prereq => saved[prereq])) {
    saved[name] = true;
  }
  localStorage.setItem("progress", JSON.stringify(saved));
  updateStatuses();
}

document.getElementById("reset").addEventListener("click", () => {
  localStorage.clear();
  Object.keys(saved).forEach(k => delete saved[k]);
  updateStatuses();
});

Object.keys(courses).forEach(name => {
  const div = createCourse(name);
  div.addEventListener("click", () => toggleCourse(name));
});

updateStatuses();
