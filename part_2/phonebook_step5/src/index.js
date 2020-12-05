import React, { useState } from "react";
import ReactDOM from "react-dom";

const Filter = (props) => {
	return (
		<div>
			filter shown with{" "}
			<input
				type="text"
				placeholder="Search"
				value={props.searchName}
				onChange={props.handleSearch}
			></input>
		</div>
	);
};

const PersonForm = (props) => {
	return (
		<form onSubmit={props.addName}>
			<div>
				name:{" "}
				<input
					value={props.newName}
					onChange={props.handleNameChange}
				/>
			</div>
			<div>
				number:{" "}
				<input
					value={props.newNumber}
					onChange={props.handleNumberChange}
				/>
			</div>
			<div>
				<button type="submit">add</button>
			</div>
		</form>
	);
};

const Persons = ({ searchResults }) => {
	return (
		<ul style={{ display: "table-row" }}>
			{searchResults.map((item) => (
				<li key={item.name}>
					{item.name} {item.number}
				</li>
			))}
		</ul>
	);
};

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

	const addName = (event) => {
		event.preventDefault();
		const nameObject = {
			name: newName,
			number: newNumber,
		};
		setPersons(persons.concat(nameObject));
		uniqueArr.forEach((value) => {
			if (value.name === newName) {
				alert(`${newName} is already added to phonebook`);
			}
		});
		setNewName("");
		setNewNumber("");
	};
	const uniqueArr = [
		...new Map(persons.map((item) => [item.name, item])).values(),
	];
	const searchResults = uniqueArr.filter((person) =>
		person.name.toLowerCase().includes(searchName.toLowerCase())
	);
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
			<Filter searchName={searchName} handleSearch={handleSearch} />
			<h2>add a new</h2>
			<PersonForm
				addName={addName}
				newName={newName}
				handleNameChange={handleNameChange}
				newNumber={newNumber}
				handleNumberChange={handleNumberChange}
			/>
			<h2>Numbers</h2>
			<Persons searchResults={searchResults} />
		</div>
	);
};

export default App;
ReactDOM.render(<App />, document.getElementById("root"));
