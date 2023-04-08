import axios from "axios";
import { Routes, Route } from "react-router-dom";
import Chat from "./conponents/Chat";
import Rooms from "./conponents/Rooms";
import { io } from "socket.io-client";
import { useState } from "react";
// import Signup from "./pages/signup";

const socket = io("http://localhost:5000");
axios.defaults.baseURL = "http://localhost:5000";

function App() {
  const [selectedRoom, setSelectedRoom] = useState("NO ROOM SELECTED");
  const [userName, setUsername] = useState(null);
  return (
    <div style={{ display: "flex" }}>
      {/* <Routes>
        <Route path="signup" element={<Signup />} />
      </Routes> */}
      <Rooms
        socket={socket}
        onRoomSelected={({ roomName, username }) => {
          console.log("selected new room", roomName);
          setSelectedRoom(roomName);
          setUsername(username);
        }}
      />
      <Chat socket={socket} room={selectedRoom} username={userName} />
    </div>
  );
}

export default App;
