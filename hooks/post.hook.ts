import { graphqlClient } from "@/clients/api";
import { CreatePost } from "@/gql/graphql";
import { createPostMutation } from "@/graphql/mutations/post.mutation";
import { getAllPosts } from "@/graphql/query/post.gql";
import toast from "react-hot-toast";
import {
  InvalidateQueryFilters,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

export const useCreatePostMutation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (payLoad: CreatePost) => {
      return graphqlClient.request(createPostMutation, { payLoad });
    },
    onSuccess: async () => {
      toast.success("Post Created");
      await queryClient.invalidateQueries([
        "all-posts",
      ] as InvalidateQueryFilters); //used to refetch query with queryKey = "all-posts"
    },
  });

  return mutation;
};

export const useGetAllPosts = () => {
  const query = useQuery({
    queryKey: ["all-posts"],
    queryFn: () => graphqlClient.request(getAllPosts),
  });

  return { ...query, posts: query.data?.getAllPosts };
};
