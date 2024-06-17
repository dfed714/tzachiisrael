import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/testNavbar.js";
import Home from "./components/Home.js";
import About from "./components/About.js";
import Programs from "./components/Programs.js";
import Volunteer from "./components/Volunteer.js";
import Gallery from "./components/Gallery.js";
import Contact from "./components/Contact.js";
import Post from "./components/Post.js";
import Blog from "./components/Blog.js";
import SinglePost from "./components/SinglePost.js";
import Footer from "./components/Footer.js";
import "./components/Menu.css";
import "./components/Navbar.css";
import "./components/Core.css";

function App() {
  return (
    <Router basename="/">
      <Navbar />
      <main>
        <Routes>
          <Route element={<Home />} path="/" exact />
          <Route element={<About />} path="/about" />
          <Route element={<Programs />} path="/programs" />
          <Route element={<SinglePost />} path="/post/:slug" />
          <Route element={<Post />} path="/post" />
          <Route element={<Volunteer />} path="/volunteer" />
          <Route element={<Gallery />} path="/gallery" />
          <Route element={<Contact />} path="/contact" />
          <Route element={<Blog />} path="/blog" />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
