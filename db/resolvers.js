const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '.env' });

const createToken = (user, secret, expiresIn) => {
  // console.log(user);
  const {id, email, name, lastName} = user; 

  return jwt.sign({id, email, name, lastName}, secret, {expiresIn})
}


//resolvers
const resolvers = {
  Query: {
    getUser: async (_, { token }) => {
      const userID = await jwt.verify(token, process.env.SECRET);

      return userID
    }
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
    },

    authenticateUser: async (_, {input}) => {

      const { email, password } = input;

      //if user exists
      const userExists = await User.findOne({email});
      if (!userExists) {
        throw new Error("User doesn't exist");
      }

      //Check password is correct
      const passwordCorrect = await bcryptjs.compare(password, userExists.password);
      if (!passwordCorrect) {
        throw new Error('The password is incorrect');
      }

      //Create token
      return {
        token: createToken(userExists, process.env.SECRET, '24h')
      } 
    }
  }
}

module.exports = resolvers;