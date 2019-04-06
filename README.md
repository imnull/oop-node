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
        - ElementComment
        - ElementText
        - Document
        - NamedTreeNode<T>
            + NodeList<T>
            - Element
                + AttributeList :: attributes
                + NodeList<NamedNode> :: childNodes
    - TreeNode
BaseList
    - TypedList<T>
        - NodeList<BaseNode>
            - AttributeList<Attribute>
```

## 使用

### 代码
```js
const { Document } = require('oop-element');

let document = new Document();
let div = document.createElement('view');
div.setAttribute('class', 'user-name').setAttribute('date', '2019-04-07');
div.appendChild(document.createComment('User Name'));
div.appendChild(document.createText('Marvin'));
div.appendChild(document.createComment('User Name End'));
console.log(div.toString());
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