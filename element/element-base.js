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
            this.attributes.add(name, value);
        }
        return this;
    }

    getAttribute(name){
        let a = this.attributes.findByName(name);
        return a ? a.value : null;
    }

    removeAttribute(name){
        let a = this.attributes.findByName(name);
        return this.attributes.remove(a);
    }

    getContentString(option){
        let name = super.getContentString(option);
        let attrSpliter = option.format ? ' ' : '';
        if(this.attributes.length > 0){
            let attr = attrSpliter + this.attributes.toString(option);
            if(!/^\s/.test(attr)){
                attr = ' ' + attr;
            }
            name = `${name}${attr}`;
        }
        return name;
    }
};

module.exports = ElementBase;