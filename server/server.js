const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const cors = require("cors");
const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socketIO(server, {
	cors: {
		origin: "http://localhost:3000",
		methods: ["GET", "POST"],
		allowedHeaders: ["my-custom-header"],
		credentials: true,
	},
});

var userConnections = {};

io.on("connection", (socket) => {
	socket.on("join", ({ username, friend }) => {
		const roomName = [username, friend].sort().join("-");

		socket.join(roomName);
		userConnections[socket.id] = { username, roomName };

		const usersInRoom = Object.values(userConnections).filter(
			(user) => user.roomName === roomName
		);

		if (usersInRoom.length === 2) {
			console.log(userConnections);
			io.to(roomName).emit("bothUsersConnected");
		}
	});

	socket.on("sendMessage", (message) => {
		const { username, roomName } = userConnections[socket.id];
		io.to(roomName).emit("receiveMessage", {
			user: username,
			text: message,
		});
	});

	socket.on("disconnect", () => {
		console.log("user disconnected");

		const { roomName } = userConnections[socket.id] || {};
		io.to(roomName).emit("friendDisconnected");

		delete userConnections[socket.id];
	});
});

server.listen(3001, () => console.log("listening on port 3001"));
