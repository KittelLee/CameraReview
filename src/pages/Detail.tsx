import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Review } from "../types/Review";

interface Comment {
  id: number;
  content: string;
  author: string;
}

function Detail() {
  const { id } = useParams<{ id: string }>();
  const [review, setReview] = useState<Review | null>(null);
  const [likes, setLikes] = useState(0);
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState({ content: "", author: "" });
  const [currentUser, setCurrentUser] = useState("");
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editedCommentContent, setEditedCommentContent] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await fetch(`${apiUrl}/camera/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setReview(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleCommentSubmit = () => {
    if (newComment.content.trim() !== "" && currentUser.trim() !== "") {
      const newComments = [
        ...comments,
        {
          id: comments.length + 1,
          content: newComment.content,
          author: currentUser,
        },
      ];
      setComments(newComments);
      setNewComment({ ...newComment, content: "" });
    }
  };

  const handleEdit = (id: number) => {
    const commentToEdit = comments.find((comment) => comment.id === id);
    if (commentToEdit && commentToEdit.author === currentUser) {
      setEditingCommentId(id);
      setEditedCommentContent(commentToEdit.content);
    }
  };

  const handleEditComplete = () => {
    if (editingCommentId !== null && editedCommentContent.trim() !== "") {
      const updatedComments = comments.map((comment) => {
        if (comment.id === editingCommentId) {
          return { ...comment, content: editedCommentContent };
        }
        return comment;
      });
      setComments(updatedComments);
      setEditingCommentId(null);
      setEditedCommentContent("");
    }
  };

  const handleDelete = (id: number) => {
    const updatedComments = comments.filter((comment) => comment.id !== id);
    setComments(updatedComments);
  };

  if (!review) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl">{review.title}</h2>
      <p>{review.content}</p>
      <p>{review.price}</p>

      <div className="mt-4">
        <button
          onClick={() => setLikes(likes + 1)}
          className="mr-2 p-2 bg-blue-500 text-white rounded"
        >
          Like {likes}
        </button>
        <div className="mt-4">
          <label className="mr-2">Rating:</label>
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="border rounded p-1"
            min="0"
            max="5"
          />
          <span className="ml-2">{rating} / 5</span>
        </div>
        <div className="mt-4">
          <h3 className="text-xl">Comments</h3>
          <input
            type="text"
            value={currentUser}
            onChange={(e) => setCurrentUser(e.target.value)}
            className="border rounded p-2 mb-2 w-4/12"
            placeholder="Your Name"
          />
          <input
            type="text"
            value={newComment.content}
            onChange={(e) =>
              setNewComment({ ...newComment, content: e.target.value })
            }
            className="border rounded p-2 w-8/12"
            placeholder="Add a comment"
          />

          <button
            onClick={handleCommentSubmit}
            className="mt-2 p-2 bg-green-500 text-white rounded"
          >
            Submit
          </button>
          <div className="mt-4">
            {comments.map((comment, index) => (
              <div key={index} className="border-t pt-2">
                {editingCommentId === comment.id ? (
                  <input
                    type="text"
                    value={editedCommentContent}
                    onChange={(e) => setEditedCommentContent(e.target.value)}
                    className="border rounded p-2 w-full"
                  />
                ) : (
                  <div>
                    <p>{comment.content}</p>
                    <p>Written by: {comment.author}</p>
                  </div>
                )}
                {comment.author === currentUser && (
                  <div>
                    {!editingCommentId && (
                      <button
                        className="mr-2 p-1 bg-blue-500 text-white rounded-lg"
                        onClick={() => handleEdit(comment.id)}
                      >
                        Edit
                      </button>
                    )}
                    {editingCommentId === comment.id && (
                      <button
                        className="mr-2 p-1 bg-green-500 text-white rounded-lg"
                        onClick={handleEditComplete}
                      >
                        Edit Complete
                      </button>
                    )}
                    <button
                      className="p-1 bg-red-500 text-white rounded-lg"
                      onClick={() => handleDelete(comment.id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;
