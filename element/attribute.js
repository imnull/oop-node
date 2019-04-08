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

    toString(){
        let { name, value, parent, namespace } = this;
        if(!invalidValue(name)){
            namespace = namespace || parent.namespace;
            name = resolveNS(name, namespace);
            if(!invalidValue(value)){
                return `${name}=${JSON.stringify(value)}`;
            } else {
                return name;
            }
        }
        return '';
    }
};

module.exports = Attribute;

