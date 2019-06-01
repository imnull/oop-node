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
        if(!this.document){
            return;
        }
        let op = { ...this.document.option };
        let { NSGlobal = null, NSSpliter = null } = op;
        if(NSGlobal && NSSpliter && typeof(NSGlobal) === 'string' && typeof(NSSpliter) === 'string'){
            let ns = `${NSGlobal}${NSSpliter}`;
            if(this.name.length > ns.length + 1 && this.name.indexOf(ns) === 0){
                this.namespace = NSGlobal;
                this.namespaceSpliter = NSSpliter;
                this.name = this.name.substr(ns.length);
            }
        }
    }
};

module.exports = NamedNode;