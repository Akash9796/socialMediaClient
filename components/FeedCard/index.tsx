import Image from "next/image";
import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { BiMessageRounded, BiUpload } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa";

const FeedCard: React.FC = () => {
  return (
    <div className="border border-r-0 border-l-0 border-b-0 border-gray-600 p-5 hover:bg-slate-900 transition-all cursor-pointer">
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-1">
          <Image
            className="rounded-full"
            src={
              "https://lumiere-a.akamaihd.net/v1/images/blue_wpt_yt_thumb_textless_1920x1080_819bb49d.jpeg"
            }
            alt="user-image"
            height={50}
            width={50}
          />
        </div>
        <div className="col-span-11">
          <h5>Lorem ipsum dolor</h5>
          <p className="mb-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus
            sapiente, ipsam rerum placeat laboriosam iure voluptates odio
            consequuntur nisi obcaecati?
          </p>
          <Image
            src={
              "https://c4.wallpaperflare.com/wallpaper/695/1024/947/amazing-avatar-hd-wallpaper-preview.jpg"
            }
            alt="image"
            width={700}
            height={600}
          />
          <div className="flex justify-between mt-5 text-xl items-center p-2 w-[90%]">
            <div>
              <BiMessageRounded />
            </div>
            <div>
              <FaRetweet />
            </div>
            <div>
              <AiOutlineHeart />
            </div>
            <div>
              <BiUpload />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
