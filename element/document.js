const NamedNode = require('../node/named-node');
const NodeList = require('./node-list');
const ElementAbstract = require('./element-abstract');

const Attribute = require('./attribute');
const Element = require('./element');
const ElementText = require('./element-text');
const ElementComment = require('./element-comment');

class Document extends NamedNode {
    constructor(option){
        option = { ...option, type: 9, name: '#document' };
        super(option);

        let { childNodes } = option;
        if(childNodes instanceof NodeList){
            childNodes = childNodes.clone();
        } else {
            childNodes = new NodeList({ T: ElementAbstract, parent: null, document: this });
        }
        this.childNodes = childNodes;

        let { format = false, indent = '  ' } = option;
        this.format = format;
        this.indent = indent;
    }

    appendChild(node){
        return this.childNodes.append(node);
    }

    createElement(name){
        let el = new Element({ document: this, name });
        return el;
    }

    createText(value){
        return new ElementText({ document: this, value });
    }

    createComment(value){
        return new ElementComment({ document: this, value });
    }

    createAttribute(name, value){
        return new Attribute({ document: this, name, value });
    }

    toString(){
        return this.childNodes.toString();
    }
}

module.exports = Document;