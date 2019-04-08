const { resolveNS, invalidValue } = require('./utils');
const NamedNode = require('../node/named-node');

class ElementAbstract extends NamedNode {
    constructor(option){
        option = { ...option };
        super(option);
        let { parent, document } = option;
        this.parent = parent;
        this.document = document;
    }

    getContentString(){
        let { name, namespace, document } = this;
        if(invalidValue(name)){
            return '';
        }
        namespace = namespace || document.namespace;
        name = resolveNS(name, namespace);
        return name;
    }

    getFormatPrefix(depthOffset = 0){
        let { document } = this;
        let { indent = '  ', format = false } = document;
        if(format){
            return indent.repeat(this.depth + depthOffset);
        } else {
            return '';
        }
    }

    toString(depthOffset = 0){
        let content = this.getContentString(depthOffset);
        if(!content){
            return '';
        }
        return `${this.getFormatPrefix(depthOffset)}<${content}/>`;
    }
}

module.exports = ElementAbstract;