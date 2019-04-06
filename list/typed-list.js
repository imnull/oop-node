const BaseList = require('./base-list');

class TypedList extends BaseList {

    constructor(option = {}){
        option = { ...option };
        super(option);
        let { ItemConstructor } = option;
        this.ItemConstructor = ItemConstructor;
    }

    checkItem(item){
        return item instanceof this.ItemConstructor;
    }

    append(item){
        if(Array.isArray(item)){
            item.forEach(it => this.append(it));
            return this;
        } else {
            try {
                if(this.checkItem(item)){
                    return super.append(item);
                } else {
                    let err = `Type error at arguments[0]`;
                    throw err;
                }
            } catch(err){
                throw err;
            }
        }
    }

    add(...args){
        return super.append(new this.ItemConstructor(...args));
    }

};

module.exports = TypedList;

