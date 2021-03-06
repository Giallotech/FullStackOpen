import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = () => {
	const [persons, setPersons] = useState([
		{ name: "Arto Hellas", number: "040-1234567" },
	]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");

	const uniqueArr = [
		...new Map(persons.map((item) => [item.name, item])).values(),
	];

	const addName = (event) => {
		event.preventDefault();
		const nameObject = {
			name: newName,
			number: newNumber,
		};
		const sameName = persons.find((item) => item.name === newName);

		if (sameName) {
			alert(`${newName} is already added to phonebook`);
			setNewName("");
			setNewNumber("");
		} else {
			setPersons(persons.concat(nameObject));
			setNewName("");
			setNewNumber("");
		}
	};

	const handleNameChange = (event) => {
		setNewName(event.target.value);
	};
	const handleNumberChange = (event) => {
		setNewNumber(event.target.value);
	};

	return (
		<div>
			<h2>Phonebook</h2>
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
			<h2>Numbers</h2>
			<ul style={{ display: "table-row" }}>
				{uniqueArr.map((person) => (
					<li key={person.name}>
						{person.name} {person.number}
					</li>
				))}
			</ul>
		</div>
	);
};

export default App;
ReactDOM.render(<App />, document.getElementById("root"));
