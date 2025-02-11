import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import Home from "./Components/Home";
import NewsDetails from "./Components/NewsDetails";
import About from "./Components/About";
import Footer from "./Components/Footer";
import Contact from "./Components/Contact";
import Categories from "./Components/Categories";
import CategoryDetails from "./Components/CategoryDetails";
import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <header className="app-header">
          <div className="Logo">
            <img src="https://soma.rkmvivekatirtha.org/wp-content/uploads/2025/02/Logo.png" alt="Logo" />
          </div>
          <nav className="app-nav">
            <NavLink to="/" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")} end>
              Home
            </NavLink>
            <NavLink to="/about-us" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")} end>
              About
            </NavLink>
            <NavLink to="/contact-us" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")} end>
              Contact Us
            </NavLink>
            {/* <NavLink to="/categories" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")} end>
              Categories
            </NavLink> */}
          </nav>
        </header>
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about-us" element={<About />} />
            <Route path="/contact-us" element={<Contact />} />
            <Route path="/news/:id" element={<NewsDetails />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/category/:id" element={<CategoryDetails />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
