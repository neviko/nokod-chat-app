import { Button, Input } from "@mui/material";
import { useState, useEffect } from "react";
import Message from "./Message";

const Chat = ({ socket, room, username }) => {
  const [sendMessage, setSendMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("message-from-server", (msg) => {
      setMessages((oldMessages) => [...oldMessages, msg]);
    });
    return () => {
      socket.off("message-from-server");
    };
  }, []);

  const handleSendClick = async () => {
    if (!sendMessage) return;
    if (!room) return;

    const message = {
      text: sendMessage,
      roomId: room,
      timestamp: new Date().toLocaleTimeString("en-GB", {
        hour: "numeric",
        minute: "numeric",
      }),
      sender: username,
    };
    try {
      await socket.emit("new-message", message);
      setMessages((oldMessages) => [...oldMessages, message]);
      setSendMessage("");
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div style={styles.chat}>
      <h2 style={{ alignSelf: "center" }}>Room - {room}</h2>

      {messages.map((message) => {
        return (
          <Message
            text={message.text}
            bgColor={message.sender === username ? "pink" : "aqua"}
            isShiftRight={message.sender === username}
            sender={message.sender}
            timestamp={message.timestamp}
          />
        );
      })}

      <div style={styles.footerInput}>
        <Input
          title="Message"
          placeholder="Type a Message"
          value={sendMessage}
          onChange={(e) => setSendMessage(e.target.value)}
        />
        <Button onClick={handleSendClick}>SEND</Button>
      </div>
    </div>
  );
};

const styles = {
  chat: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#ECECEC",
    flex: 2,
    minHeight: "500px",
  },
  footerInput: {
    height: "25px",
    width: "100%",
    alignItems: "flex-start",
    alignSelf: "flex-end",
  },
};

export default Chat;
