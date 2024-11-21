import React, { useState} from 'react';
import { useParams } from 'react-router-dom';

const UniqueCrewmate = ({ crewmates }) => {
  const { id } = useParams(); // Access the 'id' parameter from the URL

  // Find the crewmate based on the 'id' parameter
  const crewmate = crewmates.find((crewmate) => crewmate.id === parseInt(id));

  // Initialize state for count (optional based on your use case)
  const [count, setCount] = useState(crewmate ? crewmate.upvotes || 0 : 0); // Initialize with upvotes from database

  // Early return check if crewmate doesn't exist
  if (!crewmate) {
    return <div>Crewmate not found</div>;
  }

  // Update upvote count
  const updateCount = () => {
    setCount((prevCount) => prevCount + 1);
  };

  return (
    <div className="unique-crewmate">
      <h2>{crewmate.title}</h2>
      <p>{crewmate.content || "No content available"}</p>
      {crewmate.img_url && <img src={crewmate.img_url} alt={crewmate.title} />}
      
    </div>
  );
};

export default UniqueCrewmate;
