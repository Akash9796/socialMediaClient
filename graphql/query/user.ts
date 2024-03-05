import { graphql } from "../../gql";

export const verifyUserGoogleToken = graphql(`
  #graphql
  query VarifyGoogleToken($token: String!) {
    varifyGoogleToken(token: $token)
  }
`);
