// Copyright (c) 2019 Trey Owen, and contributors
// This document loads the settings from settings.json

// Use document.body reference, etc.

console.log("hello");
var request = new XMLHttpRequest(),
url = "settings/settings.json";
request.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    // Load settings
    var settings = JSON.parse(this.responseText);
    // General
    document.title += " -" + settings.general.name;
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

  }
}
request.open("GET", url, true);
request.send();
