import { graphqlClient } from "@/clients/api";
import { verifyUserGoogleToken } from "@/graphql/query/user.graphql";
import { useCurrentUser } from "@/hooks/useCurrentUser.hooks";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { InvalidateQueryFilters, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useMemo } from "react";
import toast from "react-hot-toast";
import { CgProfile } from "react-icons/cg";
import { FaHome } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import { IoBookmarkSharp } from "react-icons/io5";
import { MdExplore } from "react-icons/md";
import { SiGooglemessages, SiThewashingtonpost } from "react-icons/si";

interface MainLayoutProps {
  children: React.ReactNode;
}

interface TwitterSidebarButton {
  title: string;
  icon: React.ReactNode;
  link: string;
}

const MainLayout: React.FC<MainLayoutProps> = (props) => {
  const { user } = useCurrentUser();

  const SidebarMenuItems: TwitterSidebarButton[] = useMemo(
    () => [
      {
        title: "Home",
        icon: <FaHome />,
        link: "/",
      },
      {
        title: "Explore",
        icon: <MdExplore />,
        link: "/",
      },
      {
        title: "Notification",
        icon: <IoMdNotifications />,
        link: "/",
      },
      {
        title: "Messages",
        icon: <SiGooglemessages />,
        link: "/",
      },
      {
        title: "Bookmarks",
        icon: <IoBookmarkSharp />,
        link: `/`,
      },
      {
        title: "Profile",
        icon: <CgProfile />,
        link: `/${user?.id}`,
      },
    ],
    [user?.id]
  );

  const queryClient = useQueryClient();

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

  return (
    <div>
      <div className="grid grid-cols-12  px-[30px] ">
        <div className="col-span-3 pt-1 flex justify-end relative ">
          <div className="text-4xl h-fit w-fit hover:bg-gray-600 rounded-full p-2 cursor-pointer translate-all">
            <SiThewashingtonpost />
          </div>
          <div className="mt-4 text-2xl font-semibold pr-4">
            <ul>
              {SidebarMenuItems.map((item) => (
                <Link href={item.link}
                  className="flex text-xl justify-start items-center w-fit p-1 pr-[1.5rem] hover:bg-gray-600 rounded-full"
                  key={item.title}
                >
                  
                    <span className="m-2">{item.icon}</span>
                    <span>{item.title}</span>
                  
                </Link>
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
          {props.children}
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
};

export default MainLayout;
