const ElementAbstract = require('./element-abstract');
const { invalidValue } = require('./utils');

class ElementText extends ElementAbstract {
    constructor(option){
        option = { ...option, type: 3, name: '#text' };
        super(option);
        let { value = '' } = option;
        this.value = value;
    }

    toString(depthOffset = 0){
        if(invalidValue(this.value)){
            return '';
        }
        return `${this.getFormatPrefix(depthOffset)}${this.value}`;
    }
}

module.exports = ElementText;