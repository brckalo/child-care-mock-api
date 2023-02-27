const { faker } = require('@faker-js/faker');

const constants = require('./constants');
const utils = require('./utils');

faker.setLocale(constants.faker.locale);

let parents = [];
let babysitters = [];
let children = [];

const services = {
  initData: () => {
    while (!utils.isFull(parents)) {
      parents.push({
        id: faker.datatype.uuid(),
        name: faker.name.firstName(),
        surname: faker.name.lastName(),
        phone: faker.phone.number(constants.faker.phone)
      });
    }

    while (!utils.isFull(babysitters)) {
      babysitters.push({
        id: faker.datatype.uuid(),
        name: faker.name.firstName(),
        surname: faker.name.lastName(),
        phone: faker.phone.number(constants.faker.phone),
        hourly: parseFloat(faker.finance.amount(1, 10, 2)),
        isAvailable: faker.datatype.boolean()
      });
    }

    while (!utils.isFull(children)) {
      let parent = utils.randomItem(parents);
      let babysitter = utils.randomItem(babysitters);

      children.push({
        id: faker.datatype.uuid(),
        name: faker.name.firstName(),
        surname: parent.surname,
        age: faker.datatype.number({
          max: 10,
          min: 1
        }),
        parentId: parent.id,
        babysitterId: babysitter.id
      });
    }
  },
  // Parent
  readParents: () => parents,
  readParentById: id => {
    let parent = utils.findById(parents, id);

    if (utils.isUndefined(parent)) {
      throw constants.errors.resourceNotFound;
    }

    return parent;
  },
  createParent: parent => {
    if (utils.findByProperty(parents, {
      key: 'phone',
      value: parent.phone
    })) {
      throw constants.errors.phoneAlreadyExists;
    }

    parents.push({
      id: faker.datatype.uuid(),
      name: parent.name,
      surname: parent.surname,
      phone: parent.phone
    });
  },
  updateParent: parent => {
    let index = utils.indexOf(parents, parent.id);

    if (index < 0) {
      throw constants.errors.resourceNotFound;
    }

    parents[index] = {
      id: parent.id,
      name: parent.name,
      surname: parent.surname,
      phone: parent.phone
    };
  },
  deleteParent: id => {
    if (utils.isUndefined(utils.findById(parents, id))) {
      throw constants.errors.resourceNotFound;
    }

    if (utils.checkDependencies(children, {
      key: 'parentId',
      value: id
    })) {
      throw constants.errors.resourceHasDependencies;
    }

    parents = utils.excludeById(parents, id);
  },
  // Babysitter
  readBabysitters: isAvailable => {
    if (isAvailable) {
      return babysitters.filter(babysitter => babysitter.isAvailable);
    }

    return babysitters;
  },
  readBabysitterById: id => {
    let babysitter = utils.findById(babysitters, id);

    if (utils.isUndefined(babysitter)) {
      throw constants.errors.resourceNotFound;
    }

    return babysitter;
  },
  createBabysitter: babysitter => {
    if (utils.findByProperty(babysitters, 'phone', babysitter.phone)) {
      throw constants.errors.phoneAlreadyExists;
    }

    babysitters.push({
      id: faker.datatype.uuid(),
      name: babysitter.name,
      surname: babysitter.surname,
      phone: babysitter.phone,
      hourly: parseFloat(babysitter.hourly),
      isAvailable: babysitter.isAvailable
    });
  },
  updateBabysitter: babysitter => {
    let index = utils.indexOf(babysitters, babysitter.id);

    if (index < 0) {
      throw constants.errors.resourceNotFound;
    }

    babysitters[index] = {
      id: babysitter.id,
      name: babysitter.name,
      surname: babysitter.surname,
      phone: babysitter.phone,
      hourly: parseFloat(babysitter.hourly),
      isAvailable: babysitter.isAvailable
    };
  },
  deleteBabysitter: id => {
    if (utils.isUndefined(utils.findById(babysitters, id))) {
      throw constants.errors.resourceNotFound;
    }

    if (utils.checkDependencies(children, {
      key: 'babysitterId',
      value: id
    })) {
      throw constants.errors.resourceHasDependencies;
    }

    babysitters = utils.excludeById(babysitters, id);
  },
  // Child
  readChildren: () => children.map(child => {
    let parent = utils.findById(parents, child.parentId);
    let babysitter = utils.findById(babysitters, child.babysitterId);

    return {
      ...child,
      parentFullName: `${parent.name} ${parent.surname}`,
      babysitterFullName: `${babysitter.name} ${babysitter.surname}`
    };
  }),
  readChildById: id => {
    let child = utils.findById(children, id);

    if (utils.isUndefined(child)) {
      throw constants.errors.resourceNotFound;
    }

    let parent = utils.findById(parents, child.parentId);
    let babysitter = utils.findById(babysitters, child.babysitterId);

    return {
      ...child,
      parentFullName: `${parent.name} ${parent.surname}`,
      babysitterFullName: `${babysitter.name} ${babysitter.surname}`
    };
  },
  createChild: child => {
    children.push({
      id: child.id,
      name: child.name,
      surname: child.surname,
      age: utils.parseInt(child.age),
      parentId: child.parentId,
      babysitterId: child.babysitterId
    });
  },
  updateChild: child => {
    let index = utils.indexOf(children, child.id);

    if (index < 0) {
      throw constants.errors.resourceNotFound;
    }

    children[index] = {
      id: child.id,
      name: child.name,
      surname: child.surname,
      age: utils.parseInt(child.age),
      parentId: child.parentId,
      babysitterId: child.babysitterId
    };
  },
  deleteChild: id => {
    if (utils.isUndefined(utils.findById(children, id))) {
      throw constants.errors.resourceNotFound;
    }

    children = utils.excludeById(children, id);
  }
};

module.exports = services;
