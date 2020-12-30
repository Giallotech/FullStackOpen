import React, { useState, useEffect } from "react";
import axios from "axios";
import TooMany from "./components/TooMany";
import FewCountries from "./components/FewCountries";
import OneCountry from "./components/OneCountry";

const App = () => {
	const [countries, setCountries] = useState([]);
	const [query, setQuery] = useState("");
	const [weather, setWeather] = useState(null);

	useEffect(() => {
		if (query !== "") {
			axios
				.get("https://restcountries.eu/rest/v2/all")
				.then((response) => {
					const searchResults = response.data.filter((country) =>
						country.name.toLowerCase().includes(query.toLowerCase())
					);
					setCountries(searchResults);
				});
		}
	}, [query]);

	useEffect(() => {
		const api_key = process.env.REACT_APP_API_KEY;

		if (countries.length === 1) {
			const capital = countries[0].capital;
			axios
				.get(
					`http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`
				)
				.then((response) => {
					console.log(response);
					setWeather(response.data);
				});
		}
	}, [countries]);

	const handleSearch = (event) => {
		setQuery(event.target.value);
	};

	const handleClick = (placeholder) => {
		setQuery(placeholder);
	};

	const matches =
		(countries.length === 1) & (weather !== null) ? (
			<OneCountry countries={countries} weather={weather} />
		) : countries.length > 1 && countries.length < 10 ? (
			<FewCountries countries={countries} handleClick={handleClick} />
		) : (
			<TooMany />
		);

	return (
		<div>
			<div>
				find countries{" "}
				<input
					type="text"
					placeholder="Search"
					value={query}
					onChange={handleSearch}
				></input>
			</div>
			<div>{matches}</div>
		</div>
	);
};

export default App;
