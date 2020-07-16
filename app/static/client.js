var el = x => document.getElementById(x);

function showPicker() {
  el("file-input").click();
}

function showPicked(input) {
  el("upload-label").innerHTML = input.files[0].name;
  var reader = new FileReader();
  reader.onload = function(e) {
    el("image-picked").src = e.target.result;
    el("image-picked").className = "";
  };
  reader.readAsDataURL(input.files[0]);
}

function analyze() {
  var uploadFiles = el("file-input").files;
  if (uploadFiles.length !== 1) alert("Please select a file to analyze!");

  el("analyze-button").innerHTML = "Analyzing...";
  var xhr = new XMLHttpRequest();
  var loc = window.location;
  xhr.open("POST", `${loc.protocol}//${loc.hostname}:${loc.port}/analyze`,
    true);
  xhr.onerror = function() {
    alert("You killed my server! Reload and try a low resolution image.");
  };
  xhr.onload = function(e) {
    if (this.readyState === 4) {
      var response = JSON.parse(e.target.responseText);
      el("cardboard-label").innerHTML = `cardboard = ${response["cardboard"]}`;
      el("glass-label").innerHTML = `glass = ${response["glass"]}`;
      el("metal-label").innerHTML = `metal = ${response["metal"]}`;
      el("paper-label").innerHTML = `paper = ${response["paper"]}`;
      el("plastic-label").innerHTML = `plastic = ${response["plastic"]}`;
      el("trash-label").innerHTML = `trash = ${response["trash"]}`;
    }
    el("analyze-button").innerHTML = "Analyze";
  };

  var fileData = new FormData();
  fileData.append("file", uploadFiles[0]);
  xhr.send(fileData);
}

