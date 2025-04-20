'use client';
import dynamic from 'next/dynamic';
import { useState, useCallback } from 'react';
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
  const [visibility, setVisibility] = useState(0);
  const [image, setImage] = useState<File | null>(null);
  const [imageName, setImageName] = useState('');
  const [imageCid, setImageCid] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);

  const router = useRouter();

  const handleImageUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) {
      setError('No image selected');
      toast.error('No image selected');
      return;
    }

    const selectedImage = e.target.files[0];
    if (!selectedImage.type.startsWith('image/')) {
      setError('Please select a valid image file (e.g., JPG, PNG)');
      toast.error('Please select a valid image file');
      return;
    }

    if (selectedImage.size > 5 * 1024 * 1024) {
      setError('Image size exceeds 5MB limit');
      toast.error('Image size exceeds 5MB limit');
      return;
    }

    setImage(selectedImage);
    setImageName(selectedImage.name);
    setImageCid(null);
    setError(null);
    setImageUploading(true);

    try {
      console.log('Uploading image:', selectedImage.name, 'Size:', selectedImage.size); // Debug
      const cid = await retryUploadToIPFS(selectedImage, 3);
      console.log('Image CID:', cid); // Debug
      setImageCid(cid);
      toast.success('Image uploaded to IPFS');
    } catch (err: any) {
      console.error('Image upload error:', err.message || err); // Debug
      setError('Failed to upload image to IPFS: ' + (err.message || 'Unknown error'));
      toast.error('Failed to upload image to IPFS');
      setImageCid(null);
      setImage(null);
      setImageName('');
    } finally {
      setImageUploading(false);
    }
  }, []);

  // Retry logic for IPFS uploads
  const retryUploadToIPFS = async (data: File | string, maxRetries: number): Promise<string> => {
    let attempt = 0;
    while (attempt < maxRetries) {
      try {
        return await uploadToIPFS(data);
      } catch (err) {
        attempt++;
        console.warn(`IPFS upload attempt ${attempt} failed:`, err); // Debug
        if (attempt === maxRetries) throw err;
        await new Promise((resolve) => setTimeout(resolve, 1000 * attempt)); // Exponential backoff
      }
    }
    throw new Error('Max retries reached');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if image is still uploading
    if (imageUploading) {
      setError('Image is still uploading. Please wait.');
      toast.error('Image is still uploading. Please wait.');
      return;
    }

    // Validate form fields
    if (!title.trim()) {
      setError('Title cannot be empty');
      toast.error('Title cannot be empty');
      return;
    }

    if (!content.trim()) {
      setError('Content cannot be empty');
      toast.error('Content cannot be empty');
      return;
    }

    if (!imageCid) {
      setError('Please upload an image');
      toast.error('Please upload an image');
      return;
    }

    if (visibility < 0 || visibility > 2) {
      setError('Invalid visibility setting');
      toast.error('Invalid visibility setting');
      return;
    }

    // Start loading state
    setLoading(true);
    setError(null);
    toast.dismiss();

    try {
      // Upload content to IPFS
      console.log('Starting content upload to IPFS...');
      const contentCid = await retryUploadToIPFS(content, 3);
      console.log('Content uploaded successfully:', contentCid);

      // Create metadata with content CID
      console.log('Creating metadata...');
      const metadata = JSON.stringify({ contentCid });
      const metadataCid = await retryUploadToIPFS(metadata, 3);
      console.log('Metadata uploaded successfully:', metadataCid);

      // Prepare post data
      const postData = {
        title,
        content: '', // Not used on-chain, stored in lighthouseMetadata
        tags,
        visibility,
        imageCid,
        lighthouseMetadata: metadataCid,
      };

      // Create post on-chain
      console.log('Creating post on-chain...');
      await createPost(postData);
      console.log('Post created successfully!');

      // Success handling
      toast.success('Blog post created successfully!', {
        position: 'top-right',
        autoClose: 3000,
        onClose: () => {
          router.push('/admin/manage-blogs');
        },
      });
    } catch (err: any) {
      console.error('Error creating blog:', {
        message: err.message,
        stack: err.stack,
        name: err.name
      });
      
      // Handle specific errors
      let errorMessage = 'Failed to create blog post: ';
      if (err.message.includes('User not registered')) {
        errorMessage += 'Please register your account first.';
      } else if (err.message.includes('Invalid Lighthouse CID')) {
        errorMessage += 'Invalid image CID.';
      } else {
        errorMessage += err.message || 'Unknown error';
      }
      
      // Update UI with error
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      // Always reset loading state
      setLoading(false);
    }
  };

  const togglePreviewMode = () => {
    setIsPreviewMode(!isPreviewMode);
  };

  const clearImage = useCallback(() => {
    setImage(null);
    setImageName('');
    setImageCid(null);
    setError(null);
  }, []);

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
    <div className="bg-filwhite min-h-screen p-4 sm:p-6">
      <div className="max-w-7xl mx-auto bg-filwhite">
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
                  disabled={imageUploading}
                  className="w-full p-3 rounded-lg bg-white border border-gray-300 text-gray-800 opacity-0 absolute z-10 cursor-pointer"
                />
                <div className="w-full p-3 rounded-lg bg-white border border-gray-300 text-gray-800 flex items-center justify-between">
                  <span>
                    {imageUploading
                      ? 'Uploading...'
                      : imageName
                      ? `Selected: ${imageName}`
                      : 'Choose an image'}
                  </span>
                  {imageName && !imageUploading && (
                    <button
                      type="button"
                      onClick={clearImage}
                      className="text-red-500 hover:text-red-700"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading || imageUploading}
                className={`bg-blue-500 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-blue-400 border border-gray-200/50 shadow-sm transition ${
                  loading || imageUploading ? 'opacity-80 cursor-not-allowed' : ''
                }`}
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