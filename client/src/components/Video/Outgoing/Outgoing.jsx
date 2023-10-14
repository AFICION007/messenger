import React from "react";
import "./styles.css";

const Outgoing = ({ otherUserId, setPage }) => {
	const handleCancelCall = () => {
		setPage("join");
	};

	return (
		<div className="main">
			<span>Calling to...</span>
			<span>{otherUserId.current}</span>
			<button
				type="button"
				onClick={handleCancelCall}
				className="btn btn-danger"
				id="button"
			>
				<svg
					width="20px"
					height="20px"
					viewBox="0 0 24 24"
					fill="white"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M2.10863 14.1079L3.76461 15.7639C4.02858 16.0413 4.38552 16.2119 4.76752 16.2431C5.84479 16.3311 7.91395 15.0073 8.44327 14.1917C8.8559 13.5559 8.69631 12.6629 8.69702 11.9465C10.8675 11.3476 13.1582 11.3453 15.3275 11.9399C15.3268 12.6563 15.1654 13.5497 15.5768 14.1847C16.1037 14.9979 18.1615 16.3114 19.2367 16.2294C19.6149 16.2006 19.97 16.0352 20.2357 15.7642L21.895 14.1049C22.5266 13.4721 22.4856 12.3791 21.7923 11.8009C16.3175 6.31749 7.7222 6.27776 2.21038 11.7982C1.51362 12.3797 1.47304 13.4775 2.10863 14.1079Z"
						stroke="#fff"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</button>
		</div>
	);
};

export default Outgoing;
