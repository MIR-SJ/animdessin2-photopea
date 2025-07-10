// Photopea-compatible AnimDessin2 Lite (Layer-based Frame Manager)
// Add this script to your plugin's script.js

let frameCount = 0;

// Helper to run Photopea scripts
function postToPhotopea(script) {
  window.parent.postMessage({
    type: "script",
    script: script
  }, "*");
}

// Add a blank frame (new transparent layer)
function addFrame() {
  const script = `
    var doc = app.activeDocument;
    var newLayer = doc.artLayers.add();
    newLayer.name = "Frame_" + doc.artLayers.length;
    doc.activeLayer = newLayer;
    doc.selection.selectAll();
    doc.selection.clear();
  `;
  postToPhotopea(script);
  frameCount++;
}

// Duplicate the currently selected frame
function duplicateFrame() {
  const script = `
    var doc = app.activeDocument;
    var dup = doc.activeLayer.duplicate();
    dup.name = "Frame_copy_" + doc.artLayers.length;
    doc.activeLayer = dup;
  `;
  postToPhotopea(script);
}

// Onion Skinning - lower opacity of layer above and below
function onionSkin() {
  const script = `
    var doc = app.activeDocument;
    var layers = doc.artLayers;
    var idx = layers.findIndex(l => l == doc.activeLayer);
    if (idx > 0) layers[idx - 1].opacity = 30;
    if (idx < layers.length - 1) layers[idx + 1].opacity = 30;
    doc.activeLayer.opacity = 100;
  `;
  postToPhotopea(script);
}

// UI buttons
function createUI() {
  const container = document.createElement("div");
  container.style = "padding: 10px; font-family: sans-serif;";

  const title = document.createElement("h3");
  title.innerText = "AnimDessin2 Lite";

  const btn1 = document.createElement("button");
  btn1.innerText = "Add Blank Frame";
  btn1.onclick = addFrame;

  const btn2 = document.createElement("button");
  btn2.innerText = "Duplicate Frame";
  btn2.onclick = duplicateFrame;

  const btn3 = document.createElement("button");
  btn3.innerText = "Onion Skin Toggle";
  btn3.onclick = onionSkin;

  [title, btn1, btn2, btn3].forEach(el => {
    el.style = "display: block; margin-bottom: 10px; width: 150px;";
    container.appendChild(el);
  });

  document.body.appendChild(container);
}

createUI();
