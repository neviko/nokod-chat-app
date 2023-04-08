import React from "react";

const Message = ({
  text,
  timestamp,
  roomId,
  sender,
  bgColor,
  isShiftRight,
}) => {
  return (
    <div
      style={{
        ...styles.message,
        backgroundColor: bgColor,
        alignSelf: isShiftRight ? "flex-end" : "flex-start",
      }}
    >
      <div style={styles.text}>{text}</div>
      <div style={styles.sender}>sent by: {sender}</div>
    </div>
  );
};

const styles = {
  message: {
    width: "fit-content",
    border: "8px",
    borderRadius: "10px 100px / 120px",
    margin: "20px",
    padding: "20px 20px",
    overflow: true,
  },
  text: {
    fontSize: "25px",
  },
  sender: {
    fontSize: "15px",
    color: "dark-gray",
  },
};
export default Message;
