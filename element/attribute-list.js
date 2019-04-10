const NodeList = require('./node-list');
const Attribute = require('./attribute');

class AttributeList extends NodeList {
    constructor(option){ super({ ...option, T: Attribute }) }

    toString(option){
        if(this.length < 1){
            return '';
        }
        return this.list.map(item => item.toString(option)).join(' ');
    }

    findByName(name){
        return super.find(item => item.name === name);
    }

    add(name, value){
        let op = { name, value, parent: this.parent, document: this.document };
        return super.add(op);
    }
};

module.exports = AttributeList;