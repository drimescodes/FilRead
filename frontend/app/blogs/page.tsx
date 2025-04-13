'use client';
import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import axios from 'axios';
import BlogCard from '@/components/BlogCard';
import useSWR from 'swr';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Spinner from '@/components/Spinner';
const fetcher = (url: string) => axios.get(url).then(res => res.data);

const PublicBlogs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch] = useDebounce(searchTerm, 500);

  const [isSearching, setIsSearching] = useState(false);

  const { data: blogs, error } = useSWR(
    `/blogs${debouncedSearch ? `?search=${debouncedSearch}` : ''}`,
    fetcher,
    {
      onLoadingSlow: () => setIsSearching(true),
      onSuccess: () => setIsSearching(false),
      loadingTimeout: 400, // Show loading state after 400ms
    }
  );

  return (
    <section className='bg-readreblack-1 mx-auto min-h-svh text-white '>
    <Navbar />
    
      <h1 className="text-3xl font-bold mb-8 text-center text-white pt-4">Explore Our Blog</h1>
      
      {/* Search Bar */}
      <div className="max-w-xl mx-auto mb-8 px-4">
        <input
          type="text"
          placeholder="Search blogs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-readrepurple-5 text-black"
        />
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
      {error ? (
          <div className="col-span-full text-center text-red-500">
            Error loading blogs
          </div>
        ) : !blogs || isSearching ? (
          <Spinner className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  w-8 h-8 "/>
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