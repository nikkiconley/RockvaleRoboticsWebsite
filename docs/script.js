
/* Copyright (c) 2019 Trey Owen, and contributors */

// General variables
var mainBox = document.getElementsByTagName("main")[0],
menuBox = document.getElementsByTagName("nav")[0],
loadingBox = document.getElementById("loading-box");

// Request
var request = new XMLHttpRequest,
url = "settings.json";
request.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		// Request sucessful, load sections
		var object = JSON.parse(this.responseText);
		object.sections.forEach(function(section) {
			var sectionBox = document.createElement("section");
			var title = document.createElement("h2"),
			titleText = document.createTextNode(section.title);
			title.appendChild(titleText);
			sectionBox.appendChild(title);
			sectionBox.innerHTML += section.content;
			mainBox.appendChild(sectionBox);
			if (section.id != "") {
				// Set section id attribute
				sectionBox.setAttribute("id", section.id);
				// Create link in navigation
				var sectionLink = document.createElement("a");
				sectionLink.setAttribute("aria-role", "menuBox-item");
				sectionLink.setAttribute("href", "#" + section.id);
				sectionLink.innerText = section.title;
				menuBox.appendChild(sectionLink);
			}
		});
		// Load sponsors
		var sponsorBox = document.createElement("div");
		sponsorBox.setAttribute("id", "sponsor-box");
		sponsorBox.classList = "grey-box flex-box";
		var sponsorTitle = document.createElement("h2");
		sponsorTitle.innerText = "Team sponsors";
		sponsorBox.appendChild(sponsorTitle);
		object.sponsors.forEach(function(sponsor) {
			var sponsorLink = document.createElement("a");
			if (sponsor.url != "") {
				// Create link
				sponsorLink.setAttribute("href", sponsor.url);
			} else {
				// Create dead link
				sponsorLink.setAttribute("href", "#");
			}
			
			sponsorLink.setAttribute("title", sponsor.name);
			if (sponsor.logoUrl != "") {
				// Add logo to url
				var sponsorLogo = document.createElement("img");
				sponsorLogo.setAttribute("src", sponsor.logoUrl);
			} else {
				sponsorLink.innerText = sponsor.name;
			}
			sponsorBox.appendChild(sponsorLink);
		});
		var sponsorBoxLink = document.createElement("a");
		sponsorBoxLink.setAttribute("aria-role", "menuBox-item");
		sponsorBoxLink.setAttribute("href", "#" + sponsorBox.id);
		sponsorBoxLink.innerText = sponsorTitle.innerText;
		menuBox.appendChild(sponsorBoxLink);
		mainBox.appendChild(sponsorBox);
		// Create link for about
		var aboutBoxLink = document.createElement("a");
		aboutBoxLink.setAttribute("aria-role", "menuBox-item");
		aboutBoxLink.setAttribute("href", "#about-box");
		aboutBoxLink.innerText = "About";
		menuBox.appendChild(aboutBoxLink);
		// Delete loading box
		mainBox.removeChild(loadingBox);
	}
}
request.open("GET", url, true);
request.send();


var menuBtn = document.getElementById("menu-btn"),
shown;
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
menuBox.addEventListener("click", () => {
  shown = 0;
  menuBox.removeAttribute("aria-expanded");
  menuBox.classList.remove("shown");
});
=======

var menuBtn = document.getElementById("menu-btn");
var menu = document.getElementsByTagName("nav")[0];
var shown;
menuBtn.addEventListener("click", () => {
  if (shown == 1) {
    //Hide menu
    shown = 0;
    menu.removeAttribute("aria-expanded");
    menu.classList.remove("shown");
  } else {
    shown = 1;
    menu.setAttribute("aria-expanded", "true");
    menu.classList.add("shown");
  }
});
menu.addEventListener("click", () => {
  shown = 0;
  menu.removeAttribute("aria-expanded");
  menu.classList.remove("shown");
});
