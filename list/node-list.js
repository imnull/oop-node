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
        let { format = false } = this.document || {};
        let joiner = '';
        if(format){
            joiner = '\n';
        }
        return this.list.map(item => {
            return `${item.toString()}`;
        }).join(joiner);
    }
};

module.exports = NodeList;