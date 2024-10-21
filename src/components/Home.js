import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import blogService from '../services/blogService'; // Assuming you have this API service
import BlogCard from './BlogCard'; // BlogCard component
import './Home.css'; // Import the CSS for styling

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState(null);  // Error state
  const [userId, setUserId] = useState(null);  // Store logged-in user ID
  const navigate = useNavigate(); // Get navigate function for navigation

  useEffect(() => {
    const loggedInUserId = localStorage.getItem('userId');
    if (loggedInUserId) {
      setUserId(loggedInUserId); // Set the userId from localStorage
    } else {
      console.warn('No userId found in localStorage');
    }

    const fetchBlogs = async () => {
      try {
        const res = await blogService.getAllBlogs();
        setBlogs(res.data.allblogs || []);  // Adjust according to your API structure
      } catch (err) {
        setError('Failed to fetch blogs');
      } finally {
        setLoading(false);  // Stop loading once the data is fetched
      }
    };
    fetchBlogs();
  }, []);

  // Handle logout and clear localStorage
  const handleLogout = () => {
    localStorage.removeItem('token');  // Remove token from localStorage
    localStorage.removeItem('userId');  // Remove userId from localStorage
    alert('Logged out successfully!');
    navigate('/login');  // Redirect to login page after the alert
  };

  return (
    <div>
      {/* Sticky Header */}
      <header className="sticky-header">
        <div className="header-content">
          <h2 className="header-title">Blogging Platform</h2>
          <button className="logout-button" onClick={handleLogout}>
            &#x2190; Logout
          </button>
        </div>
      </header>

      {/* Blog Content */}
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '32px', marginBottom: '20px' }}>All Blogs</h1>

        {loading ? (
          <p style={{ fontSize: '18px', color: '#999' }}>Loading blogs...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : blogs.length > 0 ? (
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '20px',
          }}>
            {blogs.map((blog) => (
              <BlogCard 
                blogId={blog._id} 
                blogUser={blog.user}        // Pass the blog user as prop
                blogHeading={blog.blog_heading}  // Pass blog_heading as prop
                blogBody={blog.blog_body} 
                initialLikes={blog.likes}   // Pass the likes count as prop
                userId={userId}             // Pass the logged-in userId as prop
              />
            ))}
          </div>
        ) : (
          <p style={{ fontSize: '18px', color: '#555' }}>No blogs available</p>
        )}
      </div>
    </div>
  );
};

export default Home;
