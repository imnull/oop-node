const { resolveNS, invalidValue } = require('./utils');
const { NamedNode, NamedTreeNode } = require('../node');
const AttributeList = require('./attribute-list');

class Element extends NamedTreeNode {
    constructor(option = {}){
        option = { ...option, type: 1, ItemConstructor: NamedNode };
        super(option);
        let { name, namespace, document, attributes } = option;
        this.name = name;
        this.namespace = namespace;
        this.document = document;

        if(!(attributes instanceof AttributeList)){
            attributes = new AttributeList();
        } else {
            attributes = attributes.clone();
        }
        this.attributes = attributes;
    }

    setAttribute(name, value){
        let a = this.attributes.findByName(name);
        if(a){
            a.value = value;
        } else {
            this.attributes.add({
                name, value, type: 2,
                parent: this, document: this.document
            });
        }
        return this;
    }

    getAttribute(name){
        let a = this.attributes.findByName(name);
        return a ? a.value : null;
    }

    toString(){
        let { name, namespace, document } = this;
        if(invalidValue(name)){
            return '';
        }

        namespace = namespace || document.namespace;
        name = resolveNS(name, namespace);
        let attrs = '';
        if(this.attributes.length > 0){
            attrs = ` ${this.attributes}`
        }

        let { indent = '  ', format = false } = this.document || {};
        let s = `${name}${attrs}`;
        if(format){
            let prefix = indent.repeat(this.depth);
            if(this.childNodes.length < 1){
                s = `${prefix}<${s}/>`;
            } else {
                s = `${prefix}<${s}>\n${this.childNodes.toString()}\n${prefix}</${name}>`
            }
        } else {
            if(this.childNodes.length < 1){
                s = `<${s}/>`;
            } else {
                s = `<${s}>${this.childNodes.toString()}</${name}>`
            }
        }
        return s;
    }
};

module.exports = Element;