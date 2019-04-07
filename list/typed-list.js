const BaseList = require('./base-list');

class TypedList extends BaseList {

    constructor(option = {}){
        option = { ...option };
        super(option);
        let { T } = option;
        this.T = T;
    }

    append(item){
        if(item instanceof this.T){
            return super.append(item);
        } else {
            let err = `Type error at arguments[0]`;
            throw err;
        }
    }

    add(...args){
        return super.append(new this.T(...args));
    }

};

module.exports = TypedList;

