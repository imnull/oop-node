const element = require('./element');
const list = require('./list');
const node = require('./node');
const idGetter = require('./node/id-getter');

module.exports = {
    idGetter,
    ...element,
    ...list,
    ...node,
};