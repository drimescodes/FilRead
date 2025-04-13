'use client'
import Image from "next/image";
import { useState } from "react";
import { FaHeart } from "react-icons/fa";

interface CommentProps {
  id: number;
  text: string;
  dateAdded: string;
  userId: number;
  author: string;
  authorPicture: string;
  liked: boolean;
  likesCount: number;
  onDelete: (id: number) => void;
  onEdit: (id: number, text: string) => void;
  onLike: (id: number) => void;
  isOwnComment: boolean;
}

const Comment: React.FC<CommentProps> = ({
  id,
  text,
  dateAdded,
  userId,
  author,
  authorPicture,
  liked,
  likesCount,
  onDelete,
  onEdit,
  onLike,
  isOwnComment,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);

  const handleEdit = () => {
    onEdit(id, editText);
    setIsEditing(false);
  };

  return (
    <div className="mb-4 p-4 bg-readreblack-6 rounded-lg">
      <div className="flex items-start justify-between">
        <div className="my-4 w-full">
          <section className="inline-flex gap-4 items-center">
            <Image src={authorPicture || "/placeholder-avatar.jpg"} alt="" width={24} height={24} className="rounded-full" />
            <p className="font-bold">{author}</p>
          </section>
          <p className="text-sm text-gray-500">{new Date(dateAdded).toLocaleString()}</p>

          {isEditing ? (
            <textarea
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="w-full mt-2 p-2 bg-readreblack-5 text rounded"
            />
          ) : (
            <p className="my-2">{text}</p>
          )}
          <div className="flex items-center space-x-4">
            <button onClick={() => onLike(id)} className="text-readrepurple-5">
              <FaHeart className={liked ? "text-red-500" : ""} />
            </button>
            <span>{likesCount}</span>
            
            {isOwnComment && (
              <>
                {isEditing ? (
                  <>
                    <button onClick={handleEdit} className="text-readrepurple-5">Save</button>
                    <button onClick={() => setIsEditing(false)} className="text-readrepurple-5">Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => setIsEditing(true)} className="text-readrepurple-5">Edit</button>
                    <button onClick={() => onDelete(id)} className="text-readrepurple-5">Delete</button>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;