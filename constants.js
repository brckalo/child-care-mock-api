const constants = {
  faker: {
    locale: 'hr',
    phone: '+387 66 ### ###'
  },
  errors: {
    phoneAlreadyExists: {
      status: 400,
      message: 'That phone number already exists.'
    },
    resourceHasDependencies: {
      status: 400,
      message: 'The resource has dependencies in other components.'
    },
    resourceNotFound: {
      status: 404,
      message: 'The resource not found.'
    },
    somethingWentWrong: {
      status: 500,
      message: 'Something went wrong'
    }
  }
};

module.exports = constants;
