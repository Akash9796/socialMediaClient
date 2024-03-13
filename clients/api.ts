import { GraphQLClient } from "graphql-request";

const isCLient = typeof window !== "undefined";
console.log(isCLient && window.localStorage.getItem("client_token"));

export const graphqlClient = new GraphQLClient(
  "http://localhost:4000/graphql",
  {
    headers: () => ({
      Authorization: isCLient
        ? `Bearer ${window.localStorage.getItem("client_token")}`
        : "",
    }),
  }
);
