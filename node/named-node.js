const BaseNode = require('./base-node');

class NamedNode extends BaseNode {
    constructor(option = {}){
        option = { ...option };
        super(option);
        let { type, name, namespace } = option;
        this.type = type;
        this.name = name;
        this.namespace = namespace;
    }
};

module.exports = NamedNode;