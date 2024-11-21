import './App.css';
import React, { useState, useEffect } from 'react';
import { useRoutes, Link } from 'react-router-dom';
import ReadCrewmates from './pages/ReadCrewmate';
import CreateCrewmate from './pages/CreateCrewmate';
import EditCrewmate from './pages/EditCrewmate';
import InfoCrewmate from './pages/InfoCrewmate';
import { supabase } from './client'; // Ensure supabase client is imported
import UniqueCrewmate from './pages/UniqueCrewmate';

const App = () => {
  const [crewmates, setCrewmates] = useState([]);

  const fetchCrewmates = async () => {
    const { data, error } = await supabase
      .from('Posts')
      .select()
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching posts:', error);
    } else {
      setCrewmates(data);
    }
  };

  useEffect(() => {
    fetchCrewmates(); // Fetch crewmates on mount
  }, []);

  const addCrewmate = (newCrewmate) => {
    setCrewmates((prevCrewmates) => [...prevCrewmates, newCrewmate]);
  };

  let element = useRoutes([
    { path: "/", element: <ReadCrewmates crewmates={crewmates} /> },
    { path: "/edit/:id", element: <EditCrewmate data={crewmates} /> },
    { path: "/new", element: <CreateCrewmate addCrewmate={addCrewmate} fetchCrewmates={fetchCrewmates} /> },
    { path: "/crewmate/:id", element: <UniqueCrewmate crewmates={crewmates} /> },
  ]);

  return (
    <div className="App">
      <div className="navbar">
        <div className="navbar-left">
          <h1>HistoryHub</h1>
        </div>
        <div className="navbar-center">
          <input type="text" placeholder="Search..." className="search-bar" />
        </div>
        <div className="navbar-right">
          <Link to="/">
            <button className="nav-btn">Home</button>
          </Link>
          <Link to="/new">
            <button className="nav-btn">Create New Post</button>
          </Link>
        </div>
      </div>
      {element}
    </div>
  );
};

export default App;
