import { makeExecutableSchema } from "apollo-server-express";
import { schemaEnum } from "./schema.enum";
import { schemaInput } from "./schema.input";
import { schemaMutation } from "./schema.mutation";
import { schemaQuery } from "./schema.query";
import { schemaType } from "./schema.type";
import { schemaSubscription } from "./schema.subscription";
const schema = makeExecutableSchema({
  typeDefs: [schemaEnum, schemaInput, schemaMutation, schemaQuery, schemaType, schemaSubscription],
});

export { schema };
