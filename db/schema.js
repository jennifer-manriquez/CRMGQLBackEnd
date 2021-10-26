const { gql } = require('apollo-server');

const typeDefs = gql`
  #Types -------------------

  type User {
    id: ID
    name: String
    lastName: String
    email: String
    created: String
  }

  type Token {
    token: String
  }

  type Product {
    id: ID
    name: String
    availability: Int 
    price: Float
    created: String 
  }

  type Client {
    id: ID
    name: String
    lastName: String
    company: String
    email: String
    phone: String
    salesman: ID
  }

  #Inputs ---------------------

  input UserInput {
    name: String!
    lastName: String!
    email: String!
    password: String!
  }

  input AuthenticateInput {
    email: String!
    password: String!
  }

  input ProductInput {
    name: String!
    availability: Int!
    price: Float!
  }

  input ClientInput {
    name: String!
    lastName: String!
    company: String!
    email: String!
    phone: String
  }

  #Queries and Mutations ---------------------

  type Query {
    #Users
    getUser(token: String!) : User

    #Products
    getProducts: [Product]
    getProduct(id: ID!) : Product 

    #Clients
     getClients: [Client]
     getSalesmanClients: [Client]
     getClient(id:ID!): Client
  }

  type Mutation {
    #Users
    newUser(input: UserInput): User
    authenticateUser(input: AuthenticateInput): Token

    #Products
    newProduct(input: ProductInput) : Product
    updateProduct(id: ID!, input: ProductInput) : Product
    deleteProduct(id:ID!) : String

    #Clients
    newClient(input: ClientInput): Client
    updateClient(id: ID!, input: ClientInput): Client
    deleteClient(id: ID): String
  }
`;

module.exports = typeDefs;