import React from "react";

const OneCountry = ({ countries, weather }) => {
	return (
		<div>
			<h1>{countries[0].name}</h1>
			<div>capital {countries[0].capital}</div>
			<div>population {countries[0].population}</div>
			<h2>Spoken languages</h2>
			<ul>
				{countries[0].languages.map((item) => (
					<li key={item.name}>{item.name}</li>
				))}
			</ul>
			<img
				src={countries[0].flag}
				alt="flag"
				style={{ width: 150, height: 150 }}
			></img>
			<h2>Weather in {weather.location.name}</h2>
			<div>
				<b>Temperature:</b>
				{weather.current.temperature} Celsius
			</div>
			<div>
				<img
					src={weather.current.weather_icons[0]}
					alt={weather.current.weather_descriptions[0]}
				></img>
			</div>
			<div>
				<b>wind:</b> {weather.current.wind_speed} mph direction{" "}
				{weather.current.wind_dir}
			</div>
		</div>
	);
};

export default OneCountry;
