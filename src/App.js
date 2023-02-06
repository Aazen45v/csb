import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get(
        "https://techcrunch.com/wp-json/wp/v2/posts?per_page=30&context=embed"
      );
      setPosts(res.data);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  return (
    <div className="container">
      {loading ? (
        <p>Loading...</p>
      ) : (
        posts.map((post) => (
          <div className="card" key={post.id}>
            <img
              src={post.jetpack_featured_media_url}
              alt={post.title.rendered}
            />
            <h3>{post.title.rendered}</h3>
            <p>{post.excerpt.rendered}</p>
            <a href={post.link} target="_blank" rel="noopener noreferrer">
              Read More
            </a>
          </div>
        ))
      )}
    </div>
  );
}

export default App;
