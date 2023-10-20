const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const cors = require("cors");
const app = express();
app.use(cors());

const httpServer = http.createServer(app);

const io = new Server(httpServer, {
	cors: {
		origin: "http://localhost:3000",
		methods: ["GET", "POST"],
		allowedHeaders: ["my-custom-header"],
		credentials: true,
	},
});

io.use((socket, next) => {
	if (socket.handshake.query) {
		socket.user = socket.handshake.query.callerId;
		next();
	}
});

io.on("connection", (socket) => {
	socket.join(socket.user);

	socket.on("call", (data) => {
		const { calleeId, offer } = data;
		console.log("offer");
		socket.to(calleeId).emit("callOffer", {
			callerId: socket.user,
			offer,
		});
	});

	socket.on("acceptCall", (data) => {
		const { callerId, answer } = data;
		console.log("call accepted");
		socket.to(callerId).emit("callAccepted", {
			answer,
		});
	});

	socket.on("ICECandidate", (data) => {
		const { calleeId, candidate } = data;

		console.log("ice candidate:", socket.user);

		socket.to(calleeId).emit("ICECandidate", {
			callerId: socket.user,
			candidate,
		});
	});
});

httpServer.listen(3001, () => {
	console.log("listening on port 3001!");
});

io;
