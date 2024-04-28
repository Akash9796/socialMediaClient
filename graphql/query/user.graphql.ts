import { TypedDocumentNode } from "@graphql-typed-document-node/core";
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
      firstName
      lastName
      profileImageUrl
      followers {
        id
        firstName
        lastName
        profileImageUrl
      }
      following {
        id
        firstName
        lastName
        profileImageUrl
      }
      posts {
        id
        content
        imageUrl
        author {
          id
          firstName
          email
          profileImageUrl
        }
      }
    }
  }
`);

export const getUserById = graphql(`
  #graphql
  query GetUserById($id: ID!) {
    getUserById(id: $id) {
      id
      profileImageUrl
      firstName
      lastName
      followers {
        id
        firstName
        lastName
        profileImageUrl
      }
      following {
        id
        firstName
        lastName
        profileImageUrl
      }
      posts {
        id
        content
        imageUrl
        author {
          id
          firstName
          email
          profileImageUrl
        }
      }
    }
  }
`);
