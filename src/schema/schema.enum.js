import { gql } from "apollo-server-express";

const schemaEnum = gql`
  enum postStatus {
    public
    private
  }
`;

export { schemaEnum };
