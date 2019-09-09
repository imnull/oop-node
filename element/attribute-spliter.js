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
module.exports = AttributeSpliter;