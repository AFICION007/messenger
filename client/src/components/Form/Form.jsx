import React, { useState } from "react";
import styles from "./Form.module.css";
import { useNavigate } from "react-router-dom";

const Form = () => {
	const navigate = useNavigate();
	const [usernames, setUsernames] = useState({ username: "", friend: "" });

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setUsernames({ ...usernames, [name]: value });
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		console.log(usernames);
		const roomName = Object.values(usernames).join("-");
		navigate(`/rooms/${roomName}`);

		setUsernames({ username: "", friend: "" });
	};

	return (
		<div className={styles.main}>
			<div className={styles.form_container}>
				<form onSubmit={handleSubmit}>
					<div className="form-group">
						<label>Username:</label>
						<input
							name="username"
							id="username"
							type="text"
							placeholder="Enter your username"
							value={usernames.username}
							onChange={handleInputChange}
							className="form-control"
							required
						></input>
					</div>
					<div className="form-group">
						<label>Friend's username:</label>
						<input
							name="friend"
							id="friend"
							type="text"
							placeholder="Enter username to connect with"
							value={usernames.friend}
							onChange={handleInputChange}
							className="form-control"
							required
						></input>
					</div>

					<div className={styles.button_container}>
						<button
							type="submit"
							className="btn btn-primary"
							id={styles.btn}
						>
							Submit
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Form;
