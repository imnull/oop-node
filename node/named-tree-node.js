const NamedNode = require('./named-node');
const NodeList = require('../list/node-list');

class NamedTreeNode extends NamedNode {
    constructor(option){
        option = { ...option };
        super(option);
        let { childNodes, ItemConstructor } = option;
        if(childNodes instanceof NodeList){
            childNodes = childNodes.clone();
        } else {
            childNodes = new NodeList({ ItemConstructor });
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

// let n = new NamedTreeNode({ ItemConstructor: NamedNode });
// console.log(n);