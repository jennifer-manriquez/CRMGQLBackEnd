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

  type Order {
    id: ID
    order: [OrderGroup]
    total: Float
    client: ID
    salesman: ID
    date: String
    status: OrderStatus
  }

  type OrderGroup {
    id: ID
    quantity: Int
  }

  type TopClient {
    total: Float 
    client: [Client]
  }

  type TopSeller {
    total: Float
    salesman: [User]
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

  input OrderProductInput{
    id: ID
    quantity: Int
  }

  input OrderInput {
    order: [OrderProductInput]
    total: Float
    client: ID
    status: OrderStatus
  }

  enum OrderStatus {
    PENDING
    COMPLETED
    CANCELED
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

    #Orders
    getOrders: [Order]
    getOrdersSeller: [Order]
    getOrder(id: ID!): Order
    getOrdersStatus(status: String!): [Order]

    #Advanced Search 
    getBestClients: [TopClient]
    getBestSellers: [TopSeller]
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

    #Orders
    newOrder(input: OrderInput): Order
    updateOrder(id: ID! input: OrderInput): Order
    deleteOrder(id: ID!): String
  }
`;

module.exports = typeDefs;