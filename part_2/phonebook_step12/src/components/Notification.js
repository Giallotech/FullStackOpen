const Notification = ({ message }) => {
	if (message === null) {
		return null;
	}
	return <div className={message.value}>{message.text}</div>;
};

export default Notification;
