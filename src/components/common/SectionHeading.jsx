const SectionHeading = ({ title }) => {
  return (
    <h2
      style={{
        fontSize: "32px",
        fontWeight: "bold",
        marginBottom: "20px",
        color: "#fff",
      }}
    >
      {title}
    </h2>
  );
};

export default SectionHeading;