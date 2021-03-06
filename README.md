# oop-node
OOP模式的结构化节点

## 安装

```bash
npm i oop-node
```

## 继承结构

```
BaseNode
    - NamedNode
        - Attribute
        - ElementAbstract
            - ElementBase
                + AttributeList :: attributes
                - ElementComment
                - ElementText
                - Element
                    + NodeList<ElementAbstract> :: childNodes
        - Document
            + NodeList<ElementAbstract> :: childNodes
    - TreeNode
BaseList
    - TypedList<T>
        - NodeList<T>
            - AttributeList<Attribute>
```

## 使用

### 代码
```js
const { Document } = require('oop-element');

let document = new Document();
let div = doc.appendChild(doc.createElement('view'));
div.setAttribute('class', 'user-name').setAttribute('date', '2019-04-07');
div.appendChild(doc.createComment('User Name'));
div.appendChild(doc.createElement('h1')).appendChild(doc.createText('Hello~'));
div.appendChild(doc.createText('Marvin'));
div.appendChild(doc.createElement('image')).setAttribute('src', 'http://asdfsadfsa.asfdfa.com');
div.appendChild(doc.createComment('User Name End'));
console.log(doc.toString());
```

### 输出
```html
<view class="user-name" date="2019-04-07"><!-- User Name -->Marvin<!-- User Name End --></view>
```

### 带缩进
```js
let document = new Document({
    format: true,   // 带格式
    indent: '    ', // 缩进字符串（默认2空格）
});

```

### 输出
```html
<view class="user-name" date="2019-04-07">
    <!-- User Name -->
    Marvin
    <!-- User Name End -->
</view>
```