import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";

const About = () => {
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://soma.rkmvivekatirtha.org/wp-json/wp/v2/pages?_embed")
      .then((response) => {
        const aboutPage = response.data.find(
          (page) => page.slug === "about-us"
        );
        if (aboutPage) {
          setPage(aboutPage);
        } else {
          setError("Page not found.");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Failed to load content.");
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  const featuredMedia =
    page._embedded &&
    page._embedded["wp:featuredmedia"] &&
    page._embedded["wp:featuredmedia"][0];
  const imageUrl = featuredMedia?.source_url;

  return (
    <div className="home-container">
      <section>
        <article>
        <h2 dangerouslySetInnerHTML={{ __html: page.title.rendered }} />
          <div className="inner-img">
          {imageUrl && <img src={imageUrl} alt={page.title.rendered} />}
          </div>
          <div className="inner-cont">
            <div dangerouslySetInnerHTML={{ __html: page.content.rendered }} />
          </div>
        </article>
      </section>
    </div>
  );
};

export default About;