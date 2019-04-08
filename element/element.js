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

    toString(depthOffset = 0){
        if(this.childNodes.length < 1){
            return super.toString(depthOffset);
        } else {
            let { format = false } = this.document || {};
            let { name } = this;
            let tag = this.getContentString();
            let prefix = this.getFormatPrefix(depthOffset);
            let children = this.childNodes.toString(depthOffset);
            if(format){
                return `${prefix}<${tag}>\n${children}\n${prefix}</${name}>`
            } else {
                return `<${tag}>${children}</${name}>`
            }
        }
    }

    appendChild(node){
        return this.childNodes.append(node);
    }
};

module.exports = Element;