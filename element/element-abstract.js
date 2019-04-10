const { resolveNS, invalidValue } = require('./utils');
const NamedNode = require('../node/named-node');

class ElementAbstract extends NamedNode {

    getContentString(option){
        let { name } = this;
        if(invalidValue(name)){
            return '';
        }
        name = resolveNS(this, option);
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

    toString(depthOffset = 0, option){
        let content = this.getContentString(option);
        if(!content){
            return '';
        }
        return `${this.getFormatPrefix(depthOffset)}<${content}/>`;
    }
}

module.exports = ElementAbstract;