import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './HomePage.css'; // 👈 Make sure this file exists



const HomePage = () => {
  const [classrooms, setClassrooms] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchClassrooms = async () => {
      try {
        const res = await axios.get('http://localhost:5000/class/available');
        if (res.data.success) {
            setClassrooms(res.data.data);
        } else {
            setClassrooms([]);
        }

      } catch (err) {
        console.error('Error fetching classrooms:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchClassrooms();
  }, []);

  return (
    <div className="homepage-container">
      <h1 className="homepage-title">Available Classrooms</h1>

      {loading ? (
        <p className="loading-text">Loading classrooms...</p>
      ) : classrooms.length === 0 ? (
        <p className="no-classrooms">No classrooms available.</p>
      ) : (
        <div className="classroom-grid">
          {classrooms.map((classroom) => (
            <div key={classroom._id} className="classroom-card">
              <h2 className="classroom-name">{classroom.name}</h2>
              <p className="classroom-desc">{classroom.description}</p>
              <p className="classroom-owner">
                Created by: {classroom.owner?.email || 'N/A'}
              </p>
              <button className="join-button">Join Class</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
