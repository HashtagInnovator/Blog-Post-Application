import React, { useState, useEffect } from "react";
import axios from 'axios';

export default function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3010/posts') // Adjust the URL if needed
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  // Function to truncate text to a fixed number of words
  const truncateText = (text, limit) => {
    const words = text.split(' ');
    if (words.length > limit) {
      return words.slice(0, limit).join(' ') + '...';
    }
    return text;
  };

  // Retrieve the user information from localStorage

  return (
    <div className="cards-container">
      {posts.map((post) => (
        <div key={post.id} className="card">
          <img src={post.image} className="card-img-top" alt={post.title} />
          <div className="card-body">
            <h5 className="card-title">{post.title}</h5>
            <p className="card-text">{truncateText(post.description, 10)}</p>
            <a href={`/desc/${post.id}`} className="btn btn-primary">
              READ
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
