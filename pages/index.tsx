import Image from "next/image";
import { SiThewashingtonpost } from "react-icons/si";
import { FaHome } from "react-icons/fa";
import { MdExplore } from "react-icons/md";
import { IoMdNotifications } from "react-icons/io";
import { SiGooglemessages } from "react-icons/si";
import { IoBookmarkSharp } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import FeedCard from "@/components/FeedCard";
import { FaImage } from "react-icons/fa6";
import {
  CredentialResponse,
  GoogleLogin,
  GoogleOAuthProvider,
} from "@react-oauth/google";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { graphqlClient } from "@/clients/api";
import { verifyUserGoogleToken } from "@/graphql/query/user.graphql";
import { useCurrentUser } from "@/hooks/useCurrentUser.hooks";
import { InvalidateQueryFilters, useQueryClient } from "@tanstack/react-query";
import { useCreatePostMutation, useGetAllPosts } from "@/hooks/post.hook";

interface TwitterSidebarButton {
  title: string;
  icon: React.ReactNode;
}

const SidebarMenuItems: TwitterSidebarButton[] = [
  {
    title: "Home",
    icon: <FaHome />,
  },
  {
    title: "Explore",
    icon: <MdExplore />,
  },
  {
    title: "Notification",
    icon: <IoMdNotifications />,
  },
  {
    title: "Messages",
    icon: <SiGooglemessages />,
  },
  {
    title: "Bookmarks",
    icon: <IoBookmarkSharp />,
  },
  {
    title: "Profile",
    icon: <CgProfile />,
  },
];

export default function Home() {
  const { user } = useCurrentUser();
  const { posts = [] } = useGetAllPosts();
  const { mutate } = useCreatePostMutation();
  const queryClient = useQueryClient();

  const [content, setContent] = useState("");

  const handleLoginWithGoogle = useCallback(
    async (cred: CredentialResponse) => {
      const googleToken = cred.credential;
      if (!googleToken) return toast.error(`Google token not found`);

      const { varifyGoogleToken } = await graphqlClient.request(
        verifyUserGoogleToken,
        { token: googleToken }
      );

      toast.success("Verified Success");
      // console.log(varifyGoogleToken);

      if (varifyGoogleToken)
        window.localStorage.setItem("client_token", varifyGoogleToken);

      await queryClient.invalidateQueries([
        "current-user",
      ] as InvalidateQueryFilters); //used to refetch query with queryKey = "current-user"
    },
    [queryClient]
  );

  const handleSelectImage = useCallback(() => {
    const input = document.createElement("input");
    Object.assign(input, {
      type: "file",
      accept: "image/*",
    });
    input.click();
  }, []);

  const handleCreatePost = () => {
    console.log("Content", content);

    mutate({
      content,
    });
  };

  return (
    <div>
      <div className="grid grid-cols-12  px-[30px] ">
        <div className="col-span-3 pt-1 ml-20 relative ">
          <div className="text-4xl h-fit w-fit hover:bg-gray-600 rounded-full p-2 cursor-pointer translate-all">
            <SiThewashingtonpost />
          </div>
          <div className="mt-4 text-2xl font-semibold pr-4">
            <ul>
              {SidebarMenuItems.map((item) => (
                <li
                  className="flex text-xl justify-start items-center w-fit p-1 pr-[1.5rem] hover:bg-gray-600 rounded-full"
                  key={item.title}
                >
                  <span className="m-2">{item.icon}</span>
                  <span>{item.title}</span>
                </li>
              ))}
            </ul>
            <div className="py-8 flex justify-center items-center w-full ">
              <button className=" bg-[#32a55e]  p-2 rounded-full w-44">
                Post
              </button>
            </div>
            {user && (
              <div className="text-xl absolute bottom-5 flex gap-2 items-center bg-slate-800 px-3 py-2 rounded-full">
                {user && user.profileImageUrl && (
                  <Image
                    className="rounded-full"
                    src={user?.profileImageUrl}
                    alt="user-image"
                    height={50}
                    width={50}
                  />
                )}
                <div className="hidden sm:block">
                  <h3 className="text-xl">
                    {user.firstName || "Jack"} {user.lastName || "Sully"}
                  </h3>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="col-span-6 border-r-2 border-l-2 h-screen overflow-hidden border-gray-400">
          <div className="h-full overflow-y-auto scrollbar-width-none">
            <div>
              <div className="border border-r-0 border-l-0 border-b-0 border-gray-600 p-5 hover:bg-slate-900 transition-all cursor-pointer">
                <div className="grid grid-cols-12 gap-3">
                  <div className="col-span-1">
                    {user?.profileImageUrl && (
                      <Image
                        className="rounded-full"
                        src={user?.profileImageUrl as "string"}
                        alt="user-image"
                        height={50}
                        width={50}
                      />
                    )}
                  </div>
                  <div className="col-span-11">
                    <textarea
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className="border w-full bg-transparent text-xl p-3 border-b border-slate-700"
                      placeholder="What's happening?"
                      rows={3}
                    ></textarea>
                    <div className="mt-2 flex justify-between items-center">
                      <FaImage
                        onClick={handleSelectImage}
                        className="text-xl"
                      />
                      <button
                        onClick={handleCreatePost}
                        className="text-xs bg-[#32a55e]  p-1 rounded-full w-10"
                      >
                        Post
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {posts?.map((posts: any) => (
              <FeedCard key={posts.id} data={posts} />
            ))}
          </div>
        </div>
        <div className="col-span-3 m-5 flex justify-center h-fit">
          {!user && (
            <div className="p-5 bg-slate-700 rounded-lg">
              <h1 className="my-2 text-2xl">New to GetSocial?</h1>
              <GoogleLogin onSuccess={handleLoginWithGoogle} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
