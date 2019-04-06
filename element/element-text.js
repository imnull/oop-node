const ElementBase = require('./element-base');
const { invalidValue } = require('./utils');

class ElementText extends ElementBase {
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
        return this.getFormatPrefix() + this.value.toString();
    }
}

module.exports = ElementText;