const TypedList = require('../list/typed-list');
const BaseNode = require('../node/base-node');

class NodeList extends TypedList {

    constructor(option){
        option = { ...option };
        super(option);
        let { parent, document } = option;
        this.parent = parent;
        this.document = document;
    }

    append(item){
        if(item instanceof BaseNode){
            if(item.document === this.document){
                item = super.append(item);
                item.parent = this.parent;
                return item;
            }
            let err = `The item to append is in another document.`;
            throw err;
        }
        let err = `Type error at arguments[0]`;
        throw err;
    }

    add(option, ...args){
        let { parent, document } = this;
        option = { ...option, parent, document };
        return super.add(option, ...args);

    }

    cloneList(list){
        return list.map(item => item.clone());
    }

    toString(depthOffset = 0){
        let { format = false } = this.document || {};
        let joiner = '';
        if(format){
            joiner = '\n';
        }
        return this.list.map(item => {
            return item.toString(depthOffset);
        }).join(joiner);
    }
};

module.exports = NodeList;