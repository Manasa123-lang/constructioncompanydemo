import { Link } from "react-router-dom";

const Navbar = ({ scrolled }) => {
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        width: "100%",
        padding: "15px 30px",
        background: scrolled ? "#000" : "transparent",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <h2 style={{ color: "#fff" }}>MySite</h2>

      <div style={{ display: "flex", gap: "20px" }}>
        <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/about" style={linkStyle}>About</Link>
        <Link to="/services" style={linkStyle}>Services</Link>
        <Link to="/pricing" style={linkStyle}>Pricing</Link>
        <Link to="/projects" style={linkStyle}>Projects</Link>
        <Link to="/blog" style={linkStyle}>Blog</Link>
        <Link to="/faq" style={linkStyle}>FAQ</Link>
        <Link to="/contact" style={linkStyle}>Contact</Link>
      </div>
    </nav>
  );
};

const linkStyle = {
  color: "#fff",
  textDecoration: "none",
  fontSize: "14px",
};

export default Navbar;