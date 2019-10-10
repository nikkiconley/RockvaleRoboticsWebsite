// Copyright (c) 2019 Trey Owen

var uploadBox = document.getElementById("upload-box");
var uploadBtn = document.getElementById("upload-btn");
// Settings variables and input boxes
var settingsBox = document.getElementById("settings-box"),
nameBox = document.getElementById("name-box"),
langBox = document.getElementById("lang-box"),
charsetBox = document.getElementById("charset-box"),
noindexBox = document.getElementById("noindex-box"),
nofollowBox = document.getElementById("nofollow-box"),
keywordsBox = document.getElementById("keywords-box"),
descriptionBox = document.getElementById("description-box"),
addLinkBtn = document.getElementById("add-link-btn"),
linkBox = document.getElementById("link-box");

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
        // General
        nameBox.value = settings.general.name;
        langBox.value = settings.general.language;
        charsetBox.value = settings.general.charset;
        // SEO
        noindexBox.value = settings.seo.noindex;
        nofollowBox.value = settings.seo.nofollow;
        keywordsBox.value = settings.seo.keywords;
        descriptionBox.value = settings.seo.description;
        // Navigation links
        settings.links.forEach(function(link) {
          var innerLinkBox = document.createElement("div");
          innerLinkBox.classList.add("card");
          innerLinkBox.classList.add("m-2");
          innerLinkBox.classList.add("d-flex");
          var linkNameBox = document.createElement("input");
          linkNameBox.type = "text";
          linkNameBox.classList.add("form-control");
          linkNameBox.classList.add("m-2");
          linkNameBox.classList.add("w-auto");
          if (link == 0) {
            linkNameBox.placeholder = "Home";
          } else {
            linkNameBox.placeholder = "Page";
          }
          linkNameBox.value = link.name;
          innerLinkBox.appendChild(linkNameBox);
          var linkUrlBox = document.createElement("input");
          linkUrlBox.type = "text";
          linkUrlBox.classList.add("form-control");
          linkUrlBox.classList.add("m-2");
          linkUrlBox.classList.add("w-auto");
          linkUrlBox.value = link.url;
          innerLinkBox.appendChild(linkUrlBox);
          linkBox.appendChild(innerLinkBox);
        });
        // Show settings
        settingsBox.classList.remove("hidden");
      }
    } else {
      alert("Incorrect file type.");
    }
  } else {
    alert("Please select a file to upload.");
  }
}
