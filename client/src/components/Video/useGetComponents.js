import React from "react";

import Join from "./Join/Join";
import Outgoing from "./Outgoing/Outgoing";
import Incoming from "./Incoming/Incoming";
import Callroom from "./Callroom/Callroom";

const useGetComponents = (callerId, otherUserId, setPage) => ({
	join: (
		<Join callerId={callerId} otherUserId={otherUserId} setPage={setPage} />
	),
	outgoing: <Outgoing otherUserId={otherUserId} setPage={setPage} />,
	incoming: <Incoming otherUserId={otherUserId} setPage={setPage} />,
	callroom: <Callroom />,
});

export default useGetComponents;
