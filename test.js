const Document = require('./element/document');

// let document = new Document();
let document = new Document({
    format: true,   // 带格式
    indent: '    ', // 缩进字符串（默认2空格）
});
let div = document.createElement('view');
div.setAttribute('class', 'user-name').setAttribute('date', '2019-04-07');
div.appendChild(document.createComment('User Name'));
div.appendChild(document.createText('Marvin'));
div.appendChild(document.createComment('User Name End'));
console.log(div.toString());