const invalidValue = v => v === null || typeof(v) === 'undefined';

const resolveNS = (name, namespace = '') => {
    if(typeof(namespace) === 'string' && namespace.length > 0){
        name = `${namespace}${name}`;
    }
    return name;
};

module.exports = {
    invalidValue, resolveNS
}