import { initializeCytoscape } from "./cytoscape/graph.js";
let nodes;

// Función para cargar los nodos desde la API
export async function getAPI() {
  try {
    const response = await fetch("https://rest-api-bst.onrender.com/api");
    if (!response.ok) {
      throw new Error("Error del servidor");
    }
    const data = await response.json();
    if (!data || data.length === 0) {
      console.error("No hay nodos disponibles en el árbol.");
      return;
    }
    nodes = data;
    initializeCytoscape();
  } catch (error) {
    console.error("Error:", error);
  }
}

// Función para obtener la raíz del árbol
export function root() {
  if (nodes && nodes.length > 0) {
    return nodes[0][0];
  } else {
    throw new Error("No hay nodos disponibles en el árbol.");
  }
}

// Función para obtener todos los nodos del árbol (excepto la raíz)
export function getNodes() {
  if (nodes) {
    return nodes.slice(1, nodes.length);
  } else {
    throw new Error("No hay nodos disponibles en el árbol.");
  }
}

// Función para insertar un nodo en el árbol a través de la API
export async function insertNodeAPI(value) {
  try {
    const response = await fetch(
      `https://rest-api-bst.onrender.com/api/insert/${value}`,
      {
        method: "POST",
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log(`Nodo ${value} insertado:`, data);
      getAPI(); // Volver a cargar los nodos después de la inserción
    } else {
      console.error("Error al insertar el nodo:", response.statusText);
    }
  } catch (error) {
    console.error("Error de red al insertar el nodo:", error);
  }
}

// Función para vaciar el árbol
export async function clearTreeAPI() {
  try {
    const response = await fetch(
      "https://rest-api-bst.onrender.com/api/clear",
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log("Árbol vacío:", data);
      getAPI(); // Volver a cargar los nodos después de la eliminación
    } else {
      console.error("Error al vaciar el árbol:", response.statusText);
    }
  } catch (error) {
    console.error("Error de red al vaciar el árbol:", error);
  }
}

// Función para eliminar un nodo del árbol a través de la API
export async function deleteNodeAPI(value) {
  try {
    const response = await fetch(
      `https://rest-api-bst.onrender.com/api/delete/${value}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log(`Nodo ${value} eliminado:`, data);
      getAPI(); // Volver a cargar los nodos después de la eliminación
    } else {
      console.error("Error al eliminar el nodo:", response.statusText);
    }
  } catch (error) {
    console.error("Error de red al eliminar el nodo:", error);
  }
}

// Carga los datos de la API cuando la página se carga
window.onload = getAPI;
