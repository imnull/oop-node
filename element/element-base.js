const { resolveNS, invalidValue } = require('./utils');
const NamedNode = require('../node/named-node');
const AttributeList = require('./attribute-list');

class ElementBase extends NamedNode {
    constructor(option){
        option = { ...option };
        super(option);
        let { parent, document, attributes } = option;
        this.parent = parent;
        this.document = document;

        if(!(attributes instanceof AttributeList)){
            attributes = new AttributeList({ parent: this });
        } else {
            attributes = attributes.clone();
        }
        this.attributes = attributes;
    }

    getFormatPrefix(){
        let { name, namespace, document } = this;
        let { indent = '  ', format = false } = document;
        if(format){
            return indent.repeat(this.depth);
        } else {
            return '';
        }
    }
    
    setAttribute(name, value){
        let a = this.attributes.findByName(name);
        if(a){
            a.value = value;
        } else {
            this.attributes.add({
                name, value
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
        let prefix = this.getFormatPrefix();
        return `${prefix}<${name}${attrs}/>`;
    }
};

module.exports = ElementBase;