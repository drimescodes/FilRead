import Image from 'next/image';
import React from 'react';

interface BlogPostPreviewProps {
  title: string;
  content: string;
  tag: string;
  image: File | null;
  cloudinaryUrl?: string | null;
}

const BlogPostPreview: React.FC<BlogPostPreviewProps> = ({ 
  title, 
  content, 
  tag, 
  image,
  cloudinaryUrl 
}) => {
  const currentDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  // Determine which image source to use
  const getImageSrc = () => {
    if (image) {
      return URL.createObjectURL(image);
    }
    if (cloudinaryUrl) {
      return cloudinaryUrl;
    }
    return null;
  };

  const imageSrc = getImageSrc();
  
  return (
    <div className="bg-readreblack-1 text-white">
      {/* Header Section */}
      <header className="text-center py-8">
        <p className="text-readrepurple-5 uppercase">{tag}</p>
        <h1 className="text-4xl font-bold my-4">{title}</h1>
        <p className="text-readreblack-4">{currentDate} | {Math.ceil(content.split(' ').length / 200)} min read</p>
      </header>
      
      {/* Main Content Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 mx-auto">
        {/* Image */}
        <div className="col-span-1 md:col-span-3 my-6">
          <div className="relative w-full h-[400px]"> 
            {imageSrc && (
              <Image 
                src={imageSrc}
                alt={title} 
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            )}
          </div>
        </div>

        {/* Blog Post Content */}
        <div className="col-span-1 md:col-span-2">
          <div dangerouslySetInnerHTML={{ __html: content }} className="prose prose-invert max-w-none rendered-text" />
        </div>

        {/* Sidebar (simplified) */}
        <aside className="col-span-1 border-l pl-3">
          <section className='bg-readreblack-6 p-4 rounded-lg mb-6'>
            <h2 className="text-xl font-bold mb-4">Subscribe To Our Newsletter</h2>
            {/* Simplified form for preview */}
            <p>Newsletter subscription form would appear here</p>
          </section>
        </aside>
      </div>
    </div>
  );
};

export default BlogPostPreview;