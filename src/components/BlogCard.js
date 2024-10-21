import React, { useState } from 'react';
import './BlogCard.css';
import blogService from '../services/blogService'; // Assuming you have this API service

const BlogCard = ({ blogId, blogUser, blogHeading, blogBody, initialLikes, userId }) => {
  const [likes, setLikes] = useState(initialLikes); // Initialize likes from props
  const [isLiked, setIsLiked] = useState(false); // Track if the user has liked the blog
  const [error, setError] = useState(null); // Track any errors during the API call

  // Handle "Like" button click
  const handleLike = async () => {
    if (isLiked) return; // Prevent multiple likes from the same user

    // Optimistic UI update: Increment the likes locally
    setLikes(likes + 1);
    setIsLiked(true);

    try {
      // Make API call to like the blog on the backend
      console.log("Before blogservice");
      console.log("userid from blogcards", userId);
      console.log("blogid before service", blogId);
      await blogService.likeBlog(blogId);
      console.log("After Blogservice");
    } catch (err) {
      // If the API call fails, revert the changes
      setLikes(likes); // Revert like count
      setIsLiked(false); // Allow the user to try again
      setError('Failed to like the blog'); // Set error message
    }
  };

  return (
    <div className="blog-card">
      <small className="blog-user">{blogUser}</small>
      <h2 className="blog-card-title">{blogHeading}</h2>
      <p className="blog-card-body">{`${blogBody.substring(0, 100)}...`}</p>
      <div className="blog-card-buttons">
        <button onClick={handleLike} disabled={isLiked}>
          {isLiked ? `Liked (${likes})` : `Like (${likes})`}
        </button>
        <button className="comment-btn" onClick={() => alert('Comments feature coming soon!')}>
          Comment
        </button>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error if any */}
    </div>
  );
};

export default BlogCard;
