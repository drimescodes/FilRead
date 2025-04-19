'use client';
import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import useSWR from 'swr';
import BlogCard from '@/components/BlogCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Spinner from '@/components/Spinner';
import { fetchFromIPFS } from '@/lib/ipfs';
import { getAllBlogs } from '@/utils/contract';

const fetchBlogs = async (searchTerm: string) => {
  try {
    console.log('Fetching blogs with search term:', searchTerm); // Debug
    const blogs = await getAllBlogs();
    console.log('Raw blogs from contract:', blogs); // Debug

    // Filter public blogs (visibility: 0)
    const publicBlogs = blogs.filter((blog: any) => blog.visibility === 0);

    // Map contract data to BlogCard props
    const mappedBlogs = await Promise.all(
      publicBlogs.map(async (blog: any) => {
        let content = '';
        try {
          if (blog.contentCid) {
            content = await fetchFromIPFS(blog.contentCid);
          }
        } catch (error) {
          console.error('Failed to fetch content for CID:', blog.contentCid, error);
        }

        return {
          id: blog.id.toString(),
          title: blog.title,
          slug: blog.title.toLowerCase().replace(/\s+/g, '-'), // Generate slug
          tag: blog.tags && blog.tags.length > 0 ? blog.tags[0] : 'General',
          date_added: Number(blog.date_added) * 1000, // Convert to milliseconds
          reading_time: content ? Math.ceil(content.split(' ').length / 200) : 1,
          image: blog.imageCid
            ? `https://gateway.lighthouse.storage/ipfs/${blog.imageCid}`
            : '/placeholder.png',
        };
      })
    );

    // Apply search filter
    if (searchTerm) {
      return mappedBlogs.filter((blog: any) =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return mappedBlogs;
  } catch (error: any) {
    console.error('Error fetching blogs:', error.message, error.stack); // Debug
    throw new Error('Failed to fetch blogs');
  }
};

const PublicBlogs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch] = useDebounce(searchTerm, 500);
  const [isSearching, setIsSearching] = useState(false);

  const { data: blogs, error } = useSWR(
    `/blogs${debouncedSearch ? `?search=${debouncedSearch}` : ''}`,
    () => fetchBlogs(debouncedSearch),
    {
      onLoadingSlow: () => setIsSearching(true),
      onSuccess: () => setIsSearching(false),
      loadingTimeout: 400,
    }
  );

  return (
    <section className="bg-filwhite mx-auto min-h-svh text-filblack">
      <Navbar />
      <h1 className="text-3xl font-bold mb-8 text-center text-filblack pt-4">
        Explore Our Blog
      </h1>

      {/* Search Bar */}
      <div className="max-w-xl mx-auto mb-8 px-4">
        <input
          type="text"
          placeholder="Search blogs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-filblue text-black"
        />
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {error ? (
          <div className="col-span-full text-center text-red-500">
            Error loading blogs
          </div>
        ) : !blogs || isSearching ? (
          <Spinner className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8" />
        ) : blogs.length === 0 ? (
          <div className="col-span-full text-center py-20">
            No blogs found matching your search
          </div>
        ) : (
          blogs.map((blog: any) => (
            <BlogCard
              key={blog.id}
              title={blog.title}
              slug={blog.slug}
              category={blog.tag}
              date={new Date(blog.date_added).toLocaleDateString()}
              readTime={`${blog.reading_time} min read`}
              imageUrl={blog.image}
            />
          ))
        )}
      </div>
      <Footer />
    </section>
  );
};

export default PublicBlogs;