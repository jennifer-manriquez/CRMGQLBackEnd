const User = require('../models/User');
const Product = require('../models/Product');
const Client = require('../models/Client');
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
    }, 

    getProducts: async () => {
      try {
        const products = await Product.find({});
        return products
      }catch (error) {
        console.log(error)
      }
    }, 

    getProduct: async (_, {id} ) => {
      //check that product exists
      const product = await Product.findById(id);

      if (!product) {
        throw new Error('Product not found');
      }

      return product
    },

    getClients: async () => {
      try {
        const clients = await Client.find({});
        return clients
      } catch (error) {
        console.log(error)
      }
    },

    getSalesmanClients: async (_, {}, ctx) => {
      try {
        const clients = await Client.find({salesman: ctx.user.id.toString()});
        return clients
      } catch (error) {
        console.log(error)
      }
    },  
    getClient: async (_, {id}, ctx) => {
      //Check that client exists
      const client = await Client.findById(id);
      if (!client) {
        throw new Error('Client not found');
      }
     
      //Who created it can see it
      if(client.salesman.toString() !== ctx.user.id){
        throw new Error("You don't have credentials to see this client");
      }

      return client
    },
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
    }, 

    newProduct: async (_, { input }) => {
      try {
        const product = new Product(input)

        //save in sadabase

        const result = await product.save();
        return result

      } catch(error) {
        console.log(error);
      }
    },
    updateProduct: async (_, { id, input }) => {
      //check that product exists
      let product = await Product.findById(id);

      if (!product) {
        throw new Error('Product not found');
      }

      //save in database
      product = await Product.findOneAndUpdate({_id: id}, input, {new: true});
      return product
    }, 
    deleteProduct: async (_, { id}) => {
      //check that product exists
      let product = await Product.findById(id);

      if (!product) {
        throw new Error('Product not found');
      }

      //Delete
      await Product.findOneAndDelete({_id: id});
      return 'Product has been deleted'
    }, 

    newClient: async (_, { input }, ctx) => {
      const { email } = input

      console.log(ctx)
      //Check client is registered
      const client = await Client.findOne({ email })

      if (client) {
        throw new Error('That client is already registered');
      }

      const newClient = new Client(input)

      //Assign salesman
      newClient.salesman = ctx.user.id;


      //Save in database
      try {
        const result = await newClient.save();
        return result
      } catch(error) {
        console.log("Error, couldn't save")
      } 
    },
    updateClient: async (_, {id, input }, ctx) => {

      //check if client exists
      let client = await Client.findById(id);
      if (!client) {
        throw new Error('Client not found');
      }

      //check salesman to ve editing
      if (client.salesman.toString() !== ctx.user.id) {
        throw new Error("You don't have credentials to see this client");
      }

      //save client 
      client = await Client.findOneAndUpdate({_id: id}, input, {new: true});
      return client
    }, 
    deleteClient: async (_, { id }, ctx) => {

      //check if client exists
      let client = await Client.findById(id);
      if (!client) {
        throw new Error('Client not found');
      }

      //check salesman to ve editing
      if (client.salesman.toString() !== ctx.user.id) {
        throw new Error("You don't have credentials to delete this client");
      }

      //Delete client 
      client = await Client.findOneAndDelete({ _id: id });
      return "Client was deleted"
    }
  }
}

module.exports = resolvers;