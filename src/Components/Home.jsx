import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Home.css";
import SidebarCategories from "./Sidebar";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://soma.rkmvivekatirtha.org/wp-json/wp/v2/posts?_embed")
      .then((response) => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Failed to load posts.");
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="home-container">
     
      <section className="news-grid">
        {posts.map((post) => {
          const featuredMedia =
            post._embedded &&
            post._embedded["wp:featuredmedia"] &&
            post._embedded["wp:featuredmedia"][0];
          const imageUrl = featuredMedia?.source_url;

          return (
            <article className="news-card" key={post.id}>
              {imageUrl && (
                <img className="news-image" src={imageUrl} alt={post.title.rendered} />
              )}
              <div className="news-content">
                <h2
                  className="news-title"
                  dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                />
               <div
  className="news-excerpt"
  dangerouslySetInnerHTML={{
    __html: post.excerpt.rendered.slice(0,150) + (post.excerpt.rendered.length > 150 ? '...' : '')

  }}
/>
                <Link to={`/news/${post.id}`} className="read-more-btn">
                  Read More
                </Link>
              </div>
            </article>
          );
        })}
      </section>
      <section className="sidebarmain">
        <SidebarCategories />
      </section>
    </div>
  );
};

export default Home;
