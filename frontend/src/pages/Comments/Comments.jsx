import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../services/api";

function Comments({ taskId }) {

    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState("");
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [editingText, setEditingText] = useState("");

    const fetchComments = async () => {

        try {

            const response = await api.get(
                `/comments/${taskId}`
            );

            setComments(response.data.comments);

        }
        catch (error) {

            console.log(error);

            toast.error(
                error.response?.data?.message ||
                "Failed to load comments"
            );

        }
        finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        if (taskId) {
            fetchComments();
        }

    }, [taskId]);

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!commentText.trim()) {

            toast.error("Comment is required");

            return;

        }

        try {

            await api.post("/comments", {
                task: taskId,
                text: commentText,
            });

            toast.success("Comment added successfully");

            setCommentText("");

            fetchComments();

        }
        catch (error) {

            console.log(error);

            toast.error(
                error.response?.data?.message ||
                "Failed to add comment"
            );

        }

    };

    if (loading) {

        return (
            <section className="comments-section">

                <h2>
                    Comments
                </h2>

                <p>
                    Loading comments...
                </p>

            </section>
        );

    }

    const handleEdit = async (commentId) => {

        if (!editingText.trim()) {
            toast.error("Comment is required");
            return;
        }

        try {

            await api.put(`/comments/${commentId}`, {
                text: editingText,
            });

            toast.success("Comment updated successfully");

            setEditingId(null);
            setEditingText("");

            fetchComments();

        }
        catch (error) {

            console.log(error);

            toast.error(
                error.response?.data?.message ||
                "Failed to update comment"
            );

        }

    };

    const handleDelete = async (commentId) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this comment?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            await api.delete(`/comments/${commentId}`);

            toast.success("Comment deleted successfully");

            fetchComments();

        }
        catch (error) {

            console.log(error);

            toast.error(
                error.response?.data?.message ||
                "Failed to delete comment"
            );

        }

    };

    return (
        <section className="comments-section">

            <div className="comments-header">

                <div>

                    <h2>
                        Comments
                    </h2>

                    <p>
                        Discuss this task with your team.
                    </p>

                </div>

            </div>

            {/* Add Comment */}

            <form
                onSubmit={handleSubmit}
                className="comment-form"
            >

                <textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Write a comment..."
                    rows="4"
                />

                <button type="submit">
                    Add Comment
                </button>

            </form>

            {/* Comments List */}

            <div className="comments-list">

                {comments.length === 0 ? (

                    <div className="empty-state">

                        <h3>
                            No comments yet
                        </h3>

                        <p>
                            Be the first to comment on this task.
                        </p>

                    </div>

                ) : (

                    comments.map((comment) => (

                        <div
                            className="comment-card"
                            key={comment._id}
                        >

                            <div className="comment-header">

                                <strong>
                                    {comment.user?.name || "User"}
                                </strong>

                                <span>
                                    {comment.createdAt
                                        ? new Date(comment.createdAt).toLocaleString()
                                        : ""}
                                </span>

                            </div>

                            {editingId === comment._id ? (

                                <div className="comment-edit">

                                    <textarea
                                        value={editingText}
                                        onChange={(e) => setEditingText(e.target.value)}
                                        rows="3"
                                    />

                                    <div className="comment-actions">

                                        <button
                                            onClick={() => handleEdit(comment._id)}
                                        >
                                            Save
                                        </button>

                                        <button
                                            onClick={() => {
                                                setEditingId(null);
                                                setEditingText("");
                                            }}
                                        >
                                            Cancel
                                        </button>

                                    </div>

                                </div>

                            ) : (

                                <>
                                    <p>
                                        {comment.text}
                                    </p>

                                    <div className="comment-actions">

                                        <button
                                            onClick={() => {
                                                setEditingId(comment._id);
                                                setEditingText(comment.text);
                                            }}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() => handleDelete(comment._id)}
                                        >
                                            Delete
                                        </button>

                                    </div>
                                </>

                            )}

                        </div>

                    ))

                )}

            </div>

        </section>
    );

}

export default Comments;