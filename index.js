const { ApolloServer} = require('apollo-server');
const typeDefs = require('./db/schema');
const resolvers = require('./db/resolvers');

const connectDB = require('./config/db');

connectDB();

//server
const server = new ApolloServer({
  typeDefs, 
  resolvers
});

//start server
server.listen().then( ({url}) => {
  console.log(`Server ready at URL ${url}`)
})