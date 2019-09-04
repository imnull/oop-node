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

    resolveItem(item){
        item = super.resolveItem(item);
        if(!item.document || item.document === this.document){
            item.document = this.document;
            item.parent = this.parent;
            return item;
        }
        let err = `The item to append is in another document.`;
        throw err;
    }

    cloneList(list){
        return list.map(item => item.clone());
    }

    toString(depthOffset = 0, option){
        option = { ...option };
        let { format = false, formatIgnore = [] } = option;
        let joiner = '';
        if(format){
            joiner = '\n';
        };
        let s = '';
        let lastFormat = true;
        this.list.forEach(item => {
            let str = item.toString(depthOffset, option);
            if(format){
                if(!~formatIgnore.indexOf(item.type)){
                    if(!lastFormat){
                        // s += '\n';
                        // s = s.replace(/[\r\n]+$/g, '');
                        str = str.replace(/^\s+|[\r\n]+$/g, '');
                    } else {
                    }
                    str += joiner;
                    lastFormat = true;
                } else {
                    lastFormat = false;
                    s = s.replace(/[\r\n]+$/g, '');
                }
            }
            s += str;
        });
        return s;
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