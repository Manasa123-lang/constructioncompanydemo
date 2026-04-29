const SectionLabel = ({ text }) => {
  return (
    <p
      style={{
        color: "#facc15",
        fontWeight: "bold",
        letterSpacing: "1px",
        marginBottom: "10px",
      }}
    >
      {text}
    </p>
  );
};

export default SectionLabel;