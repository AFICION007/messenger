import React, { useState } from "react";
import "./styles.css";

const Join = ({ callerId, otherUserId, setPage }) => {
	const [calleeId, setCalleeId] = useState("");

	const handleCall = () => {
		otherUserId.current = calleeId;
		setPage("outgoing");
	};

	return (
		<div className="main">
			<div className="caller_id_container">
				<span>Your caller id</span>
				<span>{callerId}</span>
			</div>

			<form className="form" onSubmit={handleCall}>
				<div className="form-group">
					<label>Enter friend's caller id</label>
					<input
						value={calleeId}
						onChange={(event) => setCalleeId(event.target.value)}
						placeholder="6 digit number"
						className="form-control"
					></input>
				</div>
				<button type="submit" className="btn btn-primary">
					Call
				</button>
			</form>
		</div>
	);
};

export default Join;
