'use client';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createPost } from '@/utils/contract';
import { uploadToIPFS } from '@/lib/ipfs';
import BlogPostPreview from '@/app/admin/create-blog/blog-post-preview';
import withAuth from '@/components/withAuth';
import Spinner from '@/components/Spinner';
import MultiSelect from '@/components/MultiSelect';

const Quill = dynamic(
  () => import('@/components/Quill').then((mod) => mod.default),
  {
    ssr: false,
    loading: () => <p>Loading editor...</p>,
  }
);

const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [visibility, setVisibility] = useState(0); // 0=Public, 1=Private, 2=Draft
  const [image, setImage] = useState<File | null>(null);
  const [imageName, setImageName] = useState('');
  const [imageCid, setImageCid] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setImageName(e.target.files[0].name);
      try {
        const cid = await uploadToIPFS(e.target.files[0]);
        setImageCid(cid);
      } catch (err) {
        setError('Failed to upload image to IPFS');
        toast.dismiss(); // Clear existing toasts
        toast.error('Failed to upload image to IPFS');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    toast.dismiss(); // Clear existing toasts

    if (!title.trim()) {
      setError('Title cannot be empty');
      setLoading(false);
      toast.error('Title cannot be empty');
      return;
    }

    if (!content.trim()) {
      setError('Content cannot be empty');
      setLoading(false);
      toast.error('Content cannot be empty');
      return;
    }

    if (!imageCid) {
      setError('Please upload an image');
      setLoading(false);
      toast.error('Please upload an image');
      return;
    }

    try {
      // Upload content to IPFS
      const contentCid = await uploadToIPFS(content);

      // Create post on-chain
      await createPost(title, contentCid, tags, visibility);

      toast.success('Blog post created successfully!', {
        position: 'top-right',
        autoClose: 3000,
        onClose: () => {
          router.push('/admin/manage-blogs'); // Navigate after toast closes
        },
      });
    } catch (err) {
      console.error('Error creating blog:', err);
      setError('Failed to create blog post. Please try again.');
      toast.error('Failed to create blog post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const togglePreviewMode = () => {
    setIsPreviewMode(!isPreviewMode);
  };

  // Tag options
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

  return (
    <div className="bg-white min-h-screen p-4 sm:p-6">
      <div className="max-w-7xl mx-auto bg-white">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Create a New Blog
          </h1>
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
            content={content}
            tags={tags}
            visibility={visibility}
            imageCid={imageCid}
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
              <label htmlFor="content" className="block text-sm font-bold text-gray-800 mb-2">
                Content
              </label>
              <Quill value={content} setValue={setContent} />
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
              <label htmlFor="visibility" className="block text-sm font-bold text-gray-800 mb-2">
                Visibility
              </label>
              <select
                id="visibility"
                value={visibility}
                onChange={(e) => setVisibility(Number(e.target.value))}
                className="w-full p-3 rounded-lg bg-white border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={0}>Public</option>
                <option value={1}>Private</option>
                <option value={2}>Draft</option>
              </select>
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
                  className="w-full p-3 rounded-lg bg-white border border-gray-300 text-gray-800 opacity-0 absolute z-10"
                />
                <div className="w-full p-3 rounded-lg bg-white border border-gray-300 text-gray-800 flex items-center">
                  {imageName ? `Selected: ${imageName}` : 'Choose an image'}
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className={`bg-blue-500 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-blue-400 border border-gray-200/50 shadow-sm transition ${loading ? 'opacity-80 cursor-not-allowed' : ''}`}
              >
                {loading ? (
                  <>
                    <span>Creating...</span>
                    <Spinner className="w-5 h-5" />
                  </>
                ) : (
                  'Create Blog'
                )}
              </button>
            </div>
          </form>
        )}
      </div>

    </div>
  );
};

export default withAuth(CreateBlog);