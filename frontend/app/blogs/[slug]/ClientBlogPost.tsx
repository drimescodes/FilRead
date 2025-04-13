'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthStore } from '@/app/store/authStore';
import Comment from '@/components/Comment';
import LikeButton from '@/components/LikeButton';
import { getApiUrl } from '@/utils/api';
import { headers } from 'next/headers';

interface ClientBlogPostProps {
  content: string;
  blogSlug: string;
}

interface CommentType {
  id: number;
  text: string;
  date_added: string;
  user_id: number;
  blog_id: number;
  author: string;
  author_picture: string;
  liked: boolean;
  likes_count: number;
}

const ClientBlogPost: React.FC<ClientBlogPostProps> = ({ content, blogSlug }) => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [newCommentText, setNewCommentText] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const { user, isAuthenticated, accessToken} = useAuthStore();

  const API_BASE_URL = getApiUrl();

  useEffect(() => {
    fetchComments();
    fetchLikeStatus();
  }, [blogSlug, isAuthenticated]);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/blogs/${blogSlug}/comments`);
      console.log('Fetched comments:', response.data);
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const fetchLikeStatus = async () => {
    if (isAuthenticated) {
      try {
        const response = await axios.get(`${API_BASE_URL}/blogs/${blogSlug}/like`);
        setIsLiked(response.data.liked);
        setLikeCount(response.data.likes_count);
      } catch (error) {
        console.error('Error fetching like status:', error);
      }
    }
  };

  const handleAddComment = async () => {
    if (!isAuthenticated) {
      alert('Please log in to add a comment.');
      return;
    }
    try {
      const response = await axios.post(`${API_BASE_URL}/blogs/${blogSlug}/comments`, { text: newCommentText });
      setComments([...comments, response.data]);
      setNewCommentText('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleDeleteComment = async (id: number) => {
    try {
      await axios.delete(`${API_BASE_URL}/blogs/${blogSlug}/comments/${id}`);
      setComments(comments.filter(comment => comment.id !== id));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const handleEditComment = async (id: number, text: string) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/blogs/${blogSlug}/comments/${id}`, { text });
      setComments(comments.map(comment => comment.id === id ? response.data : comment));
    } catch (error) {
      console.error('Error editing comment:', error);
    }
  };

  const handleLikeComment = async (id: number) => {
    if (!isAuthenticated) {
      alert('Please log in to like a comment.');
      return;
    }
    try {
      const response = await axios.post(`${API_BASE_URL}/blogs/${blogSlug}/comments/${id}/like`, {
        headers: {
          'Authorization': `Bearer ${accessToken}` 
        }
      });
      setComments(comments.map(comment => 
        comment.id === id 
          ? { ...comment, liked: response.data.liked, likes_count: response.data.likes_count } 
          : comment
      ));
    } catch (error) {
      console.error('Error liking comment:', error);
    }
  };

  const handleLikeBlog = async () => {
    if (!isAuthenticated) {
      alert('Please log in to like the blog post.');
      return;
    }
    try {
      const response = await axios.post(`${API_BASE_URL}/blogs/${blogSlug}/like`,{
        headers: {
          'Authorization': `Bearer ${accessToken}` 
        }
      });
      setIsLiked(response.data.liked);
      setLikeCount(response.data.likes_count);
    } catch (error) {
      console.error('Error liking blog:', error);
    }
  };

  console.log('comments', comments);

  return (
    <article className='min-h-screen bg-readreblack-1 text-white p-6'>
      <div dangerouslySetInnerHTML={{ __html: content }} className="leading-relaxed mb-8 rendered-text" />
      
      <LikeButton isLiked={isLiked} likeCount={likeCount} onLike={handleLikeBlog} />
      
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Comments</h2>
        {comments.map(comment => (
          <Comment
            key={comment.id}
            id={comment.id}
            text={comment.text}
            dateAdded={comment.date_added}
            userId={comment.user_id}
            author={comment.author}
            authorPicture={comment.author_picture}
            liked={comment.liked}
            likesCount={comment.likes_count}
            onDelete={handleDeleteComment}
            onEdit={handleEditComment}
            onLike={handleLikeComment}
            isOwnComment={isAuthenticated && Number(user?.id) === comment.user_id}
          />
        ))}
        <div className="mt-8">
          <textarea
            value={newCommentText}
            onChange={(e) => setNewCommentText(e.target.value)}
            placeholder={isAuthenticated ? "Add a comment" : "Please log in to comment"}
            className="w-full bg-readreblack-4 text-white p-2 rounded"
            rows={4}
            disabled={!isAuthenticated}
          />
          <button 
            onClick={handleAddComment} 
            className='mt-4 py-2 px-4 bg-readrepurple-5 rounded-md hover:bg-readrepurple-6 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
            disabled={!isAuthenticated}
          >
            {isAuthenticated ? "Post Comment" : "Log in to Comment"}
          </button>
        </div>
      </div>
    </article>
  );
};

export default ClientBlogPost;