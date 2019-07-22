const invalidValue = v => v === null || typeof(v) === 'undefined';

const resolveNS = (node, option) => {
    let { name, namespace, namespaceSpliter } = node;
    option = { ...option };
    let { NSSpliter = namespaceSpliter, NSGlobal = namespace, NSAttributs = [] } = option;
    if(namespace && namespaceSpliter){
        return `${NSGlobal}${NSSpliter}${name}`;
    } else if(node.type % 100 === 2){
        if(!!~NSAttributs.indexOf(node.name) && NSGlobal && NSSpliter){
            return `${NSGlobal}${NSSpliter}${name}`;
        }
    }
    return name;
};

module.exports = {
    invalidValue, resolveNS
}