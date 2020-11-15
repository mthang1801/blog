import {ApolloServer, mergeSchemas} from "apollo-server-express";
import express from "express";
import {createServer} from "http"
import connectDB from "./config/connectDB";
import resolvers from "./resolvers";
import {schema} from "./schema";
const app = express();
const PORT = process.env.PORT || 5000 ; 
const schemas = mergeSchemas({
  schemas : [schema],
  resolvers
})
const server = new ApolloServer({
  schema : schemas
})

server.applyMiddleware({app})

const httpServer = createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen({port : PORT} , () => {
  connectDB().then(res => {
    console.log("Server has been connected");
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
    console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`)
  }).catch(err => console.log("server error"));

})