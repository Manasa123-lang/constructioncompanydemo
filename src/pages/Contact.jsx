import SectionHeading from "../components/common/SectionHeading";

const Contact = () => {
  return (
    <div className="pt-16">
      <SectionHeading title="Contact Us" />
      
      <form style={{ maxWidth: "400px" }}>
        <input type="text" placeholder="Name" style={inputStyle} />
        <input type="email" placeholder="Email" style={inputStyle} />
        <textarea placeholder="Message" style={inputStyle}></textarea>
        <button type="submit" style={buttonStyle}>Send</button>
      </form>
    </div>
  );
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
};

const buttonStyle = {
  padding: "10px 20px",
  background: "#facc15",
  border: "none",
  cursor: "pointer",
};

export default Contact;