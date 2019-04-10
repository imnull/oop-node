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
div.appendChild(doc.createElement('h1')).appendChild(doc.createText('Hello~'));
div.appendChild(doc.createText('Marvin'));
div.appendChild(doc.createElement('image')).setAttribute('src', 'http://asdfsadfsa.asfdfa.com');
div.appendChild(doc.createComment('User Name End'));
// // console.log(div.toString());
console.log(doc.toString({
    NSGlobal: 's',
    NSSpliter: '-'
}));

// console.log(div.attributes.list)

// console.log(doc.queryAll(n => n.type === 8).map(n => n.toString()).join('\n'));

// doc.each(n => console.log(n.type, n.name), 2);