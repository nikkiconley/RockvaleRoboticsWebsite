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
linkBox = document.getElementById("link-box"),
downloadBtn = document.getElementById("download-btn");

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
          // Link name box
          var linkNameBox = document.createElement("input");
          linkNameBox.type = "text";
          linkNameBox.classList.add("form-control");
          linkNameBox.classList.add("m-2");
          linkNameBox.classList.add("w-auto");
          if (link == 0) {
            linkNameBox.placeholder = "Home";
          } else {
            linkNameBox.placeholder = "Link name";
          }
          linkNameBox.value = link.name;
          innerLinkBox.appendChild(linkNameBox);
          // Link url box
          var linkUrlBox = document.createElement("input");
          linkUrlBox.type = "text";
          linkUrlBox.classList.add("form-control");
          linkUrlBox.classList.add("m-2");
          linkUrlBox.classList.add("w-auto");
          linkUrlBox.placeholder = "Filename";
          linkUrlBox.value = link.url;
          // Link remove Button
          var removeLinkBtn = document.createElement("button");
          removeLinkBtn.type = "button";
          removeLinkBtn.classList.add("btn");
          removeLinkBtn.classList.add("btn-danger");
          removeLinkBtn.classList.add("m-2");
          removeLinkBtn.classList.add("w-auto");
          removeLinkBtn.innerText = "Remove";
          removeLinkBtn.addEventListener("click", function(event) {
            // Remove the link
            linkBox.removeChild(innerLinkBox);
          });
          innerLinkBox.appendChild(linkUrlBox);
          innerLinkBox.appendChild(removeLinkBtn);
          linkBox.appendChild(innerLinkBox);
        });
        // Add event handler for add link button
        addLinkBtn.onclick = function() {
          var innerLinkBox = document.createElement("div");
          innerLinkBox.classList.add("card");
          innerLinkBox.classList.add("m-2");
          innerLinkBox.classList.add("d-flex");
          // Link name box
          var linkNameBox = document.createElement("input");
          linkNameBox.type = "text";
          linkNameBox.classList.add("form-control");
          linkNameBox.classList.add("m-2");
          linkNameBox.classList.add("w-auto");
          linkNameBox.placeholder = "Link name";
          linkNameBox.value = "Page " + (linkBox.children.length + 1);
          innerLinkBox.appendChild(linkNameBox);
          // Link url box
          var linkUrlBox = document.createElement("input");
          linkUrlBox.type = "text";
          linkUrlBox.classList.add("form-control");
          linkUrlBox.classList.add("m-2");
          linkUrlBox.classList.add("w-auto");
          linkUrlBox.placeholder = "Filename";
          linkUrlBox.value = "";
          // Link remove Button
          var removeLinkBtn = document.createElement("button");
          removeLinkBtn.type = "button";
          removeLinkBtn.classList.add("btn");
          removeLinkBtn.classList.add("btn-danger");
          removeLinkBtn.classList.add("m-2");
          removeLinkBtn.classList.add("w-auto");
          removeLinkBtn.innerText = "Remove";
          removeLinkBtn.addEventListener("click", function(event) {
            // Remove the link
            linkBox.removeChild(innerLinkBox);
          });
          innerLinkBox.appendChild(linkUrlBox);
          innerLinkBox.appendChild(removeLinkBtn);
          linkBox.appendChild(innerLinkBox);
        }
        // Download
        var settingBoxes = settingsBox.querySelectorAll("input");
        settingBoxes.forEach(function(box) {
          box.addEventListener("input", function() {
            downloadBtn.classList.add("disabled");
            downloadBtn.setAttribute("aria-disabled", "true");
            var blob = new Blob([JSON.stringify(createJSON())], {type: "application/json"});
            downloadBtn.href = URL.createObjectURL(blob);
            downloadBtn.download = "settings.json";
            console.log(downloadBtn.href);
            downloadBtn.classList.remove("disabled");
            downloadBtn.removeAttribute("aria-disabled");
          });
        });

        function cleanString(string) {
          return string.replace(/"/g, "\"");
        }

        function createJSON() {
          var json = { general: {}, seo: {}, links: [] };
          // General
          json.general.name = cleanString(nameBox.value);
          json.general.language = cleanString(langBox.value);
          json.general.charset = cleanString(charsetBox.value);
          // SEO
          json.seo.noindex = noindexBox.value;
          json.seo.nofollow = nofollowBox.value;
          json.seo.keywords = cleanString(keywordsBox.value);
          json.seo.description = cleanString(descriptionBox.value);
          // Links
          var innerLinkBoxes = linkBox.querySelectorAll(".card");
          innerLinkBoxes.forEach(function(innerLinkBox) {
            var link = {name: innerLinkBox.firstElementChild.value, url: innerLinkBox.children[1].value};
            json.links.push(link);
          });
          // Return
          return json;
        }
        // Show settings
        settingsBox.classList.remove("hidden");
        // Download
        function Download() {

        }
      }
    } else {
      alert("Incorrect file type.");
    }
  } else {
    alert("Please select a file to upload.");
  }
}
