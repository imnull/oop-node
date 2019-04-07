const ElementAbstract = require('./element-abstract');
const AttributeList = require('./attribute-list');

class ElementBase extends ElementAbstract {
    constructor(option){
        option = { ...option };
        super(option);

        let { attributes } = option;
        if(!(attributes instanceof AttributeList)){
            attributes = new AttributeList({ parent: this, document: this.document });
        } else {
            attributes = attributes.clone();
        }
        this.attributes = attributes;
    }
    
    setAttribute(name, value){
        let a = this.attributes.findByName(name);
        if(a){
            a.value = value;
        } else {
            this.attributes.add({
                name, value
            });
        }
        return this;
    }

    getAttribute(name){
        let a = this.attributes.findByName(name);
        return a ? a.value : null;
    }

    getContentString(){
        let name = super.getContentString();
        if(this.attributes.length > 0){
            name = `${name} ${this.attributes.toString()}`;
        }
        return name;
    }
};

module.exports = ElementBase;