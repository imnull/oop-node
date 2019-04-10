const BaseNode = require('./base-node');

class NamedNode extends BaseNode {
    constructor(option = {}){
        option = { ...option };
        super(option);
        let { type, name, namespace } = option;
        this.type = type;
        this.name = name;
        this.namespace = namespace;

        this.checkNS();

    }

    checkNS(){
        let { NSGlobal = null } = this.document || {};
        if(NSGlobal && typeof(NSGlobal) === 'string'){
            if(this.name.indexOf(NSGlobal) === 0 && this.name.length > NSGlobal.length + 1){
                this.namespace = NSGlobal;
                this.namespaceSpliter = this.name.charAt(NSGlobal.length);
                this.name = this.name.substr(NSGlobal.length + 1);
            }
        }
    }
};

module.exports = NamedNode;