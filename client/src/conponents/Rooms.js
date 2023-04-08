import { useEffect, useState } from "react";
import axios from "axios";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { Button, TextField } from "@mui/material";

const Rooms = ({ socket, onRoomSelected }) => {
  const [rooms, setRooms] = useState([""]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [roomName, setRoomName] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    (async () => {
      await fetchRooms();
    })();
  }, []);

  socket.on("rooms", (data) => {
    console.log("received rooms", data.rooms);
    setRooms(data.rooms);
  });

  const fetchRooms = async () => {
    try {
      socket.emit("fetch-rooms");
      //   const rooms = await axios.get("/api/rooms");
    } catch (e) {
      console.log("something went wrong");
    }
  };

  const handleRoomChange = (e) => {
    console.log(e.target.value);
    setSelectedRoom(e.target.value);
  };

  const handleJoinRoom = (e) => {
    console.log(e.target.value);
    //TODO: implement
  };

  const handleSubmitNewRoom = async (e) => {
    try {
      //   await axios.post("/api/rooms", {
      //     name: newRoomName,
      //   });
      if (!roomName) return;
      socket.emit("join-room", roomName);
      onRoomSelected({ roomName, username });
      setRoomName("");
      await fetchRooms();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Rooms</h2>

      {/* <InputLabel id="demo-simple-select-label">Rooms</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectedRoom}
        label="Rooms"
        onChange={handleRoomChange}
      >
        {rooms.map((room) => {
          return <MenuItem value={room}>{room}</MenuItem>;
        })}
      </Select>
      <Button onClick={handleJoinRoom}>Join Room</Button> */}
      <div style={styles.verticalContainer}>
        <h4>create a new room</h4>
        <TextField
          id="standard-basic"
          label="User Name"
          variant="standard"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          style={{ marginTop: "10px", width: "40%" }}
          value={username}
          placeholder="User Name"
        />
        <TextField
          id="standard-basic"
          label="Room Name"
          variant="standard"
          onChange={(e) => {
            setRoomName(e.target.value);
          }}
          value={roomName}
          style={{ marginTop: "10px", width: "40%" }}
          placeholder="Room Name"
        />
        <Button
          style={{ marginTop: "20px", width: "100%", alignSelf: "flex-start" }}
          onClick={handleSubmitNewRoom}
        >
          create a room
        </Button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#F6F6F6",
    flex: 1,
  },
  verticalContainer: {
    display: "flex",
    flexDirection: "column",
  },
};

export default Rooms;
