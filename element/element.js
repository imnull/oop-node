const { resolveNS, invalidValue } = require('./utils');
const ElementBase = require('./element-base');
const NodeList = require('../list/node-list');

class Element extends ElementBase {
    constructor(option = {}){
        option = { ...option, type: 1 };
        super(option);
        let { name, namespace, document } = option;
        this.name = name;
        this.namespace = namespace;
        this.document = document;

        let { childNodes, ItemConstructor } = option;
        if(childNodes instanceof NodeList){
            childNodes = childNodes.clone();
        } else {
            childNodes = new NodeList({ ItemConstructor: ElementBase, parent: this });
        }
        this.childNodes = childNodes;
    }

    toString(){
        let { name, namespace, document } = this;
        if(invalidValue(name)){
            return '';
        }
        
        let { format = false } = this.document || {};
        if(this.childNodes.length < 1){
            return super.toString();
        } else {
            name = resolveNS(name, namespace || document.namespace);
            let attrs = '';

            if(this.attributes.length > 0){
                attrs = ` ${this.attributes}`
            }
            let s = `${name}${attrs}`;

            let prefix = this.getFormatPrefix();

            if(format){
                return `${prefix}<${s}>\n${this.childNodes.toString()}\n${prefix}</${name}>`
            } else {
                return `<${s}>${this.childNodes.toString()}</${name}>`
            }
        }
    }

    appendChild(node){
        return this.childNodes.append(node);
    }
};

module.exports = Element;