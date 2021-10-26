const { ApolloServer} = require('apollo-server');
const typeDefs = require('./db/schema');
const resolvers = require('./db/resolvers');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '.env' });

const connectDB = require('./config/db');

connectDB();

//server
const server = new ApolloServer({
  typeDefs, 
  resolvers, 
  context: ({req}) => {
    // console.log(req.headers['authorization']);

    const token = req.headers['authorization'] || '';
    if(token) {
      try{
        const user = jwt.verify(token, process.env.SECRET);
        return {user}
      } catch (error) {
        console.log('An error happened while authenticating jwt');
        console.log(error)
      }
    }
  }
});

//start server
server.listen().then( ({url}) => {
  console.log(`Server ready at URL ${url}`)
})