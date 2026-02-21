import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/NewProject";
import About from "./pages/About";
import Contact from "./pages/Contact";
import "./App.css";
import Requirements from "./pages/Requirements";
import Methodology from "./pages/Methodology";
import Architecture from "./pages/Architecture";

function App() {
  return (
    <Router>
      <Navbar />   {/* 👈 THIS makes navbar visible */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/requirements" element={<Requirements />} />
        <Route path="/methodology" element={<Methodology />} />
        <Route path="/architecture" element={<Architecture />} />

      </Routes>
    </Router>
  );
}

export default App;
