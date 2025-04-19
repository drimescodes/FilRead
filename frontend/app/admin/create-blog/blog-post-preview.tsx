'use client';
import Image from 'next/image';
import React from 'react';
import { fetchFromIPFS } from '@/lib/ipfs';

interface BlogPostPreviewProps {
  title: string;
  content: string;
  tags: string[];
  visibility: number;
  imageCid: string | null; // Can be IPFS CID or Cloudinary URL
}

const BlogPostPreview: React.FC<BlogPostPreviewProps> = ({
  title,
  content,
  tags,
  visibility,
  imageCid,
}) => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const visibilityLabel = ['Public', 'Private', 'Draft'][visibility] || 'Unknown';

  // Determine image source (IPFS or Cloudinary)
  const getImageSrc = () => {
    if (!imageCid) return null;
    // Check if imageCid is a Cloudinary URL
    if (imageCid.startsWith('https://res.cloudinary.com')) {
      return imageCid;
    }
    // Assume IPFS CID
    return `https://gateway.lighthouse.storage/ipfs/${imageCid}`;
  };

  const imageSrc = getImageSrc();

  return (
    <div className="bg-white text-gray-800 min-h-screen p-4 sm:p-6">
      {/* Header Section */}
      <header className="text-center py-8 bg-white/80 backdrop-blur-md rounded-lg shadow-lg border border-gray-200/50">
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-blue-500/50 text-gray-800 text-sm uppercase px-3 py-1 rounded-full border border-blue-300/50"
            >
              {tag}
            </span>
          ))}
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold my-4 text-gray-900">{title}</h1>
        <p className="text-gray-600">
          {currentDate} | {Math.ceil(content.split(' ').length / 200)} min read | {visibilityLabel}
        </p>
      </header>

      {/* Main Content Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mt-8">
        {/* Image */}
        <div className="col-span-1 lg:col-span-3 my-6">
          {imageSrc && (
            <div className="relative w-full h-[300px] sm:h-[400px] rounded-lg overflow-hidden shadow-lg border border-gray-200/50">
              <Image
                src={imageSrc}
                alt={title}
                fill
                className="object-cover"
              />
            </div>
          )}
        </div>

        {/* Blog Post Content */}
        <div className="col-span-1 lg:col-span-2">
          <div
            className="prose max-w-none text-gray-800 bg-white/80 backdrop-blur-md p-6 rounded-lg border border-gray-200/50"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>

        {/* Sidebar */}
        <aside className="col-span-1">
          <section className="bg-white/80 backdrop-blur-md p-6 rounded-lg border border-gray-200/50">
            <h2 className="text-xl font-bold mb-4 text-gray-900">Stay Updated</h2>
            <p className="text-gray-600">
              Connect your wallet to receive updates and exclusive content on-chain!
            </p>
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400 transition">
              Connect Wallet
            </button>
          </section>
        </aside>
      </div>
    </div>
  );
};
