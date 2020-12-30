import React from "react";

const PersonForm = ({
	addName,
	handleNameChange,
	newName,
	newNumber,
	handleNumberChange,
}) => {
	return (
		<form onSubmit={addName}>
			<div>
				name: <input value={newName} onChange={handleNameChange} />
			</div>
			<div>
				number:{" "}
				<input value={newNumber} onChange={handleNumberChange} />
			</div>
			<div>
				<button type="submit">add</button>
			</div>
		</form>
	);
};

export default PersonForm;
