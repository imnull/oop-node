let ID = 0;

module.exports = {
    newId: () => ++ID,
    getId: () => ID,
    reset: (v = 0) => ID = v,
}