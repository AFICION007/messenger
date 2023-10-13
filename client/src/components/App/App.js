import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import { format } from "date-fns";
import styles from "./App.module.css";

const socket = io("http://localhost:3001");

const App = () => {
	const { room } = useParams();
	const [username, friend] = room.split("-");

	const [messages, setMessages] = useState([]);

	useEffect(() => {
		socket.emit("join", { username, friend });

		socket.on("bothUsersConnected", () =>
			alert(`${friend} joined the conversation!`)
		);

		socket.on("receiveMessage", (message) => {
			setMessages((prevMessages) => [
				...prevMessages,
				{
					message: message.text,
					sender: message.user === username ? "me" : "you",
					date_time: new Date(),
				},
			]);
		});

		socket.on("friendDisconnected", () => alert(`${friend} disconnected`));

		return () => {
			socket.off();
		};
	}, [username, friend]);

	useEffect(() => {
		console.log(messages);
	}, [messages]);

	const [message, setMessage] = useState("");

	const handleSend = (event) => {
		event.preventDefault();

		if (message !== "") {
			socket.emit("sendMessage", message);
			setMessage("");
		}
	};

	return (
		<div className={styles.main}>
			<div className={styles.chat_container}>
				<div className={styles.chat_column}>
					{messages.map(({ message, sender, date_time }) => {
						return (
							<div
								className={
									sender === "me" ? styles.Me : styles.You
								}
							>
								{sender === "you" ? (
									<span className={styles.time}>
										{format(date_time, "HH:mm")}
									</span>
								) : null}
								<div
									className={`${styles.chat} ${
										sender === "me" ? styles.me : styles.you
									}`}
								>
									<span>{message}</span>
								</div>
								{sender === "me" ? (
									<span className={styles.time}>
										{format(date_time, "HH:mm")}
									</span>
								) : null}
							</div>
						);
					})}
				</div>
				<form onSubmit={handleSend} className={styles.input_container}>
					<div className={styles.form_group}>
						<label>Message:</label>
						<input
							type="text"
							placeholder="Type your message"
							value={message}
							onChange={(event) => setMessage(event.target.value)}
							className="form-control"
						></input>
					</div>
					<div>
						<button
							type="submit"
							className="btn btn-primary btn-md"
						>
							Send
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default App;
