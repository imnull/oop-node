const NodeList = require('./node-list');
const Attribute = require('./attribute');
const AttributeSpliter = require('./attribute-spliter');

class AttributeList extends NodeList {
    constructor(option){ super({ ...option, T: Attribute }) }

    toString(option){
        if(this.length < 1){
            return '';
        }
        const joiner = option.format ? ' ' : '';
        let tplItem = null, arr = [];
        this.list.forEach(item => {
            if(arr.length > 0){
                arr.push(joiner);
                if((item instanceof Attribute && !(item instanceof AttributeSpliter)) && !(tplItem instanceof AttributeSpliter) && !joiner){
                    arr.push(' ');
                }
            }
            arr.push(item.toString(option));
            tplItem = item;
        });
        let str = arr.join('')//.replace(/^\s+|\s+$/g, '')
        return str
        return this.list.map(item => item.toString(option)).join(joiner);
    }

    findByName(name){
        return super.find(item => item.name === name);
    }

    add(name, value){
        let op = { name, value, parent: this.parent, document: this.document };
        return super.add(op);
    }

    addSpliter(value){
        this.list.push(new AttributeSpliter({ value }));
        // return super.append(new AttributeSpliter({ value }))
    }

    removeAt(index){
        const r = super.removeAt(index);
        while(index > 0){
            index -= 1;
            if(this.list[index] instanceof AttributeSpliter){
                super.removeAt(index);
            } else {
                return r;
            }
        }
        return r;
    }
};

module.exports = AttributeList;