// Copyright (c) 2019 Trey Owen, and contributors
// This document loads the settings from settings.json

// Use document.body reference, etc.


var request = new XMLHttpRequest(),
url = "settings.json";
request.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    // Load settings
    var settings = JSON.parse(this.responseText);
    // general
    document.title += " -" + settings.general.name;
    document.documentElement.setAttribute("lang", settings.general.language);
    var charset = document.createElement("meta");
    charset.setAttribute("charset", settings.general.charset);
    document.head.appendChild(charset);
    console.log("hello");
  }
}
request.open("GET", url, true);
request.send();