import React, { useState, useEffect } from "react";
import noteService from "./services/persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [searchName, setSearchName] = useState("");
	const [notification, setNotification] = useState(null);

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

		const name = persons.find((item) => item.name === newName);

		const changedNumber = { ...name, number: newNumber };

		if (name) {
			if (
				window.confirm(
					`${newName} is already added to phonebook, replace the old number with a new one?`
				)
			) {
				noteService
					.update(name.id, changedNumber)
					.then((response) => {
						setPersons(
							persons.map((item) =>
								item.id !== name.id ? item : response.data
							)
						);
						setNewName("");
						setNewNumber("");
						setNotification({
							text: `The number of ${newName} has been replaced`,
							value: "success",
						});
						setTimeout(() => {
							setNotification(null);
						}, 5000);
					})
					.catch((error) => {
						setNotification({
							text: `Information of ${newName} has already been removed from server`,
							value: "error",
						});
						setTimeout(() => {
							setNotification(null);
						}, 5000);
						setNewName("");
						setNewNumber("");
					});
			}
		} else {
			noteService.create(nameObject).then((response) => {
				setPersons(persons.concat(response.data));
				setNewName("");
				setNewNumber("");
				setNotification({
					text: `Added ${newName}`,
					value: "success",
				});
				setTimeout(() => {
					setNotification(null);
				}, 5000);
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
			<Notification message={notification} />
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
