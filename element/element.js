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
        let { elementAlone = false, format = false, formatText = true } = option;
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
            let firstLineBreak = '\n';
            let lastLineBreak = `\n${prefix}`;
            if(this.childNodes.list[0].type === 3 && !formatText){
                firstLineBreak = '';
            }
            if(this.childNodes.list[this.childNodes.list.length - 1].type === 3 && !formatText){
                lastLineBreak = '';
            }
            if(format){
                return `${prefix}<${tag}>${firstLineBreak}${children}${lastLineBreak}</${name}>`
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
        if(node.parent){
            node.parent.removeChild(node);
        }
        node.parent = this;
        return this.childNodes.append(node);
    }

    removeChild(node){
        node.parent = null;
        return this.childNodes.remove(node);
    }

    insertBefore(node, beforeNode){
        if(node.parent){
            node.parent.remove(node);
        }
        let idx = this.childNodes.indexOf(beforeNode);
        if(idx > -1){
            node.parent = this;
            return this.childNodes.insert(idx, node);
        }
        let err = `Not contains the node-before`;
        throw err;
    }

    query(...args){
        return this.childNodes.query(...args);
    }
    queryAll(...args){
        return this.childNodes.queryAll(...args);
    }
};

module.exports = Element;