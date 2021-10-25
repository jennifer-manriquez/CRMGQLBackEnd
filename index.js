const { ApolloServer} = require('apollo-server');
const typeDefs = require('./db/schema');
const resolvers = require('./db/resolvers');

//server
const server = new ApolloServer({
  typeDefs, 
  resolvers, 
  context: () => {
    const miContext = "Hola";
    return {
      miContext
    }
  }
});

//start server
server.listen().then( ({url}) => {
  console.log(`Server ready at URL ${url}`)
})