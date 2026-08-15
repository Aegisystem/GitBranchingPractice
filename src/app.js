import { mensajes } from "./mensajes.js";

function main() {
  console.log("Práctica de ramas y merges en Git");
  console.log("---------------------------------");

  if (mensajes.length === 0) {
    console.log("Todavía no hay mensajes. Agrega uno en src/mensajes.js.");
    return;
  }

  mensajes.forEach((mensaje, indice) => {
    console.log(`${indice + 1}. ${mensaje}`);
  });

  console.log("---------------------------------");
  console.log(`Total de mensajes: ${mensajes.length}`);
}

main();
