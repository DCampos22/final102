import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../client';

const InfoCrewmate = () => {
  const { id } = useParams(); // Get the ID from the URL
  const [post, setPost] = useState(null);

  useEffect(() => {
    // Fetch the post data from the database using the ID
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from('Posts') // Replace with your actual table name
        .select('*')
        .eq('id', id)
        .single(); // Single returns one object instead of an array

      if (error) {
        console.error("Error fetching post:", error);
      } else {
        setPost(data);
      }
    };

    fetchPost();
  }, [id]); // Runs every time the id in the URL changes

  if (!post) return <div>Loading...</div>;

  return (
    <div className="PostInfo">
      <h2>{post.title}</h2>
      {/* Conditionally render content and img_url */}
      {post.content && <p>{post.content}</p>}
      {post.img_url && <img src={post.img_url} alt={post.title} />}
    </div>
  );
};

export default InfoCrewmate;
