const NamedNode = require('../node/named-node');
const { invalidValue } = require('./utils');

class ElementText extends NamedNode {
    constructor(option){
        option = { ...option, type: 3, name: '#text' };
        super(option);
        let { value = '' } = option;
        this.value = value;
    }

    toString(){
        if(invalidValue(this.value)){
            return '';
        }
        let { indent = '  ', format = false } = this.document || {};
        let prefix = '';
        if(format){
            prefix = indent.replace(this.depth);
        }
        return prefix + this.value.toString();
    }
}

module.exports = ElementText;