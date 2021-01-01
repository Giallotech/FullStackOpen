const Notification = ({ message }) => {
	const success = {
		color: "darkgreen",
		background: "lightgray",
		fontSize: 20,
		borderStyle: "solid",
		borderRadius: 5,
		padding: 10,
		marginBottom: 10,
	};

	const error = {
		color: "red",
		background: "lightgray",
		fontSize: 20,
		borderStyle: "solid",
		borderRadius: 5,
		padding: 10,
		marginBottom: 10,
	};

	if (message === null) {
		return null;
	}
	return (
		<div style={message.value === "error" ? error : success}>
			{message.text}
		</div>
	);
};

export default Notification;
