const ElementBase = require('./element-base');
const ElementAbstract = require('./element-abstract');
const NodeList = require('./node-list');

class Element extends ElementBase {
    constructor(option = {}){
        option = { ...option, type: 1 };
        super(option);

        let { childNodes } = option;
        if(childNodes instanceof NodeList){
            childNodes = childNodes.clone();
        } else {
            childNodes = new NodeList({ T: ElementAbstract, parent: this, document: this.document });
        }
        this.childNodes = childNodes;
    }

    toString(depthOffset = 0, option){
        option = { ...option };
        let { elementAlone = false, format = false } = option;
        let { name } = this;
        let tag = this.getContentString(option);
        let prefix = this.getFormatPrefix(depthOffset, option);
        if(this.childNodes.length < 1){
            if(elementAlone){
                return super.toString(depthOffset, option);
            } else {
                return `${prefix}<${tag}></${name}>`;
            }
        } else {
            let children = this.childNodes.toString(depthOffset, option);
            if(format){
                return `${prefix}<${tag}>\n${children}\n${prefix}</${name}>`
            } else {
                return `<${tag}>${children}</${name}>`
            }
        }
    }

    each(fn, deeply = 0){
        this.childNodes.each((n, i, p) => {
            fn(n, i, p);
            if(deeply > 0 && n instanceof ElementBase){
                if(deeply > 1){
                    n.attributes.each((...args) => fn(...args));
                }
                if(n instanceof Element){
                    n.each(fn, deeply);
                }
            }
        })
    }

    appendChild(node){
        return this.childNodes.append(node);
    }
};

module.exports = Element;