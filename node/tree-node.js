const BaseNode = require('./base-node');
const NodeList = require('../list/node-list')

class TreeNode extends BaseNode {
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
        return this.childNodes.append(node);
    }
};

module.exports = TreeNode;