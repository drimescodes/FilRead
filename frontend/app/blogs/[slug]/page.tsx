import { Metadata, ResolvingMetadata } from 'next/types'
import { notFound } from 'next/navigation'
import BlogPost from './BlogPost'
import axios from 'axios'
import { getApiUrl } from '@/utils/api'
import {mockBlogs} from "@/app/data/mockBlog"

// Types for the blog post data
interface BlogPostData {
  title: string;
  description: string;
  // image: string;
  image:any;
  author: string;
  date_added: string;
  tag: string;
  reading_time: number;
}

type Props = {
  params: { 
    slug: string;
  };
}

// Fetch blog post data
// async function getBlogPost(slug: string): Promise<BlogPostData | null> {
//   try {
//     const API_BASE_URL = getApiUrl();
//     const res = await axios.get(`${API_BASE_URL}/blogs/${slug}`);
//     return res.data;
//   } catch (error) {
//     console.error('Error fetching blog post:', error);
//     return null;
//   }
// }

async function getBlogPost(slug: string): Promise<BlogPostData | null> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const post = mockBlogs.find((blog) => blog.slug === slug);
  return post || null;
}



// Generate metadata for the blog post
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const post = await getBlogPost(params.slug)
  
  if (!post) {
    return {
      title: 'Blog Post Not Found',
    }
  }

  const formattedDate = new Date(post.date_added).toISOString()

  return {
    title: post.title,
    description: post.description.substring(0, 160),
    openGraph: {
      title: post.title,
      description: post.description.substring(0, 160),
      type: 'article',
      publishedTime: formattedDate,
      authors: [post.author],
      images: [
        {
          url: post.image.src,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      tags: [post.tag],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description.substring(0, 160),
      images: [post.image.src],
    },
  }
}

// Page component
export default async function Page({ params }: Props) {
  const postData = await getBlogPost(params.slug)
  
  if (!postData) {
    notFound()
  }

  return <BlogPost postData={postData} params={params} />
}