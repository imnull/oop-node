const { resolveNS, invalidValue } = require('./utils');
const NamedNode = require('../node/named-node');

class ElementAbstract extends NamedNode {

    get index(){
        if(!this.parent){
            return -1;
        }
        return this.parent.childNodes.indexOf(this);
    }

    get path(){
        let n = `/${this.name}`;
        if(this.parent && this.parent.type === 1){
            n = `${this.parent.path}${n}`;
        }
        return n;
    }

    getContentString(option){
        let { name } = this;
        if(invalidValue(name)){
            return '';
        }
        name = resolveNS(this, option);
        return name;
    }

    getFormatPrefix(depthOffset = 0, option){
        option = { ...option }
        let { indent = '  ', format = false } = option;
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
        const spliter = option.format ? ' ' : '';
        return `${this.getFormatPrefix(depthOffset, option)}<${content}${spliter}/>`;
    }

    nextSibling(){
        if(!this.parent){
            return null;
        }
        let idx = this.parent.childNodes.list.indexOf(this);
        return this.parent.childNodes.list[idx + 1] || null;
    }

    previousSibling(){
        if(!this.parent){
            return null;
        }
        let idx = this.parent.childNodes.list.indexOf(this);
        return this.parent.childNodes.list[idx - 1] || null;
    }
}

module.exports = ElementAbstract;