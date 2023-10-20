import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import useGetComponents from "./useGetComponents";

const callerId = Math.floor(100000 + Math.random() * 900000).toString();

const App = () => {
	const [page, setPage] = useState("join");

	const otherUserId = useRef(null);

	const socket = io("http://localhost:3001", {
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

	const [localStream, setLocalStream] = useState(null);
	const [remoteStream, setRemoteStream] = useState(null);

	const COMPONENT = useGetComponents(
		callerId,
		otherUserId,
		setPage,
		socket,
		peerConnection,
		localStream,
		remoteStream
	);

	useEffect(() => {
		socket.on("callOffer", async ({ callerId, offer }) => {
			otherUserId.current = callerId;

			const remoteOffer = new RTCSessionDescription(offer);
			await peerConnection.current.setRemoteDescription(remoteOffer);

			setPage("incoming");
		});

		socket.on("callAccepted", async ({ answer }) => {
			const remoteAnswer = new RTCSessionDescription(answer);
			await peerConnection.current.setRemoteDescription(remoteAnswer);

			setPage("callroom");
		});

		socket.on("ICECandidate", ({ candidate }) => {
			const iceCandidate = new RTCIceCandidate(candidate);
			if (peerConnection.current) {
				peerConnection.current.addIceCandidate(iceCandidate);
			}
		});

		navigator.mediaDevices
			.getUserMedia({ audio: true, video: true })
			.then((userStream) => {
				setLocalStream(userStream);

				userStream.getTracks().forEach((track) => {
					peerConnection.current.addTrack(track, userStream);
				});
			});

		peerConnection.current.onicecandidate = (event) => {
			if (event.candidate) {
				socket.emit("ICECandidate", {
					calleeId: otherUserId.current,
					candidate: event.candidate,
				});
			}
		};

		peerConnection.current.ontrack = (event) => {
			const [stream] = event.streams;
			setRemoteStream(stream);
		};

		return () => {
			socket.off("callOffer");
			socket.off("callAccepted");
			socket.off("ICECandidate");
		};
	}, []);

	return COMPONENT[page];
};

export default App;
