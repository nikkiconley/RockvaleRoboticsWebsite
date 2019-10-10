// Copyright (c) 2019 Trey Owen

var uploadBox = document.getElementById("upload-box");
var uploadBtn = document.getElementById("upload-btn");
var settingsBox = document.getElementById("settings-box");

// Check for upload
uploadBtn.onclick = function() {
  var file = uploadBox.files[0];
  if (file !== undefined) {
    if (file.type == "application/json") {
      // Load valid json file
      uploadBox.disabled = "true";
      uploadBtn.disabled = "true";
      var reader = new FileReader();
      reader.readAsText(file);
      reader.onload = function(event) {
        var settings = JSON.parse(event.target.result);
        settingsBox.style.display = "block;";
      }
    } else {
      alert("Incorrect file type.");
    }
  } else {
    alert("Please select a file to upload.");
  }
}
