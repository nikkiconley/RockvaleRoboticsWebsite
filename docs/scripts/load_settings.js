// Copyright (c) 2019 Trey Owen, and contributors
// This document loads the settings from settings.json

// Use document.body reference, etc.
console.log("Small Site Utility: Copyright (c) 2019 Trey Owen, and contributors. Unauthorized distribution is prohibited.");

var menuBox = document.getElementsByTagName("nav")[0];
var menuBtn = document.getElementById("menu-btn");
var footer = document.getElementsByTagName("footer")[0];

var request = new XMLHttpRequest(),
url = "settings/settings.json";
request.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    // Load settings
    var settings = JSON.parse(this.responseText);
    // General
    document.title += " - " + settings.general.name;
    document.documentElement.lang = settings.general.language;
    var charset = document.createElement("meta");
    charset.setAttribute("charset", settings.general.charset);
    document.head.appendChild(charset);
    // SEO
    // Skip noindex, nofollow
    var keywords = document.createElement("meta");
    keywords.name = "keywords";
    keywords.content = settings.seo.keywords;
    document.head.appendChild(keywords);
    var description = document.createElement("meta");
    description.name = "description";
    description.content = settings.seo.description;
    document.head.appendChild(description);
    // Menu/navigation links
    settings.links.forEach(function(n) {
      var link = document.createElement("a");
      link.setAttribute("aria-role", "menu-item");
      link.href = n.url;
      link.innerText = n.name;
      menuBox.appendChild(link);
    });
    // Edit link
    var editLink = document.createElement("a");
    editLink.href = "settings/index.html";
    var editLinkIcon = document.createElement("i");
    editLinkIcon.classList.add("material-icons");
    editLinkIcon.innerText = "edit";
    editLink.appendChild(editLinkIcon);
    editLink.innerHTML += "Edit page";
    footer.appendChild(editLink);
    // Menu link
    var shown;
    menuBtn.addEventListener("click", () => {
      if (shown == 1) {
    	//Hide menuBox
    	shown = 0;
    	menuBox.removeAttribute("aria-expanded");
    	menuBox.classList.remove("shown");
      } else {
    	shown = 1;
    	menuBox.setAttribute("aria-expanded", "true");
    	menuBox.classList.add("shown");
      }
    });

  }
}
request.open("GET", url, true);
request.send();
