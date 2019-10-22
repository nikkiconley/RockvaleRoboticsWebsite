// Copyright (c) 2019 Trey Owen, and contributors

// Variables
// Visual editor
var visualToolbarBox = document.getElementById("visual-toolbar-box"),
visualParagraphBtn = document.getElementById("visual-paragraph-btn"),
visualHyperlinkBtn = document.getElementById("visual-hyperlink-btn"),
visualBox = document.getElementById("visual-box");
// HTML editor
var htmlBox = document.getElementById("html-box");
// Upload webpage

// Visual editor
function createVisualElement(tagName, allowEditing) {
  var visualElement = document.createElement(tagName);
  visualElement.contentEditable = allowEditing;
  return visualElement;
}

function addVisualElement(element) {
  return element;
}

function addHTMLElement(element) {
  //htmlBox.innerText += JSON.stringify(element);
}

visualParagraphBtn.onclick = function() {
  var paragraph = createVisualElement("p", true);
  paragraph.innerText = "Paragraph";
  visualBox.appendChild(paragraph);
}

visualHyperlinkBtn.onclick = function() {
  var hyperlink = createVisualElement("a", true);
  hyperlink.href = "#";
  hyperlink.innerText = "Hyperlink";
  visualBox.addVisualElement(hyperlink);
  htmlBox.value = hyperlink.outerHTML;
  //addHTMLElement(hyperlink);
}
