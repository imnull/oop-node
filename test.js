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
div.appendChild(doc.createText(' OOP'));
div.appendChild(doc.createText(' NO-WRAP '));
div.appendChild(doc.createElement('image')).setAttribute('src', 'http://asdfsadfsa.asfdfa.com');
div.appendChild(doc.createComment('User Name End'));
div.appendChild(doc.createElement('aaaa')).appendChild(doc.createElement('bbbb')).appendChild(doc.createElement('ccc')).appendChild(doc.createText(' - dddd - '));

div.insertBefore(doc.createElement('yiya'), h1).appendChild(doc.createText(' yiya\nyiya~ '));
let input = doc.createElement('input');
let t = doc.createText('inputing');
div.appendChild(input).appendChild(t);
input.removeChild(t)


doc.appendChild(doc.createText('abcdefghijklmn~~~...!!!'));
// // console.log(div.toString());
console.log(doc.toString({
    NSGlobal: 's',
    NSSpliter: '-',
    NSAttributes: ['if', 'else', 'elif', 'for', 'key', 'for-index', 'for-item'],
    elementAlone: false,
    formatIgnore: [3],
    aloneElements: ['input', 'image'],
    
}));

let testNode = doc.createElement('view');
testNode.setAttribute('for', '{{items}}');
testNode.setAttribute('for-index', 'idx');
console.log(testNode.toString(0, {
    NSGlobal: 's',
    NSSpliter: '-',
    NSAttributes: ['if', 'else', 'elif', 'for', 'key', 'for-index', 'for-item']
}))

console.log(doc.query(n => n.name === 'h1').query(n => n.name === '#text').path);

while(h1){
    console.log(1111111, h1.name)
    h1 = h1.previousSibling();
}

