const { NamedNode } = require('../node');
const Element = require('./element');
const ElementText = require('./element-text');
const ElementComment = require('./element-comment');
const Attribute = require('./attribute');

class Document extends NamedNode {
    constructor(option){
        option = { ...option, type: 9, name: '#document' };
        super(option);
        let { format = false, indent = '  ' } = option;
        this.format = format;
        this.indent = indent;
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
}

module.exports = Document;