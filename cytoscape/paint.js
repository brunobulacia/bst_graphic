import { getAPI, getNodes, root } from "../connection.js";
import { getCy } from "./graph.js";

let nodes = [];
let edges = [];

async function initializeGraph() {
  await getAPI(); // Espera hasta que los nodos estén listos
  formatJSON();
  connectEdges();
  moveNode();
}

initializeGraph(); // Llama a la función asincrónica para inicializar el grafo

export function formatJSON() {
  let posY = 0;
  let posX = 0;
  nodes.push({
    data: {
      id: String(root()),
    },
    position: { x: 100, y: -40 },
  });
  getNodes().forEach((node) => {
    nodes.push({
      data: {
        id: String(node[0]),
      },
      position: { x: posX, y: posY },
    });
  });
  return nodes;
}

export function connectEdges() {
  getNodes().forEach((node) => {
    edges.push({
      data: {
        id: String(node[1]) + "-" + String(node[0]),
        source: String(node[1]), // El padre
        target: String(node[0]), // El nodo actual
      },
    });
  });
  return edges;
}

export function moveNode() {
  if (getNodes().length > 1) {
    const cy = getCy();
    let horizontalSpacing = Math.pow(
      2,
      getNodes()[getNodes().length - 1][2] + 4
    ); // Espaciado horizontal ajustado (antes 300)
    let verticalSpacing = 50; // Espaciado vertical ajustado (antes 100)
    let rootX = 500; // Posición inicial de la raíz en el eje X (mantener o ajustar)
    let rootY = 50; // Posición inicial de la raíz en el eje Y (mantener o ajustar)

    // Recorrer cada nodo para posicionarlos
    getNodes().forEach((node) => {
      let parent = cy.getElementById(String(node[1])); // Obtener el nodo padre
      let child = cy.getElementById(String(node[0])); // Obtener el nodo hijo
      let posX, posY;
      let posParent = parent.position();
      posY = posParent.y + verticalSpacing; // El hijo siempre estará debajo del padre, con menos altura
      // Ajustamos el espaciado horizontal según el nivel del nodo
      let depth = node[2]; // La profundidad del nodo
      let levelSpacing = horizontalSpacing / Math.pow(2, depth); // Reducimos el espacio con la profundidad

      if (node[0] < node[1]) {
        // El hijo es menor que el padre, va a la izquierda
        posX = posParent.x - levelSpacing;
      } else {
        // El hijo es mayor que el padre, va a la derecha
        posX = posParent.x + levelSpacing;
      }
      // Actualizamos la posición del nodo hijo
      child.position({ x: posX, y: posY });
    });
  }
}
