"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

import BlogPostPreview from "./BlogPostPreview";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Spinner from "@/components/Spinner";
import { useToast } from "@/hooks/use-toast";
import { getApiUrl } from "@/utils/api";
import { withAuth } from "@/components/withAuth";
import { useAuthStore } from "@/app/store/authStore";


const Quill = dynamic(() => import("@/components/Quill"), {
  ssr: false,
  loading: () => <p>Loading editor...</p>
});


const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const [membersOnly, setMembersOnly] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [imageName, setImageName] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();
  const { toast } = useToast();
  const API_BASE_URL = getApiUrl();
  const authStore = useAuthStore.getState();
  const token = authStore.accessToken;


 

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
      setImageName(e.target.files[0].name);
    }
  };

  const cloudinaryAxios = axios.create({
    baseURL: "https://api.cloudinary.com/v1_1/domxafi8k",
    withCredentials: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const trimmedDescription = description.trim();
    if (!trimmedDescription) {
      setError("Content cannot be empty.");
      setLoading(false);
      return;
    }

    if (!image && !uploadedImageUrl) {
      setError("Please upload an image.");
      setLoading(false);
      return;
    }

    try {
      let imageUrl = uploadedImageUrl;

      if (imageName && !uploadedImageUrl) {
        const formData = new FormData();
        formData.append("file", image as File);
        formData.append("upload_preset", "next-blog");

        const cloudinaryResponse = await cloudinaryAxios.post(
          "/image/upload",
          formData
        );
        imageUrl = cloudinaryResponse.data.secure_url;
        setUploadedImageUrl(imageUrl);
      }

      const payload = {
        title,
        description: trimmedDescription,
        tag,
        members_only: membersOnly,
        image: imageUrl,
      };

      await axios.post(`${API_BASE_URL}/blogs`, payload, {
        headers: {
          'Authorization': `Bearer ${token}` // Make sure you have access to the accessToken
        }
      });
      toast({
        title: "Success",
        description: "Blog created successfully",
      });
      router.push('/admin/manage-blogs');
    } catch (err) {
      console.error("Error creating blog:", err);
      setError("Failed to create blog. Please try again.");
      toast({
        title: "Error",
        description: "Failed to create blog. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const togglePreviewMode = () => {
    setIsPreviewMode(!isPreviewMode);
  };

 
  return (
    <>
      
      <div className=" mx-auto mt-6 p-3">
        <div className="flex justify-between items-center">
          <h1 className="sm:text-3xl text-lg font-bold mb-6 text-filblue">
            Create a New Blog
          </h1>
          <button
            onClick={togglePreviewMode}
            className="mb-4 bg-filblue hover:bg-readrepurple-4 text-white p-2 rounded max-w-32 "
          >
            {isPreviewMode ? "Edit Mode" : "Preview Mode"}
          </button>
        </div>
        {isPreviewMode ? (
          <BlogPostPreview
            title={title}
            content={description}
            tag={tag}
            image={image}
          />
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-filwhite bg-opacity-70 text-filblack border border-filblack p-6 rounded shadow-md max-w-6xl mx-auto"
          >
            {error && <p className="text-red-500">{error}</p>}
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-bold mb-2">
                Title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none bg-transparent"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-sm font-bold mb-2"
              >
                Content
              </label>
              <Quill value={description} setValue={setDescription} />
            </div>
            <div className="mb-4">
              <label htmlFor="tag" className="block text-sm font-bold mb-2">
                Tag
              </label>
              <Select value={tag} onValueChange={(value) => setTag(value)}>
                <SelectTrigger className="w-full p-2 rounded bg-filblue bg-opacity-20">
                  <SelectValue placeholder="Select a tag" />
                </SelectTrigger>
                <SelectContent className="bg-filblue text-white  font-semibold text-xl h-72">
                  <SelectItem value="TECHNOLOGY">Technology</SelectItem>
                  <SelectItem value="DATA SCIENCE">Data Science</SelectItem>
                  <SelectItem value="AI / ML">AI / ML</SelectItem>
                  <SelectItem value="WEB DEVELOPMENT">Web Development</SelectItem>
                  <SelectItem value="MOBILE DEVELOPMENT">Mobile Development</SelectItem>
                  <SelectItem value="CLOUD COMPUTING">Cloud Computing</SelectItem>
                  <SelectItem value="DEVOPS">DevOps</SelectItem>
                  <SelectItem value="CYBER SECURITY">Cyber Security</SelectItem>
                  <SelectItem value="DATABASES">Databases</SelectItem>
                  <SelectItem value="SOFTWARE ENGINEERING">Software Engineering</SelectItem>
                  <SelectItem value="PROJECT MANAGEMENT">Project Management</SelectItem>
                  <SelectItem value="STARTUPS">Startups</SelectItem>
                  <SelectItem value="ENTREPRENEURSHIP">Entrepreneurship</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="membersOnly"
                className="block text-sm font-bold mb-2"
              >
                Premium Members Only
              </label>
              <input
                id="membersOnly"
                type="checkbox"
                checked={membersOnly}
                onChange={(e) => setMembersOnly(e.target.checked)}
                className="mr-2"
              />
              Yes
            </div>
            <div className="mb-4">
              <label
                htmlFor="imageUpload"
                className="block text-sm font-bold mb-2"
              >
                Upload Image
              </label>
              <div className="relative cursor-pointer">
                <input
                  id="imageUpload"
                  type="file"
                  onChange={handleImageUpload}
                  className="w-full p-2 rounded bg-filblue bg-opacity-20 opacity-0 absolute z-50 h-[100%] cursor-pointer"
                />
                <div className="w-full p-2 rounded bg-filblue bg-opacity-20 text-filblack cursor-pointer">
                  {imageName
                    ? `Selected file: ${imageName}`
                    : "Choose an image"}
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className={`bg-filblue text-white p-2 w-32 rounded ${loading ? "cursor-not-allowed opacity-80 flex items-center gap-2" : ""}`}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span>Creating... </span>
                    <Spinner className="w-6 h-6" />
                  </>
                ) : (
                  "Create Blog"
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default withAuth(CreateBlog);