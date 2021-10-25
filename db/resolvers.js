const User = require('../models/User');


//resolvers
const resolvers = {
  Query: {
    getCourse: () => 'Something'
  },

  Mutation: {
    newUser: (_, {input}) => {
      console.log(input)
      return 'Creating ...'
    }
  }
}

module.exports = resolvers;