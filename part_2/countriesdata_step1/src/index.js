import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

const App = () => {
	const [countries, setCountries] = useState([]);
	const [searchCountry, setSearchCountry] = useState("");

	useEffect(() => {
		axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
			setCountries(response.data);
		});
	}, []);

	const searchResults = countries.filter((country) =>
		country.name.toLowerCase().includes(searchCountry.toLowerCase())
	);

	const toomany = () => <div>Too many matches, specify another filter</div>;

	const countrylist = () => {
		if (searchResults.length === 1) {
			return (
				<div>
					<h1>{searchResults[0].name}</h1>
					<div>capital {searchResults[0].capital}</div>
					<div>population {searchResults[0].population}</div>
					<h2>languages</h2>
					<ul>
						{searchResults[0].languages.map((item) => (
							<li key={item.name}>{item.name}</li>
						))}
					</ul>
					<img
						src={searchResults[0].flag}
						alt="flag"
						style={{ width: 150, height: 150 }}
					></img>
				</div>
			);
		} else
			return (
				<div>
					<ul style={{ display: "table-row" }}>
						{searchResults.map((item) => (
							<li key={item.name}>{item.name}</li>
						))}
					</ul>
				</div>
			);
	};
	const matches =
		searchResults.length > 0 && searchResults.length < 10
			? countrylist
			: toomany;

	const handleSearch = (event) => {
		setSearchCountry(event.target.value);
	};

	return (
		<div>
			<div>
				find countries{" "}
				<input
					type="text"
					placeholder="Search"
					value={searchCountry}
					onChange={handleSearch}
				></input>
			</div>
			<div>{matches()}</div>
		</div>
	);
};

export default App;
ReactDOM.render(<App />, document.getElementById("root"));
