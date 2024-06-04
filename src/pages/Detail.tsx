import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Review } from "../types/Review";
import { v1 as uuidv1 } from "uuid";

interface Comment {
  id: number;
  cameraId: number;
  content: string;
  authorId: string;
  rating: number; // Add rating property
}

const customOptions = {
  node: [0x01, 0x23, 0x45, 0x67, 0x89, 0xab],
  clockseq: 0x1234,
  msecs: new Date("2024-06-03").getTime(),
  nsecs: 5678,
};

function Detail() {
  const { id } = useParams<{ id: string }>();
  const [review, setReview] = useState<Review | null>(null);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState({
    content: "",
    authorId: "",
    rating: 0,
  }); // Include rating
  const [currentUser, setCurrentUser] = useState<string | null>(null);
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

        const commentsResponse = await fetch(
          `${apiUrl}/comments?cameraId=${id}`
        );
        if (!commentsResponse.ok) {
          throw new Error("Failed to fetch comments");
        }
        const commentsData = await commentsResponse.json();
        setComments(commentsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleCommentSubmit = async () => {
    if (newComment.content.trim() !== "") {
      const userId = currentUser || uuidv1(customOptions); // uuidv1()로 사용자 ID 생성
      setCurrentUser(userId);
      const commentToAdd = {
        cameraId: parseInt(id!),
        content: newComment.content,
        authorId: userId || "",
        rating: newComment.rating, // Include rating
      };
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await fetch(`${apiUrl}/comments`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(commentToAdd),
        });
        if (!response.ok) {
          throw new Error("Failed to add comment");
        }
        const savedComment = await response.json();
        setComments([...comments, savedComment]);
        setNewComment({ content: "", authorId: "", rating: 0 }); // Reset rating
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    }
  };

  const handleEdit = (id: number) => {
    const commentToEdit = comments.find((comment) => comment.id === id);
    if (commentToEdit && commentToEdit.authorId === currentUser) {
      setEditingCommentId(id);
      setEditedCommentContent(commentToEdit.content);
    }
  };

  const handleEditComplete = async () => {
    if (editingCommentId !== null && editedCommentContent.trim() !== "") {
      const updatedComment = {
        content: editedCommentContent,
      };
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await fetch(`${apiUrl}/comments/${editingCommentId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedComment),
        });
        if (!response.ok) {
          throw new Error("Failed to edit comment");
        }
        const updatedComments = comments.map((comment) =>
          comment.id === editingCommentId
            ? { ...comment, content: editedCommentContent }
            : comment
        );
        setComments(updatedComments);
        setEditingCommentId(null);
        setEditedCommentContent("");
      } catch (error) {
        console.error("Error editing comment:", error);
      }
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${apiUrl}/comments/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete comment");
      }
      const updatedComments = comments.filter((comment) => comment.id !== id);
      setComments(updatedComments);
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
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
            value={newComment.rating} // Update to use newComment.rating
            onChange={(e) =>
              setNewComment({ ...newComment, rating: Number(e.target.value) })
            } // Update to handle rating input
            className="border rounded p-1"
            min="0"
            max="5"
          />
          <span className="ml-2">{newComment.rating} / 5</span>{" "}
          {/* Display the rating */}
        </div>
        <div className="mt-4">
          <h3 className="text-xl">Comments</h3>
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
            {comments.map((comment) => (
              <div key={comment.id} className="border-t pt-2">
                {editingCommentId === comment.id ? (
                  <input
                    type="text"
                    value={editedCommentContent}
                    onChange={(e) => setEditedCommentContent(e.target.value)}
                    className="border rounded p-2 w-full"
                  />
                ) : (
                  <div>
                    <p>{comment.rating} / 5</p>
                    <p>{comment.content}</p>
                  </div>
                )}
                {comment.authorId === currentUser && (
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
