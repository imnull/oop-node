const { NodeList } = require('../list');
const Attribute = require('./attribute');

class AttributeList extends NodeList {
    constructor(option){ super({ ...option, ItemConstructor: Attribute }) }

    toString(){
        if(this.length < 1){
            return '';
        }
        return this.list.map(item => item.toString()).join(' ');
    }

    findByName(name){
        return super.find(item => item.name === name);
    }
};

module.exports = AttributeList;