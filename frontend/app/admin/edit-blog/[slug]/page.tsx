'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Quill from '@/components/Quill';
import { BlogPostPreview } from '@/app/admin/create-blog/blog-post-preview';
import { MultiSelect } from '@/components/MultiSelect';
import Spinner from '@/components/Spinner';
import { getApiUrl } from '@/utils/api';
import { withAuth } from '@/components/withAuth';
import { Blog } from '@/app/types/blog';
import { useAuthStore } from '@/app/store/authStore';

interface EditBlogProps {
  params: {
    slug: string;
  };
}

const EditBlog = ({ params }: EditBlogProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [membersOnly, setMembersOnly] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [imageName, setImageName] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  const router = useRouter();
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
      // Convert single tag to array for MultiSelect
      setTags(blog.tag ? blog.tag.split(',') : []);
      setMembersOnly(blog.members_only);
      setUploadedImageUrl(blog.image);
    } catch (error) {
      toast.dismiss();
      toast.error('Failed to fetch blog. Please try again later.');
      router.push('/admin/manage-blogs');
    } finally {
      setPageLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
      setImageName(e.target.files[0].name);
      setUploadedImageUrl(null); // Clear Cloudinary URL when a new file is selected
    }
  };

  const cloudinaryAxios = axios.create({
    baseURL: 'https://api.cloudinary.com/v1_1/domxafi8k',
    withCredentials: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitLoading(true);
    setError(null);
    toast.dismiss(); // Clear existing toasts

    const trimmedDescription = description.trim();
    if (!trimmedDescription) {
      setError('Content cannot be empty.');
      setSubmitLoading(false);
      toast.error('Content cannot be empty.');
      return;
    }

    try {
      let imageUrl = uploadedImageUrl;

      if (image && imageName) {
        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', 'next-blog');

        const cloudinaryResponse = await cloudinaryAxios.post('/image/upload', formData);
        imageUrl = cloudinaryResponse.data.secure_url;
      }

      const payload = {
        title,
        description: trimmedDescription,
        // Send tags as a comma-separated string to match API
        tag: tags.join(','),
        members_only: membersOnly,
        image: imageUrl,
      };

      await axios.put(`${API_BASE_URL}/blogs/${slug}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Blog updated successfully', {
        position: 'top-right',
        autoClose: 3000,
        onClose: () => {
          router.push('/admin/manage-blogs'); // Navigate after toast closes
        },
      });
    } catch (err) {
      console.error('Error updating blog:', err);
      setError('Failed to update blog. Please try again.');
      toast.error('Failed to update blog. Please try again.');
    } finally {
      setSubmitLoading(false);
    }
  };

  const togglePreviewMode = () => {
    setIsPreviewMode(!isPreviewMode);
  };

  // Tag options for MultiSelect (same as create-blog)
  const tagOptions = [
    'Technology',
    'Data Science',
    'AI / ML',
    'Web Development',
    'Mobile Development',
    'Cloud Computing',
    'DevOps',
    'Cyber Security',
    'Databases',
    'Software Engineering',
    'Project Management',
    'Startups',
    'Entrepreneurship',
  ];

  if (pageLoading) {
    return (
      <Spinner className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8" />
    );
  }

  return (
    <div className="bg-white min-h-screen p-4 sm:p-6">
      <div className="max-w-7xl mx-auto bg-white">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Edit Blog</h1>
          <button
            onClick={togglePreviewMode}
            className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded-lg border border-gray-200/50 shadow-sm transition"
          >
            {isPreviewMode ? 'Edit Mode' : 'Preview Mode'}
          </button>
        </div>

        {isPreviewMode ? (
          <BlogPostPreview
            title={title}
            content={description}
            tags={tags}
            visibility={membersOnly ? 1 : 0} // Map members_only to visibility (1=Private, 0=Public)
            imageCid={uploadedImageUrl} // Use Cloudinary URL as imageCid
          />
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white/90 p-6 rounded-lg border border-gray-200/50 shadow-lg max-w-4xl mx-auto"
          >
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="mb-6">
              <label htmlFor="title" className="block text-sm font-bold text-gray-800 mb-2">
                Title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 rounded-lg bg-white border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="description" className="block text-sm font-bold text-gray-800 mb-2">
                Content
              </label>
              <Quill value={description} setValue={setDescription} />
            </div>
            <div className="mb-6">
              <label htmlFor="tags" className="block text-sm font-bold text-gray-800 mb-2">
                Tags
              </label>
              <MultiSelect
                options={tagOptions}
                selected={tags}
                onChange={setTags}
                placeholder="Add a custom tag"
                className="w-full"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="membersOnly" className="block text-sm font-bold text-gray-800 mb-2">
                Members Only
              </label>
              <input
                id="membersOnly"
                type="checkbox"
                checked={membersOnly}
                onChange={(e) => setMembersOnly(e.target.checked)}
                className="mr-2 h-5 w-5 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-gray-800">Yes</span>
            </div>
            <div className="mb-6">
              <label htmlFor="imageUpload" className="block text-sm font-bold text-gray-800 mb-2">
                Upload Image
              </label>
              <div className="relative">
                <input
                  id="imageUpload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full p-3 rounded-lg bg-white border border-gray-300 text-gray-800 opacity-0 absolute z-10 h-full"
                />
                <div className="w-full p-3 rounded-lg bg-white border border-gray-300 text-gray-800 flex items-center">
                  {imageName || uploadedImageUrl
                    ? `Current image: ${imageName || 'Existing blog image'}`
                    : 'Choose an image'}
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={submitLoading}
                className={`bg-blue-500 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-blue-400 border border-gray-200/50 shadow-sm transition ${
                  submitLoading ? 'opacity-80 cursor-not-allowed' : ''
                }`}
              >
                {submitLoading ? (
                  <>
                    <span>Updating...</span>
                    <Spinner className="w-5 h-5" />
                  </>
                ) : (
                  'Update Blog'
                )}
              </button>
            </div>
          </form>
        )}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default withAuth(EditBlog);