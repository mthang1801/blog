import { gql } from "apollo-server-express";

const schemaEnum = gql`
  enum postStatus {
    public
    private
  }
  enum MutationType {
    CREATED
    UPDATED
    DELETED
  }
`;

export { schemaEnum };
