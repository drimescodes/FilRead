// types/blog.ts
export interface Blog {
    id: number;
    title: string;
    slug: string;
    description: string;
    tag: string;
    reading_time: number;
    members_only: boolean;
    image: string;
    date_added: string;
    likes_count: number;
  }
  
  export interface BlogCreate {
    title: string;
    description: string;
    tag: string;
    members_only?: boolean;
    image: string;
  }
  
  export interface Comment {
    id: number;
    text: string;
    date_added: string;
    user_id: number;
    blog_id: number;
    author: string;
    author_picture?: string;
    liked: boolean;
    likes_count: number;
  }