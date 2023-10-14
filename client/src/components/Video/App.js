import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import useGetComponents from "./useGetComponents";

const App = () => {
	const [page, setPage] = useState("join");

	const [callerId] = useState(
		Math.floor(100000 + Math.random() * 900000).toString()
	);
	const otherUserId = useRef(null);

	const COMPONENT = useGetComponents(callerId, otherUserId, setPage);

	const [localStream, setLocalStream] = useState(null);
	const [remoteStream, setRemoteStream] = useState(null);

	const socket = io("http://localhost:3001", {
		transports: ["websockets"],
		query: {
			callerId,
		},
	});

	const peerConnection = useRef(
		new RTCPeerConnection({
			iceServers: [
				{
					urls: "stun:stun.l.google.com:19302",
				},
				{
					urls: "stun:stun1.l.google.com:19302",
				},
				{
					urls: "stun:stun2.l.google.com:19302",
				},
			],
		})
	);

	useEffect(() => {
		socket.on("newCall", (data) => {});

		socket.on("callAnswered", (data) => {});

		socket.on("ICECandidate", (data) => {});
	});

	return COMPONENT[page];
};

export default App;
