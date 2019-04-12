const BaseList = require('./base-list');

class TypedList extends BaseList {

    constructor(option = {}){
        option = { ...option };
        super(option);
        let { T } = option;
        this.T = T;
    }

    resolveItem(item){
        if(!(item instanceof this.T)){
            let err = `Type error at arguments[0]`;
            throw err;
        }
        return item;
    }

    append(item){
        return super.append(this.resolveItem(item));
    }

    insert(index, item){
        return super.insert(index, this.resolveItem(item));
    }

    add(...args){
        return super.append(new this.T(...args));
    }

};

module.exports = TypedList;

