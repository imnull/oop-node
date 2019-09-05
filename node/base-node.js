const { newId } = require('./id-getter');

/**
 * 节点基类抽象
 */
class BaseNode {
    constructor(option){
        option = { ...option };
        let { parent } = option;
        this.id = newId();
        this.parent = parent || null;

        Object.defineProperties(this, {
            document: {
                get: () => option.document || null,
                set: (doc) => {
                    if(!option.document){
                        option.document = doc;
                    }
                    return option.document;
                }
            }
        })
    }

    get depth(){
        if(!this.parent){
            return 0;
        } else {
            return this.parent.depth + 1;
        }
    }

    clone(){
        return new this.constructor(this);
    }
}

module.exports = BaseNode;