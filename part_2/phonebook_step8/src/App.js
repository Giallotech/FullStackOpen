import React, { useState, useEffect } from "react";
import noteService from "./services/persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [searchName, setSearchName] = useState("");

	useEffect(() => {
		noteService.getAll().then((response) => {
			console.log(response.data);
			setPersons(response.data);
		});
	}, []);

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
			noteService.create(nameObject).then((response) => {
				setPersons(persons.concat(response.data));
				setNewName("");
				setNewNumber("");
			});
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
