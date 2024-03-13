export const createPostMutation = `mutation CreatePost($payLoad: CreatePost!) {
        createPost(payLoad: $payLoad) {
          id
          content
          imageUrl
          author {
            profileImageUrl
            firstName
            lastName
          }
        }
      }`;
