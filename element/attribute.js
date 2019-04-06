const NamedNode = require('../node/named-node');
const { resolveNS, invalidValue } = require('./utils');

class Attribute extends NamedNode {
    constructor(option = {}){
        option = { ...option, type: 2 };
        super(option);
        let { value } = option;
        this.value = value;
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

