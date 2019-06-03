const { Document } = require('./index');

// let document = new Document();
let doc = new Document({
    format: true,   // 带格式
    indent: '    ', // 缩进字符串（默认2空格）
    NSGlobal: 'wx',
    NSSpliter: ':'
});
let div = doc.appendChild(doc.createElement('view'));
div.setAttribute('class', 'user-name').setAttribute('date', '2019-04-07').setAttribute('wx:if', '2 < 1');
div.appendChild(doc.createComment('User Name'));
let h1 = doc.createElement('h1');
div.appendChild(h1).appendChild(doc.createText('Hello~'));
div.appendChild(doc.createText('Marvin'));
div.appendChild(doc.createElement('image')).setAttribute('src', 'http://asdfsadfsa.asfdfa.com');
div.appendChild(doc.createComment('User Name End'));
div.insertBefore(doc.createElement('yiya'), h1).appendChild(doc.createText('yiyayiya~'))

doc.appendChild(doc.createText('abcdefghijklmn~~~...!!!'));
// // console.log(div.toString());
console.log(doc.toString({
    NSGlobal: 's',
    NSSpliter: '-',
    // elementAlone: true,
    formatText: false,
}));

console.log(doc.query(n => n.name === 'h1').query(n => n.name === '#text').path)