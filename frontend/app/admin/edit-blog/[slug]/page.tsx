'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Quill from '@/components/Quill';
import  BlogPostPreview  from '@/app/admin/create-blog/blog-post-preview';
import  MultiSelect  from '@/components/MultiSelect';
import Spinner from '@/components/Spinner';
import withAuth  from '@/components/withAuth';

interface EditBlogProps {
  params: { slug: string };
}

const tagOptions = [
  'Technology', 'Data Science', 'AI / ML', 'Web Development',
  'Mobile Development', 'Cloud Computing', 'DevOps',
  'Cyber Security', 'Databases', 'Software Engineering',
  'Project Management', 'Startups', 'Entrepreneurship',
];

const EditBlog = ({ params: { slug } }: EditBlogProps) => {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [membersOnly, setMembersOnly] = useState(false);
  const [imageName, setImageName] = useState<string>('');
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);

  // Stubbed fetch: replace with real smart-contract/API call later
  const fetchBlog = useCallback(async () => {
    try {
      // simulate loading delay
      await new Promise((r) => setTimeout(r, 500));
      // stub data
      const blog = {
        title: 'Demo Blog Title',
        description: '<p>Demo content goes here.</p>',
        tag: 'Technology,Web Development',
        members_only: false,
        image: null,
      };
      setTitle(blog.title);
      setDescription(blog.description);
      setTags(blog.tag.split(','));
      setMembersOnly(blog.members_only);
      setUploadedImageUrl(blog.image);
    } catch {
      toast.error('Failed to load demo blog');
      router.push('/admin/manage-blogs');
    } finally {
      setPageLoading(false);
    }
  }, [router, slug]);

  useEffect(() => {
    fetchBlog();
  }, [fetchBlog]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (file) {
      if (!file.type.startsWith('image/') || file.size > 5 * 1024 * 1024) {
        return toast.error('Only images under 5 MB allowed');
      }
      setImageFile(file);
      setImageName(file.name);
      setUploadedImageUrl(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitLoading(true);

    const body = description.trim();
    if (!body) {
      setError('Content cannot be empty');
      toast.error('Content cannot be empty');
      setSubmitLoading(false);
      return;
    }

    try {
      // Simulate submit delay
      await new Promise((r) => setTimeout(r, 500));
      const payload = {
        title,
        description: body,
        tags,
        membersOnly,
        imageName,
      };
      console.log('📝 STUB SUBMIT:', payload);
      toast.success('Demo blog “updated” — PoC only', {
        onClose: () => router.push('/admin/manage-blogs'),
      });
    } catch {
      setError('Demo update failed');
      toast.error('Demo update failed');
    } finally {
      setSubmitLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <Spinner className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8" />
    );
  }

  return (
    <div className="bg-white min-h-screen p-4 sm:p-6">
      <div className="max-w-3xl mx-auto bg-white">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Edit Blog (PoC)</h1>
          <button
            onClick={() => setIsPreviewMode((v) => !v)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {isPreviewMode ? 'Edit' : 'Preview'}
          </button>
        </div>

        {isPreviewMode ? (
          <BlogPostPreview
            title={title}
            content={description}
            tags={tags}
            visibility={membersOnly ? 1 : 0}
            imageCid={uploadedImageUrl}
          />
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && <p className="text-red-600">{error}</p>}

            <div>
              <label className="block mb-1">Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block mb-1">Content</label>
              <Quill value={description} setValue={setDescription} />
            </div>

            <div>
              <label className="block mb-1">Tags</label>
              <MultiSelect
                options={tagOptions}
                selected={tags}
                onChange={setTags}
                placeholder="Add a tag"
                className="w-full"
              />
            </div>

            <div className="flex items-center">
              <input
                id="membersOnly"
                type="checkbox"
                checked={membersOnly}
                onChange={(e) => setMembersOnly(e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="membersOnly">Members Only</label>
            </div>

            <div>
              <label className="block mb-1">Upload Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="block"
              />
              {imageName && <p className="mt-1">Selected: {imageName}</p>}
            </div>

            <button
              type="submit"
              disabled={submitLoading}
              className={`bg-green-600 text-white px-4 py-2 rounded ${
                submitLoading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {submitLoading ? 'Updating…' : 'Update Blog'}
            </button>
          </form>
        )}

        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
};

export default withAuth(EditBlog);
