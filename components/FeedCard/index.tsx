import { Post } from "@/gql/graphql";
import Image from "next/image";
import { Image as CloudImage } from "cloudinary-react";
import Link from "next/link";
import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { BiMessageRounded, BiUpload } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa";

interface FeedCardsProps {
  data: Post;
}

const FeedCard: React.FC<FeedCardsProps> = ({ data }) => {

  console.log(data);
  
  return (
    <div className="border border-r-0 border-l-0 border-b-0 border-gray-600 p-5 hover:bg-slate-900 transition-all cursor-pointer">
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-1">
          <Link href={`/${data.author?.id}`}>
            {data.author?.profileImageUrl && (
              <Image
                className="rounded-full"
                src={data.author?.profileImageUrl}
                alt="image"
                width={700}
                height={600}
              />
            )}
          </Link>
        </div>
        <div className="col-span-11">
          <h5 className="text-xl">{data.author?.firstName || "Jack Sully"}</h5>
          <p className="mb-5">{data.content}</p>
          {data.imageUrl && (
            <CloudImage cloudName="dg6iqaqvm" publicId={data.imageUrl} />
          )}
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
