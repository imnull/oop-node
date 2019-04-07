const ElementAbstract = require('./element-abstract');
const { invalidValue } = require('./utils');

class ElementText extends ElementAbstract {
    constructor(option){
        option = { ...option, type: 3, name: '#text' };
        super(option);
        let { value = '' } = option;
        this.value = value;
    }

    getContentString(){
        if(invalidValue(this.value)){
            return '';
        }
        return this.value.toString();
    }
}

module.exports = ElementText;