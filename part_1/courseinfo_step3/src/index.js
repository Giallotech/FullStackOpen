import React from "react";
import ReactDOM from "react-dom";

const App = () => {
    const course = "Half Stack application development";
    const part1 = {
        name: "Fundamentals of React",
        exercises: 10,
    };
    const part2 = {
        name: "Using props to pass data",
        exercises: 7,
    };
    const part3 = {
        name: "State of a component",
        exercises: 14,
    };

    return (
        <div>
            <Header course={course} />

            <Content
                part1={part1.name}
                exercises1={part1.exercises}
                part2={part2.name}
                exercises2={part2.exercises}
                part3={part3.name}
                exercises3={part3.exercises}
            />
            <Total
                totex={part1.exercises + part2.exercises + part3.exercises}
            />
        </div>
    );
};

const Header = (props) => {
    return (
        <div>
            <h1>{props.course}</h1>
        </div>
    );
};

const Content = (props) => {
    return (
        <div>
            <Part p1={props.part1} ex1={props.exercises1} />
            <Part p2={props.part2} ex2={props.exercises2} />
            <Part p3={props.part3} ex3={props.exercises3} />
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
            <p>Number of exercises {props.totex}</p>
        </div>
    );
};
ReactDOM.render(<App />, document.getElementById("root"));
