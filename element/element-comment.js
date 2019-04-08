const { invalidValue } = require('./utils');
const ElementAbstract = require('./element-abstract');

class ElementComment extends ElementAbstract {
    constructor(option){
        option = { ...option, type: 8, name: '#comment' };
        super(option);
        let { value = '' } = option;
        this.value = value;
    }

    toString(depthOffset = 0){
        let { value } = this;
        if(invalidValue(this.value)){
            value = '';
        }
        return `${this.getFormatPrefix(depthOffset)}<!-- ${value.toString()} -->`;
    }
}

module.exports = ElementComment;