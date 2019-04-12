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

    cloneList(list){
        return list.map(item => item.clone());
    }

    toString(depthOffset = 0, option){
        option = { ...option };
        let { format = false } = option;
        let joiner = '';
        if(format){
            joiner = '\n';
        }
        return this.list.map(item => {
            return item.toString(depthOffset, option);
        }).join(joiner);
    }

    query(fn){
        let node = null;
        this.each(n => {
            if(fn(n)){
                node = n;
                return true;
            } else if(n.childNodes instanceof NodeList) {
                node = n.childNodes.query(fn);
                if(node){
                    return true;
                }
            }
        });
        return node;
    }

    queryAll(fn, r = []){
        this.each(n => {
            if(fn(n)){
                r.push(n);
            }
            if(n.childNodes instanceof NodeList){
                n.childNodes.queryAll(fn, r)
            }
        });
        return r;
    }
};

module.exports = NodeList;