const NamedNode = require('../node/named-node');
const { invalidValue } = require('./utils');

class ElementComment extends NamedNode {
    constructor(option){
        option = { ...option, type: 8, name: '#comment' };
        super(option);
        let { value = '' } = option;
        this.value = value;
    }

    toString(){
        let { value } = this;
        if(invalidValue(this.value)){
            value = '';
        }
        let { indent = '  ', format = false } = this.document || {};
        let prefix = '';
        if(format){
            prefix = indent.replace(this.depth);
        }
        return `${prefix}<!-- ${value.toString()} -->`;
    }
}

module.exports = ElementComment;