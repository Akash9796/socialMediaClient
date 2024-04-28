#STEPS TO CREATE CLIENT

1. yarn install next-app .
2. yarn run dev
3. clear index.tsx -->divide home screen in grids
4. Add logo , route Icons
5. Inside Components-->FeedCard->index.tsx =>
6. Grids->Grid->Avatar Image,Configure Image domain obj in next.config.js, Design Comp,
7. Import Components inside main index.tsx,
8. Wrap main pages/\_app.tsx in GoogleAuthProvider --> generate clientId in cloud console
9. Create Signin Comp --> Generate the token & save it to server.

10. Setup gql types --> using => graphql-request + code generate
11. Setup Clients/api.ts to connect with server side gql -->

---

12. Integrate varifyUserGoogleToken query in user.gql.ts
13. Implement catching of logged in user by getting user details from getCurrentUser query then catch it by react-query lib & showcase it with the help of devtools

---

1. Create Post box for writing posts & uploading images
2. Write Query & Mutations for it to connect with Backend & Don't forget to run 'yarn codegen' to generate types for latest Queries
3. Write a custom hook(useGetAllPosts , useCreatePostMuatation) post.hook.ts for catching/saving all the posts using useQuery & useMutation functions.

---

1. Create dynamic page [id].tsx for showing user specific details.
2. Then route on profile page based on user.id,

---

1. Create getUserbyId query but dont call it with hook this time , but implement a SSR for it.
2. export const getServerSideProps: GetServerSideProps<ServerProps> = async (
   context
   ) => {
   const id = context.query.id as string;
   if (!id) return { notFound: true, props: { userInfo: undefined } };

const userInfo = graphqlClient.request(getUserById, { id });
if (!(await userInfo).getUserById) return { notFound: true };
return { props: { userInfo: (await userInfo).getUserById as User } };
}

3. recieve these props in same component written above this funct,
