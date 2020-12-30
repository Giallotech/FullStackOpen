import React from "react";

const FewCountries = ({ countries, handleClick }) => {
	return (
		<div>
			<ul style={{ display: "table-row" }}>
				{countries.map((item) => (
					<li key={item.name}>
						{item.name}{" "}
						<button onClick={() => handleClick(item.name)}>
							show
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default FewCountries;
