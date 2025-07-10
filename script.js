let currentIndex = 0;
let playing = false;

function postToPhotopea(code) {
  window.parent.postMessage(code, "*");
}

function addFrame() {
  const jsx = `
    var doc = app.activeDocument;
    var layer = doc.artLayers.add();
    layer.name = "Frame_" + doc.artLayers.length;
    doc.activeLayer = layer;
  `;
  postToPhotopea(jsx);
}

function duplicateFrame() {
  const jsx = `
    var doc = app.activeDocument;
    doc.activeLayer.duplicate();
  `;
  postToPhotopea(jsx);
}

function prevFrame() {
  const jsx = `
    var doc = app.activeDocument;
    var idx = doc.artLayers.getByName(doc.activeLayer.name).itemIndex;
    if (idx > 0) doc.activeLayer = doc.artLayers[idx - 1];
  `;
  postToPhotopea(jsx);
}

function nextFrame() {
  const jsx = `
    var doc = app.activeDocument;
    var idx = doc.artLayers.getByName(doc.activeLayer.name).itemIndex;
    if (idx < doc.artLayers.length - 1) doc.activeLayer = doc.artLayers[idx + 1];
  `;
  postToPhotopea(jsx);
}

function toggleOnionSkin() {
  const jsx = `
    var doc = app.activeDocument;
    for (var i = 0; i < doc.artLayers.length; i++) {
      var layer = doc.artLayers[i];
      layer.opacity = (layer.opacity === 100) ? 20 : 100;
    }
  `;
  postToPhotopea(jsx);
}

function playAnimation() {
  if (playing) return;
  playing = true;
  const jsx = `
    var doc = app.activeDocument;
    for (var i = 0; i < doc.artLayers.length; i++) {
      doc.artLayers[i].visible = false;
    }
    doc.artLayers[0].visible = true;
  `;
  postToPhotopea(jsx);
  setTimeout(() => {
    playing = false;
  }, 2000);
}
