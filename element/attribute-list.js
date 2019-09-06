const NodeList = require('./node-list');
const Attribute = require('./attribute');

class AttributeSpliter extends Attribute {
    constructor(option = {}){
        super(option);
        this.name = NaN;
    }
    toString(option){
        const { format = false } = option;
        return format ? '' : this.value;
    }
}

class AttributeList extends NodeList {
    constructor(option){ super({ ...option, T: Attribute }) }

    toString(option){
        if(this.length < 1){
            return '';
        }
        const joiner = option.format ? ' ' : '';
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