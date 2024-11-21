// src/components/CrewmatesList.js

import React from 'react';
import Card from './Card';

const CrewmatesList = ({ crewmates }) => {
  return (
    <div>
      {crewmates.map((crewmate) => (
        <Card 
          key={crewmate.id} 
          id={crewmate.id} 
          title={crewmate.title} 
          created_at={crewmate.created_at} 
          upvotes={crewmate.upvotes}  // Passing upvotes here
        />
      ))}
    </div>
  );
};

export default CrewmatesList;
