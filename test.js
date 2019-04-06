const Document = require('./element/document');

let document = new Document();
let div = document.createElement('div');

div.setAttribute('class', 'abc');
div.appendChild(document.createElement('text1')).appendChild(document.createElement('div'));
div.appendChild(document.createElement('text2')).appendChild(document.createElement('div'));
div.appendChild(document.createElement('text3')).appendChild(document.createElement('div'));
div.appendChild(document.createElement('text4')).appendChild(document.createElement('div'));
div.appendChild(document.createElement('text5')).appendChild(document.createElement('div'));
console.log(div.toString());