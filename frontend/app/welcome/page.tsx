'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAccount } from 'wagmi';
import BlogCard from '@/components/BlogCard';
import Newsletter from '@/components/welcomeUI/Newsletter';
import BlogCardSkeleton from '@/components/BlogCardSkeleton';

const WelcomePage = () => {
  const { address, isConnected } = useAccount();
  const router = useRouter();

  // Mock blog data (replace with IPFS fetching later)
  const mockBlogs = [
    {
      id: 1,
      title: 'Introduction to Web3',
      slug: 'intro-to-web3',
      tag: 'Web3',
      date_added: '2025-04-12',
      reading_time: 5,
      image: '/images/web3.jpg',
    },
    {
      id: 2,
      title: 'Filecoin for Beginners',
      slug: 'filecoin-for-beginners',
      tag: 'Filecoin',
      date_added: '2025-04-11',
      reading_time: 4,
      image: '/images/filecoin.jpg',
    },
    // Add more mock blogs as needed
  ];

  // Redirect to /auth/register if not connected
  useEffect(() => {
    if (!isConnected || !address) {
      router.replace('/auth/register');
    }
  }, [isConnected, address, router]);

  // Shorten wallet address for greeting
  const shortenAddress = (addr: string) =>
    addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : 'User';

  return (
    <section className="pt-10 pb-8">
      <div className="flex items-center justify-between mb-8 px-4">
        <h1 className="text-2xl font-bold">
          Welcome back, {shortenAddress(address)}!
        </h1>
      </div>
      <div className="flex items-center justify-center gap-4 mb-6">
        <div className="border-b-2 border-b-readreblack-4 flex-1"></div>
        <p className="sm:px-10 text-center sm:text-3xl text-xl font-bold flex-nowrap">
          Featured Posts
        </p>
        <div className="border-b-2 border-b-readreblack-4 flex-1"></div>
      </div>

      <section className="pt-6 grid place-items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:px-6">
        {mockBlogs.length === 0 ? (
          [...Array(6)].map((_, index) => <BlogCardSkeleton key={index} />)
        ) : (
          mockBlogs.map((blog) => (
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
      </section>

      <button
        onClick={() => router.push('/blogs')}
        className="border border-readrepurple-5 flex mx-auto p-3 my-6 rounded-md text-readrepurple-5 hover:bg-readrepurple-5 hover:text-white transition-colors duration-300"
      >
        Explore More Articles
      </button>

      <Newsletter />
    </section>
  );
};

export default WelcomePage;