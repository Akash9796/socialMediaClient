import { graphql } from "../../gql";

export const getAllPosts = graphql(`
  #graphql
  query GetAllPosts {
    getAllPosts {
      content
      id
      imageUrl
      author {
        id
        firstName
        email
        profileImageUrl
      }
    }
  }
`);
