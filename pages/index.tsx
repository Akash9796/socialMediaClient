import Image from "next/image";
import { SiThewashingtonpost } from "react-icons/si";
import { FaHome } from "react-icons/fa";
import { MdExplore } from "react-icons/md";
import { IoMdNotifications } from "react-icons/io";
import { SiGooglemessages } from "react-icons/si";
import { IoBookmarkSharp } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import FeedCard from "@/components/FeedCard";
import {
  CredentialResponse,
  GoogleLogin,
  GoogleOAuthProvider,
} from "@react-oauth/google";
import { useCallback } from "react";
import toast from "react-hot-toast";
import { graphqlClient } from "@/clients/api";
import { verifyUserGoogleToken } from "@/graphql/query/user";

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
  
  const handleLoginWithGoogle = useCallback(
    async (cred: CredentialResponse) => {
      const googleToken = cred.credential;
      if (!googleToken) return toast.error(`Google token not found`);

      const { varifyGoogleToken } = await graphqlClient.request(
        verifyUserGoogleToken,
        { token: googleToken }
      );

      toast.success("Verified Success");
      console.log(varifyGoogleToken);

      if (varifyGoogleToken)
        window.localStorage.setItem("__twitter_token", varifyGoogleToken);

      // await queryClient.invalidateQueries(["curent-user"]);
    },
    []
  );

  return (
    <div>
      <div className="grid grid-cols-12  px-[100px] ">
        <div className="col-span-3 justify-start pt-8">
          <div className="text-4xl h-fit w-fit hover:bg-gray-600 rounded-full p-2 cursor-pointer translate-all">
            <SiThewashingtonpost />
          </div>
          <div className="mt-4 text-2xl font-semibold pr-4">
            <ul>
              {SidebarMenuItems.map((item) => (
                <li
                  className="flex justify-start items-center w-fit p-2 pr-[1.5rem] hover:bg-gray-600 rounded-full"
                  key={item.title}
                >
                  <span className="m-2">{item.icon}</span>
                  <span>{item.title}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 py-10 flex justify-center items-center w-full">
              <button className=" bg-[#32a55e]  p-4 rounded-full w-60">
                Post
              </button>
            </div>
          </div>
        </div>
        <div className="col-span-6 border-r-2 border-l-2 h-screen overflow-hidden border-gray-400">
          <div className="h-full overflow-y-auto scrollbar-width-none">
            <FeedCard />
            <FeedCard />
            <FeedCard />
          </div>
        </div>
        <div className="col-span-3">
          <div className="p-5 bg-slate-700 rounded-lg">
            <h1 className="my-2 text-2xl">New to GetSocial?</h1>
            <GoogleLogin onSuccess={handleLoginWithGoogle} />
          </div>
        </div>
      </div>
    </div>
  );
}
