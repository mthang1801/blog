import {
  makeExecutableSchema,
} from "apollo-server-express";
import { userType, userQuery, userInput, userMutation } from "./schema";

const userSchema = makeExecutableSchema({
  typeDefs: [userType, userQuery, userInput, userMutation],
});

export { userSchema };
