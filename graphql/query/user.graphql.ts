import { graphql } from "../../gql";

export const verifyUserGoogleToken = graphql(`
  #graphql
  query VarifyGoogleToken($token: String!) {
    varifyGoogleToken(token: $token)
  }
`);

export const getCurrentUserQuery = graphql(`
  #graphql
  query GetCurrentUser {
    getCurrentUser {
      id
      profileImageUrl
      firstName
      lastName
      email
    }
  }
`);
