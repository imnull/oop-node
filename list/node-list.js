const TypedList = require('./typed-list');
const BaseNode = require('../node/base-node');

class NodeList extends TypedList {

    constructor(option){
        option = { ...option };
        super(option);
        let { parent } = option;
        this.parent = parent;
    }

    append(item){
        item = super.append(item);
        item.parent = this.parent;
        return item;
    }

    add(option, ...args){
        let { parent } = this;
        option = { ...option, parent };
        return super.add(option, ...args);

    }

    checkItem(item){
        return super.checkItem(item) && item instanceof BaseNode;
    }

    cloneList(list){
        return list.map(item => item.clone());
    }

    toString(){
        let { format = false } = this.parent.document || {};
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