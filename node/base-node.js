let ID = 0;

/**
 * 节点基类抽象
 */
class BaseNode {
    constructor(option){
        option = { ...option };
        let { parent, document } = option;
        this.id = ++ID;
        this.parent = parent;

        Object.defineProperties(this, {
            document: { get: () => option.document }
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