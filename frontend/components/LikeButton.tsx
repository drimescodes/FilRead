import { FaHeart } from "react-icons/fa";

interface LikeButtonProps {
  isLiked: boolean;
  likeCount: number;
  onLike: () => void;
}

const LikeButton: React.FC<LikeButtonProps> = ({ isLiked, likeCount, onLike }) => {
  return (
    <button 
      onClick={onLike} 
      className="flex items-center space-x-2 text-readrepurple-5 hover:text-readrepurple-6 transition-colors"
    >
      <FaHeart className={isLiked ? "text-red-500" : ""} />
      <span>{likeCount} {likeCount === 1 ? 'Like' : 'Likes'}</span>
    </button>
  );
};

export default LikeButton;