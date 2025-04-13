"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Quill from "@/components/Quill";
import BlogPostPreview from "@/app/admin/create_blog/BlogPostPreview";
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
import { Blog } from "@/app/types/blog";
import { useAuthStore } from "@/app/store/authStore";

interface EditBlogProps {
  params: {
    slug: string;
  };
}

const EditBlog = ({ params }: EditBlogProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const [membersOnly, setMembersOnly] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [imageName, setImageName] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  
  const router = useRouter();
  const { toast } = useToast();
  const { slug } = params;
  const API_BASE_URL = getApiUrl();
  const authStore = useAuthStore.getState();
  const token = authStore.accessToken;

  useEffect(() => {
    fetchBlog();
  }, [slug]);

  const fetchBlog = async () => {
    try {
      const response = await axios.get<Blog>(`${API_BASE_URL}/blogs/${slug}`);
      const blog = response.data;
      setTitle(blog.title);
      setDescription(blog.description);
      setTag(blog.tag);
      setMembersOnly(blog.members_only);
      setUploadedImageUrl(blog.image);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch blog. Please try again later.",
        variant: "destructive"
      });
      router.push('/admin/manage-blogs');
    } finally {
      setPageLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
      setImageName(e.target.files[0].name);
      setUploadedImageUrl(null); // Clear the Cloudinary URL when a new file is selected
    }
  };

  const cloudinaryAxios = axios.create({
    baseURL: "https://api.cloudinary.com/v1_1/domxafi8k",
    withCredentials: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitLoading(true);

    const trimmedDescription = description.trim();
    if (!trimmedDescription) {
      setError("Content cannot be empty.");
      setSubmitLoading(false);
      return;
    }

    try {
      let imageUrl = uploadedImageUrl;

      if (image && imageName) {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "next-blog");

        const cloudinaryResponse = await cloudinaryAxios.post(
          "/image/upload",
          formData
        );
        imageUrl = cloudinaryResponse.data.secure_url;
      }

      const payload = {
        title,
        description: trimmedDescription,
        tag,
        members_only: membersOnly,
        image: imageUrl,
      };

      await axios.put(`${API_BASE_URL}/blogs/${slug}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast({
        title: "Success",
        description: "Blog updated successfully",
      });
      router.push('/admin/manage-blogs');
    } catch (err) {
      console.error("Error updating blog:", err);
      setError("Failed to update blog. Please try again.");
      toast({
        title: "Error",
        description: "Failed to update blog. Please try again.",
        variant: "destructive"
      });
    } finally {
      setSubmitLoading(false);
    }
  };

  const togglePreviewMode = () => {
    setIsPreviewMode(!isPreviewMode);
  };

  if (pageLoading) {
    return <Spinner className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  w-8 h-8 " />;
  }

  return (
    <>
      <div className="flex justify-between items-center p-3">
        <h1 className="sm:text-3xl text-lg font-bold mb-6 text-readrepurple-5">
          Edit Blog
        </h1>
        <button
          onClick={togglePreviewMode}
          className="mb-4 bg-readrepurple-5 hover:bg-readrepurple-4 text-white p-2 rounded max-w-32 "
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
          cloudinaryUrl={uploadedImageUrl}
        />
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-readreblack-6 bg-opacity-20 text-white p-6 rounded shadow-md max-w-6xl mx-auto"
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
            <label htmlFor="description" className="block text-sm font-bold mb-2">
              Content
            </label>
            <Quill value={description} setValue={setDescription} />
          </div>
          <div className="mb-4">
            <label htmlFor="tag" className="block text-sm font-bold mb-2">
              Tag
            </label>
            <Select value={tag} onValueChange={(value) => setTag(value)}>
              <SelectTrigger className="w-full p-2 rounded bg-readreblack-6 bg-opacity-20">
                <SelectValue placeholder="Select a tag" />
              </SelectTrigger>
              <SelectContent className="bg-readreblack-4 font-semibold text-xl h-72">
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
            <label htmlFor="membersOnly" className="block text-sm font-bold mb-2">
              Members Only
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
            <label htmlFor="imageUpload" className="block text-sm font-bold mb-2">
              Upload Image
            </label>
            <div className="relative cursor-pointer">
              <input
                id="imageUpload"
                type="file"
                onChange={handleImageUpload}
                className="w-full p-2 rounded bg-readreblack-6 bg-opacity-20 opacity-0 absolute z-50 h-[100%] cursor-pointer"
              />
              <div className="w-full p-2 rounded bg-readreblack-6 bg-opacity-20 text-white cursor-pointer">
                {imageName || uploadedImageUrl
                  ? `Current image: ${imageName || "Existing blog image"}`
                  : "Choose an image"}
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className={`bg-readrepurple-5 bg-opacity-80 text-white p-2 w-32 rounded hover:bg-readrepurple-5 ${submitLoading ? "cursor-not-allowed opacity-80 flex items-center gap-2" : ""}`}
              disabled={submitLoading}
            >
              {submitLoading ? (
                <>
                  <span>Updating </span>
                  <Spinner className=" w-6 h-6 "/>
                </>
              ) : (
                "Update Blog"
              )}
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default withAuth(EditBlog);