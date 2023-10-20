import React, { useEffect, useRef } from "react";
import "./styles.css";

const Callroom = ({ localStream, remoteStream }) => {
	const localRef = useRef(null);
	const remoteRef = useRef(null);

	useEffect(() => {
		if (localRef.current && localStream) {
			localRef.current.srcObject = localStream;
		}
	}, [localStream]);

	useEffect(() => {
		if (remoteRef.current && remoteStream) {
			remoteRef.current.srcObject = remoteStream;
		}
	}, [remoteStream]);

	return (
		<div className="main">
			<video
				ref={remoteRef}
				className="remote_video"
				autoPlay
				playsInline
			></video>
			<video
				ref={localRef}
				className="local_video"
				autoPlay
				playsInline
			></video>
		</div>
	);
};

export default Callroom;
