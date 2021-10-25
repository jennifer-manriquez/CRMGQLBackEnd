const User = require('../models/User');
const bcryptjs = require('bcryptjs');


//resolvers
const resolvers = {
  Query: {
    getCourse: () => 'Something'
  },

  Mutation: {
    newUser: async (_, {input}) => {

      const {email, password} = input;
      console.log('input is', input)
      //Checkif user is registered
      const userExists = await User.findOne({email});
      if (userExists) {
        throw new Error('User is already registered')
      }


      //Hash the password
      const salt = await bcryptjs.genSalt(10);
      input.password = await bcryptjs.hash(password, salt);

      //Save in database
      try {
        const user = new User(input);
        user.save();
        return user;
      } catch {
        console.log(error);
      }
    }
  }
}

module.exports = resolvers;