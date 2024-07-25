import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar.js";
import Home from "./components/Home.js";
import About from "./components/About.js";
import Programs from "./components/Programs.js";
import Volunteer from "./components/Volunteer.js";
import Gallery from "./components/Gallery.js";
import Contact from "./components/Contact.js";
import Blog from "./components/Blog.js";
import SinglePost from "./components/SinglePost.js";
import Footer from "./components/Footer.js";
import "./css/Core.css";
import "./css/Footer.css";
import "./css/Navbar.css";
import "./css/Menu.css";
import "./css/Home.css";
import "./css/About.css";
import "./css/Contact.css";
import "./css/Volunteer.css";
import "./css/Programs.css";
import "./css/Gallery.css";
import "./css/Blog.css";
import "./css/Post.css";

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
          <Route element={<Volunteer />} path="/join" />
          <Route element={<Gallery />} path="/gallery" />
          <Route element={<Contact />} path="/contact" />
          <Route element={<Blog />} path="/blog" />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
