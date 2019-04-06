const TypedList = require('./typed-list');
const BaseNode = require('../node/base-node');

class NodeList extends TypedList {
    checkItem(item){
        return super.checkItem(item) && item instanceof BaseNode;
    }

    cloneList(list){
        return list.map(item => item.clone());
    }

    toString(){
        return this.list.map(item => {
            return `${item}`;
        }).join('\n');
    }
};

module.exports = NodeList;