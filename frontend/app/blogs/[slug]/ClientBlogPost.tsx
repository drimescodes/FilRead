'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { useAccount } from 'wagmi';
import Comment from '@/components/Comment';
import LikeButton from '@/components/LikeButton';
import { getApiUrl } from '@/utils/api';

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
  const { address, isConnected } = useAccount();
  const API_BASE_URL = getApiUrl();

  useEffect(() => {
    fetchComments();
    if (isConnected) {
      fetchLikeStatus();
    }
  }, [blogSlug, isConnected]);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/blogs/${blogSlug}/comments`);
      console.log('Fetched comments:', response.data); // Debug
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const fetchLikeStatus = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/blogs/${blogSlug}/like`);
      setIsLiked(response.data.liked);
      setLikeCount(response.data.likes_count);
    } catch (error) {
      console.error('Error fetching like status:', error);
    }
  };

  const handleAddComment = async () => {
    if (!isConnected) {
      alert('Please connect your wallet to add a comment.');
      return;
    }
    try {
      const response = await axios.post(`${API_BASE_URL}/blogs/${blogSlug}/comments`, {
        text: newCommentText,
      });
      setComments([...comments, response.data]);
      setNewCommentText('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleDeleteComment = async (id: number) => {
    try {
      await axios.delete(`${API_BASE_URL}/blogs/${blogSlug}/comments/${id}`);
      setComments(comments.filter((comment) => comment.id !== id));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const handleEditComment = async (id: number, text: string) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/blogs/${slug}/comments/${id}`, {
        text,
      });
      setComments(comments.map((comment) => (comment.id === id ? response.data : comment)));
    } catch (error) {
      console.error('Error editing comment:', error);
    }
  };

  const handleLikeComment = async (id: number) => {
    if (!isConnected) {
      alert('Please connect your wallet to like a comment.');
      return;
    }
    try {
      const response = await axios.post(`${API_BASE_URL}/blogs/${blogSlug}/comments/${id}/like`);
      setComments(
        comments.map((comment) =>
          comment.id === id
            ? { ...comment, liked: response.data.liked, likes_count: response.data.likes_count }
            : comment
        )
      );
    } catch (error) {
      console.error('Error liking comment:', error);
    }
  };

  const handleLikeBlog = async () => {
    if (!isConnected) {
      alert('Please connect your wallet to like the blog post.');
      return;
    }
    try {
      const response = await axios.post(`${API_BASE_URL}/blogs/${blogSlug}/like`);
      setIsLiked(response.data.liked);
      setLikeCount(response.data.likes_count);
    } catch (error) {
      console.error('Error liking blog:', error);
    }
  };

  const articleRef = useRef<HTMLElement>(null);
  const scrollInfo = useRef({
    maxPct: 0,
    activeSec: 0,
    lastScroll: Date.now(),
    tabActive: true,
  });
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Compute word count
  const getWordCount = (html: string) =>
    html.replace(/<[^>]+>/g, ' ').trim().split(/\s+/).length;

  // Toast helper
  const showToast = useCallback((msg: string) => {
    setToastMsg(msg);
    console.log(msg);
    setTimeout(() => setToastMsg(null), 3000);
  }, []);

  useEffect(() => {
    const articleEl = articleRef.current;
    if (!articleEl) return;

    const wordCount = getWordCount(content);
    const readingTime = (wordCount / 200) * 60; // seconds
    const minTime = readingTime * 0.5; // 50%
    const fastScrollThreshold = readingTime * 0.2; // 20%

    const handleScroll = () => {
      const scrollTop = articleEl.scrollTop;
      const maxScrollTop = articleEl.scrollHeight - articleEl.clientHeight;
      const pct = (scrollTop / maxScrollTop) * 100;
      scrollInfo.current.maxPct = Math.max(scrollInfo.current.maxPct, pct);
      scrollInfo.current.lastScroll = Date.now();

      // If they jump to 80% within 20% of the predicted time → warn
      if (
        scrollInfo.current.maxPct >= 80 &&
        scrollInfo.current.activeSec < fastScrollThreshold
      ) {
        showToast('You scrolled too quickly—please read more slowly.');
      }
    };

    const tick = () => {
      const delta = (Date.now() - scrollInfo.current.lastScroll) / 1000;
      if (delta < 10 && scrollInfo.current.tabActive) {
        scrollInfo.current.activeSec++;
      }
    };

    const handleVisibility = () => {
      scrollInfo.current.tabActive = !document.hidden;
    };

    articleEl.addEventListener('scroll', handleScroll);
    document.addEventListener('visibilitychange', handleVisibility);
    const timer = setInterval(tick, 1000);

    return () => {
      articleEl.removeEventListener('scroll', handleScroll);
      document.removeEventListener('visibilitychange', handleVisibility);
      clearInterval(timer);
    };
  }, [content, showToast]);

  // Invoked on “Claim Reward”
  const checkIfRead = () => {
    const { maxPct, activeSec } = scrollInfo.current;
    const wordCount = getWordCount(content);
    const readingTime = (wordCount / 200) * 60;
    if (maxPct >= 80 && activeSec >= readingTime * 0.5) {
      console.log('✅ Article read! Awarding points…');
      // POST to server: reward endpoint
    } else {
      console.log('❌ Not enough engagement.');
    }
  };

  return (
    <article className="min-h-screen text-filblack p-6">
      <div
        ref={articleRef}
        dangerouslySetInnerHTML={{ __html: content }}
        className="leading-relaxed mb-8 rendered-text"
      />
      <button onClick={checkIfRead} className="mt-4 p-2 bg-blue-500 text-white">
        Claim Reward
      </button>
      <LikeButton isLiked={isLiked} likeCount={likeCount} onLike={handleLikeBlog} />

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Comments</h2>
        {comments.map((comment) => (
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
            isOwnComment={isConnected && address && Number(address) === comment.user_id}
          />
        ))}
        <div className="mt-8">
          <textarea
            value={newCommentText}
            onChange={(e) => setNewCommentText(e.target.value)}
            placeholder={isConnected ? 'Add a comment' : 'Please connect your wallet to comment'}
            className="w-full bg-[#dadada] text-filblack p-2 rounded"
            rows={4}
            disabled={!isConnected}
          />
          <button
            onClick={handleAddComment}
            className="mt-4 py-2 px-4 bg-filblue text-filwhite rounded-md hover:bg-readrepurple-6 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!isConnected}
          >
            {isConnected ? 'Post Comment' : 'Connect Wallet to Comment'}
          </button>
        </div>
      </div>
    </article>
  );
};

export default ClientBlogPost;