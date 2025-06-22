import React from "react";

const WhatsAppButton = () => {
  const phoneNumber = "+6281284777955"; // Replace with your phone number
  const message = `
  Hello, I have a question
  
sadfasfdsa
  `; // Default message

  const handleClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      style={{
        backgroundColor: "#25D366",
        color: "white",
        padding: "10px 15px",
        border: "none",
        borderRadius: "5px",
      }}
    >
      Send WhatsApp Message
    </button>
  );
};

export default WhatsAppButton;
