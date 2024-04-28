import Image from "next/image";
import FeedCard from "@/components/FeedCard";
import { FaImage } from "react-icons/fa6";
import { useCallback, useState } from "react";
import { useCurrentUser } from "@/hooks/useCurrentUser.hooks";
import { useCreatePostMutation, useGetAllPosts } from "@/hooks/post.hook";
import MainLayout from "@/components/FeedCard/Layout/MainLayout";
import axios from "axios";

export default function Home() {
  const { user } = useCurrentUser();
  const { posts = [] } = useGetAllPosts();
  const { mutate } = useCreatePostMutation();

  const [content, setContent] = useState("");
  const [selectedImage, setSelectedImage] = useState("");

  const handleSelectImage = useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (event) => {
      const target = event.target as HTMLInputElement;
      const file = target.files && target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setSelectedImage(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  }, []);

  const uploadOnCloudinary = async (file: any) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "xssfwosl");
    formData.append("cloud_name", "dg6iqaqvm");

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/dg6iqaqvm/image/upload`,
      formData
    );
    return response.data.public_id;
  };

  const handleCreatePost = async () => {
    let imageUrl = "";

    if (selectedImage) {
      imageUrl = await uploadOnCloudinary(selectedImage);
    }
    mutate({
      content,
      imageUrl,
    });
    setContent("");
    setSelectedImage("");
  };

  return (
    <div>
      <MainLayout>
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
                  {selectedImage && (
                    <Image
                      src={selectedImage}
                      alt="Selected"
                      width={50}
                      height={50}
                    />
                  )}
                  <div className="mt-2 flex justify-between items-center">
                    <FaImage onClick={handleSelectImage} className="text-xl" />
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
      </MainLayout>
    </div>
  );
}
