import React from "react";

import Join from "./Join/Join";
import Outgoing from "./Outgoing/Outgoing";
import Incoming from "./Incoming/Incoming";
import Callroom from "./Callroom/Callroom";

const useGetComponents = (
	callerId,
	otherUserId,
	setPage,
	socket,
	peerConnection,
	localStream,
	remoteStream
) => ({
	join: (
		<Join
			callerId={callerId}
			otherUserId={otherUserId}
			setPage={setPage}
			socket={socket}
			peerConnection={peerConnection}
		/>
	),
	outgoing: <Outgoing otherUserId={otherUserId} setPage={setPage} />,
	incoming: (
		<Incoming
			otherUserId={otherUserId}
			setPage={setPage}
			socket={socket}
			peerConnection={peerConnection}
		/>
	),
	callroom: (
		<Callroom localStream={localStream} remoteStream={remoteStream} />
	),
});

export default useGetComponents;
