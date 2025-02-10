import React, { useState, useEffect } from 'react';

const PostsByCategory = ({ categoryId }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `https://soma.rkmvivekatirtha.org/wp-json/wp/v2/posts?categories=${categoryId}`
        );
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [categoryId]);

  if (loading) {
    return <p>Loading posts...</p>;
  }

  return (
    <div className="details-container">
      <article className="details-card">
      <h2>Posts in Category {categoryId}</h2>
      {posts.length > 0 ? (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <h2>{post.title.rendered}</h2>
              <div
                dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p>No posts found.</p>
      )}
      </article>
    </div>
  );
};

export default PostsByCategory;