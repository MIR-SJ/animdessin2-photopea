let currentIndex = 0;
let frameCount = 0;

function postToPhotopea(jsx) {
  window.parent.postMessage(jsx, "*");
}

function addFrame() {
  const jsx = `
    var doc = app.activeDocument;
    var layer = doc.artLayers.add();
    layer.name = "Frame_" + doc.artLayers.length;
    doc.activeLayer = layer;
    doc.selection.selectAll(); doc.selection.clear();
  `;
  frameCount++;
  renderTimeline();
  postToPhotopea(jsx);
}

function duplicateFrame() {
  const jsx = `
    var dup = app.activeDocument.activeLayer.duplicate();
    dup.name = "Frame_Dup";
  `;
  frameCount++;
  renderTimeline();
  postToPhotopea(jsx);
}

function applyOnionSkin() {
  const jsx = `
    var doc = app.activeDocument;
    var layers = doc.artLayers;
    var active = doc.activeLayer;
    var index = -1;
    for (var i = 0; i < layers.length; i++) {
      if (layers[i] == active) { index = i; break; }
    }
    for (var j = 0; j < layers.length; j++) {
      if (j === index - 1 || j === index + 1) {
        layers[j].opacity = 30;
      } else if (j !== index) {
        layers[j].opacity = 100;
      }
    }
  `;
  postToPhotopea(jsx);
}

function renderTimeline() {
  const container = document.getElementById("timeline");
  container.innerHTML = "";
  for (let i = 0; i < frameCount; i++) {
    const div = document.createElement("div");
    div.className = "frame-box" + (i === currentIndex ? " active" : "");
    div.textContent = "Frame " + (i + 1);
    div.onclick = () => {
      currentIndex = i;
      selectFrame(i);
      renderTimeline();
    };
    container.appendChild(div);
  }
}

function selectFrame(index) {
  const jsx = `
    var doc = app.activeDocument;
    var layers = doc.artLayers;
    for (var i = 0; i < layers.length; i++) {
      layers[i].visible = false;
    }
    if (layers[${index}]) {
      layers[${index}].visible = true;
      doc.activeLayer = layers[${index}];
    }
  `;
  postToPhotopea(jsx);
}
