import React, { useEffect, useState } from 'react';
import { supabase } from '../client';
import Card from '../components/Card';

const ReadCrewmate = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const { data, error } = await supabase
                .from('Posts') // Replace with your actual table name
                .select()
                .order('title', { ascending: true }); // Adjust ordering if needed

            if (error) {
                console.error('Error fetching posts:', error);
            } else {
                setPosts(data);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div className="ReadPosts">
            {
                posts && posts.length > 0 ? (
                    posts.map((post) => (
                        <Card 
                            key={post.id} 
                            id={post.id} 
                            title={post.title} 
                            content={post.content} // Optional
                            img_url={post.img_url} // Optional
                            upvotes={post.upvotes}
                            created_at={post.created_at}
                        />
                    ))
                ) : (
                    <h2>No Posts Available</h2>
                )
            }
        </div>
    );
};

export default ReadCrewmate;
