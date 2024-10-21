import React, { useState } from 'react';
import blogService from '../services/blogService';

const BlogForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await blogService.postBlog({ title, content });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} />
      <button type="submit">Post Blog</button>
    </form>
  );
};

export default BlogForm;
