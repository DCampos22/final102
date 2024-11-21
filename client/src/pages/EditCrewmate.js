import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../client';
import './EditCrewmate.css'; // Ensure you have the proper styling

const EditCrewmate = ({ data }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({
    id: null,
    title: '',
    content: '',
    img_url: ''
  });

  useEffect(() => {
    // Find the post based on the id passed in the URL params
    const foundPost = data.find((p) => p.id === parseInt(id)); // Ensure id comparison is correct
    if (foundPost) {
      setPost(foundPost);
    }
  }, [id, data]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPost((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { error } = await supabase
      .from('Posts') // Adjust the table name if necessary
      .update({
        title: post.title,
        content: post.content,
        img_url: post.img_url
      })
      .eq('id', parseInt(id));

    if (error) {
      console.error('Error updating post:', error);
    } else {
      console.log('Post updated successfully');
      navigate('/'); // Navigate to home after successful update
    }
  };

  const handleDelete = async () => {
    const { error } = await supabase
      .from('Posts')
      .delete()
      .eq('id', parseInt(id));

    if (error) {
      console.error('Error deleting post:', error);
    } else {
      console.log('Post deleted successfully');
      navigate('/'); // Navigate to home after successful delete
    }
  };

  return (
    <div className="EditPost">
      <h2>Edit Post</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label><br />
        <input
          type="text"
          id="title"
          name="title"
          value={post.title}
          onChange={handleChange}
          required
        /><br /><br />

        <label htmlFor="content">Content</label><br />
        <textarea
          id="content"
          name="content"
          value={post.content || ''} // Handle content being optional
          onChange={handleChange}
        /><br /><br />

        <label htmlFor="img_url">Image URL</label><br />
        <input
          type="text"
          id="img_url"
          name="img_url"
          value={post.img_url || ''} // Handle img_url being optional
          onChange={handleChange}
        /><br /><br />

        <button type="submit" className="updateButton">Update Post</button>
        <button type="button" className="deleteButton" onClick={handleDelete}>Delete Post</button>
      </form>
    </div>
  );
};

export default EditCrewmate;
