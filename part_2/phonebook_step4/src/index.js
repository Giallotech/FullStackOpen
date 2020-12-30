import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = () => {
	const [persons, setPersons] = useState([
		{ name: "Arto Hellas", number: "040-123456" },
		{ name: "Ada Lovelace", number: "39-44-5323523" },
		{ name: "Dan Abramov", number: "12-43-234345" },
		{ name: "Mary Poppendieck", number: "39-23-6423122" },
	]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [searchName, setSearchName] = useState("");

	const uniqueArr = [
		...new Map(persons.map((item) => [item.name, item])).values(),
	];
	const searchResults = uniqueArr.filter((person) =>
		person.name.toLowerCase().includes(searchName.toLowerCase())
	);

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
	const handleSearch = (event) => {
		setSearchName(event.target.value);
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<div>
				filter shown with{" "}
				<input
					type="text"
					placeholder="Search"
					value={searchName}
					onChange={handleSearch}
				></input>
			</div>
			<h2>add a new</h2>
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
				{searchResults.map((item) => (
					<li key={item.name}>
						{item.name} {item.number}
					</li>
				))}
			</ul>
		</div>
	);
};

export default App;
ReactDOM.render(<App />, document.getElementById("root"));
