const utils = {
  randomItem: items => items[Math.floor(Math.random() * items.length)],
  indexOf: (items, id) => items.map(item => item.id).indexOf(id),
  findByProperty: (items, p) => items.find(item => item[p.key] === p.value),
  findById: (items, id) => items.find(item => item.id === id),
  excludeById: (items, id) => items.filter(item => item.id !== id),
  checkDependencies: (items, p) => items.some(item => item[p.key] === p.value),
  isUndefined: item => item === undefined,
  isFull: items => items.length === 48,
  parseFloat: value => parseFloat(parseFloat(value).toFixed(2)),
  parseInt: value => parseInt(value),
  parseDate: date => new Date(date).toISOString().slice(0, 10)
};

module.exports = utils;
