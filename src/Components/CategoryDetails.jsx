import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const CategoryDetails = () => {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`https://soma.rkmvivekatirtha.org/wp-json/wp/v2/posts?categories=${id}`)
      .then((response) => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to load posts.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading posts...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="articledetail">
      <h2>Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link to={`/news/${post.id}`}>{post.title.rendered}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryDetails;
