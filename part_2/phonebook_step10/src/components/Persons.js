import React from "react";

const Persons = ({ searchResults, handleClick }) => {
	return (
		<ul style={{ display: "table-row" }}>
			{searchResults.map((item) => (
				<li key={item.name}>
					{item.name} {item.number}{" "}
					<button onClick={() => handleClick(item)}>delete</button>
				</li>
			))}
		</ul>
	);
};

export default Persons;
