import React, { useState } from 'react';
import './CreateCrewmate.css';
import { supabase } from '../client';

const CreateCrewmate = ({ addPost }) => {
    const [post, setPost] = useState({
        title: "",
        content: "",
        img_url: ""
    });

    // Handle input field changes
    const handleChange = (event) => {
        const { name, value } = event.target;
        setPost((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // Create a new post by inserting into the database
    const createPost = async (event) => {
        event.preventDefault();

        // Insert the post data into the Supabase table
        const { data, error } = await supabase
            .from('Posts') // Replace 'Posts' with your actual table name
            .insert([{ 
                title: post.title, 
                content: post.content || null, // Use null if content is empty
                img_url: post.img_url || null  // Use null if img_url is empty
            }])
            .select();

        if (error) {
            console.error("Error inserting post:", error);
        } else {
            console.log("Post inserted successfully:", data);
            // Add the new post to the list in the parent component
            addPost(data[0]); // Assuming data[0] is the new post
            // Redirect after successful submission
            window.location = "/"; // Redirect to the home page or another page
        }
    };

    return (
        <div>
            <form onSubmit={createPost}>
                <label htmlFor="title">Title</label><br />
                <input 
                    type="text" 
                    id="title" 
                    name="title" 
                    value={post.title} 
                    onChange={handleChange} 
                    required 
                /><br /><br />

                <label htmlFor="content">Content (optional)</label><br />
                <textarea 
                    id="content" 
                    name="content" 
                    value={post.content} 
                    onChange={handleChange} 
                /><br /><br />

                <label htmlFor="img_url">Image URL (optional)</label><br />
                <input 
                    type="url" 
                    id="img_url" 
                    name="img_url" 
                    value={post.img_url} 
                    onChange={handleChange} 
                /><br /><br />

                <input type="submit" value="Submit Post" />
            </form>
        </div>
    );
};

export default CreateCrewmate;
