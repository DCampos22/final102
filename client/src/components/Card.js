// src/components/Card.js

import './Card.css';
import more from './more.png';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const Card = ({ id, title, created_at, upvotes }) => {
  const [count, setCount] = useState(upvotes || 0); // Set initial count from the upvotes prop

  useEffect(() => {
    // Update localStorage whenever the count changes
    localStorage.setItem(`upvotes-${id}`, count);
  }, [count, id]);

  const updateCount = () => {
    setCount((prevCount) => prevCount + 1);
  };

  // Function to calculate time difference
  const timeAgo = (timestamp) => {
    const createdAt = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now - createdAt) / 1000);

    const days = Math.floor(diffInSeconds / (60 * 60 * 24));
    const hours = Math.floor((diffInSeconds % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((diffInSeconds % (60 * 60)) / 60);

    if (days > 0) return `${days} day${days === 1 ? '' : 's'} ago`;
    if (hours > 0) return `${hours} hour${hours === 1 ? '' : 's'} ago`;
    if (minutes > 0) return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
    return 'Just now';
  };

  return (
    <div className="Card">
      <Link to={`/edit/${id}`}>
        <img className="moreButton" alt="edit button" src={more} />
      </Link>

      <h4>Posted {timeAgo(created_at)}</h4>
      <h2 className="name">{title}</h2>

      <h5>Upvotes: {count}</h5>

      <button className="upvote" onClick={updateCount}>
        Upvote
      </button>

      <Link to={`/crewmate/${id}`}>
        <button>View More</button>
      </Link>
    </div>
  );
};

export default Card;
