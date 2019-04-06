const { NamedNode } = require('../node');
const Element = require('./element');

class Document extends NamedNode {
    constructor(option){
        option = { ...option, type: 9, name: '#document' };
        super(option);
    }
    createElement(name){
        let el = new Element({ document: this, name, type: 0 });
        return el;
    }
}

module.exports = Document;