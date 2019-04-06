const NamedNode = require('./named-node');
const NodeList = require('../list/node-list');

class NamedTreeNode extends NamedNode {
    constructor(option){
        option = { ...option };
        super(option);
        let { childNodes, ItemConstructor, document } = option;
        if(childNodes instanceof NodeList){
            childNodes = childNodes.clone();
        } else {
            childNodes = new NodeList({ ItemConstructor, document });
        }
        this.childNodes = childNodes;
    }

    appendChild(node){
        node.parent = this;
        let r = this.childNodes.append(node);
        return r;
    }
}

module.exports = NamedTreeNode;