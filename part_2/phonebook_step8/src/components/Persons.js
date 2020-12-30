import React from "react";

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

export default Persons;
