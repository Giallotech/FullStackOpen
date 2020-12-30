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

		const changedNumber = { ...sameName, number: newNumber };

		if (sameName) {
			if (
				window.confirm(
					`${newName} is already added to phonebook, replace the old number with a new one?`
				)
			) {
				noteService
					.update(sameName.id, changedNumber)
					.then((response) => {
						setPersons(
							persons.map((item) =>
								item.id !== sameName.id ? item : response.data
							)
						);
						setNewName("");
						setNewNumber("");
					});
			}
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
	const handleClick = (placeholder) => {
		if (window.confirm(`Delete ${placeholder.name} ?`)) {
			noteService.erase(placeholder.id).then(() => {
				setPersons(
					searchResults.filter((item) => item.id !== placeholder.id)
				);
			});
		}
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
			<Persons searchResults={searchResults} handleClick={handleClick} />
		</div>
	);
};

export default App;
