/**
 * 列表基础类
 */
class BaseList {
    constructor(option = {}){
        let { list = [] } = { ...option };
        this.list = this.cloneList(list);
    }

    /**
     * 列表长度
     */
    get length(){
        return this.list.length;
    }

    /**
     * 添加项目
     * @param {Object} item 
     */
    append(item){
        let idx = this.list.indexOf(item);
        if(idx < 0){
            this.list.push(item);
        } else {
            this.list.push(this.list.splice(idx, 1)[0])
        }
        return item;
    }

    containsCallback(callback){
        return this.list.some((...args) => callback(...args));
    }
    contains(item){
        return this.containsCallback(it => it === item);
    }

    indexOf(item){
        return this.list.indexOf(item);
    }

    removeAt(index){
        if(index > -1 && index < this.length){
            return this.list.splice(index, 1)[0];
        } else {
            return null;
        }
    }

    remove(item){
        return this.removeAt(this.indexOf(item));
    }

    clear(){
        this.list.splice(0, this.length);
        return this;
    }

    each(fn){
        this.list.some((...args) => fn(...args));
        return this;
    }

    findIndex(fn){
        return this.list.findIndex((...args) => fn(...args));
    }

    find(fn){
        return this.list.find((...args) => fn(...args));
    }

    findById(id){
        return this.find(item => item.id === id);
    }

    filter(fn){
        let list = this.list.filter(fn);
        return new this.constructor(list);
    }

    cloneList(list = []){
        if(!Array.isArray(list)){
            list = [];
        }
        return list.slice(0);
    }
    
    clone(){
        return new this.constructor(this);
    }
}
module.exports = BaseList;