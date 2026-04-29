const Footer = () => {
  return (
    <footer
      style={{
        background: "#111",
        color: "#fff",
        textAlign: "center",
        padding: "20px",
        marginTop: "50px",
      }}
    >
      <p>© {new Date().getFullYear()} MySite. All rights reserved.</p>
    </footer>
  );
};

export default Footer;