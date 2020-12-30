import React from "react";
import ReactDOM from "react-dom";

const App = () => {
	const course = {
		name: "Half Stack application development",
		parts: [
			{
				name: "Fundamentals of React",
				exercises: 10,
			},
			{
				name: "Using props to pass data",
				exercises: 7,
			},
			{
				name: "State of a component",
				exercises: 14,
			},
		],
	};

	return (
		<div>
			<Header course={course} />
			<Content parts={course.parts} />
			<Total parts={course.parts} />
		</div>
	);
};

const Header = (props) => {
	return (
		<div>
			<h1>{props.course.name}</h1>
		</div>
	);
};

const Content = (props) => {
	return (
		<div>
			<Part p1={props.parts[0].name} ex1={props.parts[0].exercises} />
			<Part p2={props.parts[1].name} ex2={props.parts[1].exercises} />
			<Part p3={props.parts[2].name} ex3={props.parts[2].exercises} />
		</div>
	);
};

const Part = (props) => {
	return (
		<div>
			<p>
				{props.p1} {props.ex1}
			</p>
			<p>
				{props.p2} {props.ex2}
			</p>
			<p>
				{props.p3} {props.ex3}
			</p>
		</div>
	);
};
const Total = (props) => {
	return (
		<div>
			<p>
				Number of exercises{" "}
				{props.parts[0].exercises +
					props.parts[1].exercises +
					props.parts[2].exercises}
			</p>
		</div>
	);
};
ReactDOM.render(<App />, document.getElementById("root"));
