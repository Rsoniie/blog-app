import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CommentsPage = ({ blogId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  
  useEffect(() => {
    // Fetch comments when the component loads
    const fetchComments = async () => {
      try {
        const response = await axios.get(`${API_URL}/comments/${blogId}`);
        setComments(response.data.comments);
      } catch (error) {
        console.error("Error fetching comments", error);
      }
    };

    fetchComments();
  }, [blogId]);

  const handleAddComment = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_URL}/comments/${blogId}`,
        { comment: newComment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setComments([...comments, response.data.comment]);
      setNewComment(''); // Clear the input after adding a comment
    } catch (error) {
      console.error("Error adding comment", error);
    }
  };

  return (
    <div style={{ position: 'relative', height: '100vh' }}>
      {/* Scrollable container for comments */}
      <div style={{ maxHeight: 'calc(100vh - 60px)', overflowY: 'scroll', padding: '20px' }}>
        <h2>Comments</h2>
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <div key={index} style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
              <p>{comment}</p>
            </div>
          ))
        ) : (
          <p>No comments yet.</p>
        )}
      </div>

      {/* Sticky add comment button */}
      <div style={{ position: 'fixed', bottom: '20px', left: '0', width: '100%', display: 'flex', justifyContent: 'center' }}>
        <button onClick={() => setNewComment(prompt("Add a new comment:"))} style={buttonStyle}>
          Add Comment
        </button>
      </div>

      {/* Add comment functionality (opens a prompt to add a comment) */}
      {newComment && (
        <div style={{ position: 'fixed', bottom: '70px', width: '100%', padding: '10px', backgroundColor: '#fff', boxShadow: '0px -1px 5px rgba(0,0,0,0.1)' }}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows={3}
            style={{ width: '100%', padding: '10px' }}
          />
          <button onClick={handleAddComment} style={{ marginTop: '10px' }}>
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

const buttonStyle = {
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};
