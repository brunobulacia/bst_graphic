import { formatJSON, connectEdges } from "./paint.js";

let cy;

export function initializeCytoscape() {
  cy = cytoscape({
    container: document.getElementById("cy"), // container to render in

    elements: formatJSON().concat(connectEdges()),
    style: [
      {
        selector: "node",
        style: {
          "background-color": "#ffffff",
          "border-width": 2,
          "border-color": "#222831",
          "text-halign": "center",
          "text-valign": "center",
          label: "data(id)",
          width: 32,
          height: 32,
        },
      },
      {
        selector: "edge",
        style: {
          width: 4,
          "line-color": "#222831",
          "target-arrow-color": "#222831",
          "target-arrow-shape": "triangle",
          "curve-style": "bezier",
        },
      },
    ],
    layout: {
      name: "preset",
    },
    userZoomingEnabled: true,
    userPanningEnabled: true,
    boxSelectionEnabled: false,
    selectionType: "single",
    touchTapThreshold: 8,
    minZoom: 0.7, // Set minimum zoom level
    maxZoom: 1.5, // Set maximum zoom level
  });
  cy.viewport({
    zoom: 1.2,
    pan: { x: 500, y: 100 },
  });
  cy.nodes().forEach((node) => {
    node.ungrabify(); // Makes the node not draggable
  });
}

export function getCy() {
  return cy;
}
