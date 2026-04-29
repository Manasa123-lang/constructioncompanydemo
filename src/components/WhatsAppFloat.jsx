const WhatsAppFloat = () => {
  return (
    <a
      href="https://wa.me/919999999999"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        background: "#25D366",
        color: "#fff",
        padding: "12px 16px",
        borderRadius: "50px",
        textDecoration: "none",
        fontWeight: "bold",
        zIndex: 1000,
      }}
    >
      WhatsApp
    </a>
  );
};

export default WhatsAppFloat;