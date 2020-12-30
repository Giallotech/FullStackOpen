import React from "react";

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

export default Filter;
