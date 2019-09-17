const NamedNode = require('../node/named-node');
const { resolveNS, invalidValue } = require('./utils');

class Attribute extends NamedNode {
    constructor(option = {}){
        option = { ...option };
        super(option);
        let { value, type = 2 } = option;
        this.value = value;
        this.type = type;
    }

    get path(){
        let n = `/@${this.name}`;
        if(this.parent && this.parent.type === 1){
            n = `${this.parent.path}${n}`;
        }
        return n;
    }

    get index(){
        if(!this.parent){
            return -1;
        }
        return this.parent.childNodes.indexOf(this);
    }

    toString(option){
        let { name, value, quote = '"' } = this;
        option = { ...option };
        if(!invalidValue(name)){
            name = resolveNS(this, option);
            if(!invalidValue(value)){
                if(quote === '"'){
                    return `${name}=${JSON.stringify(value)}`;
                } else {
                    return `${name}=${quote}${value}${quote}`;
                }
            } else {
                return name;
            }
        }
        return '';
    }
};

module.exports = Attribute;

