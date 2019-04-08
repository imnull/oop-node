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

        this.root = new Element({ document: this, parent: null, name: 'root', type: 100 })

        let { format = false, indent = '  ' } = option;
        this.format = format;
        this.indent = indent;
    }

    appendChild(node){
        return this.root.appendChild(node);
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
        return this.root.childNodes.toString(-1);
    }

    query(...args){
        return this.root.childNodes.query(...args);
    }
    queryAll(...args){
        return this.root.childNodes.queryAll(...args);
    }
}

module.exports = Document;