import React, { useState } from "react";
import ReactDOM from "react-dom";
const Button = (props) => {
    return (
        <div>
            <button onClick={props.goodclick}>good</button>
            <button onClick={props.neutralclick}>neutral</button>
            <button onClick={props.badclick}>bad</button>
        </div>
    );
};
const Statistics = (props) => {
    if (props.all === 0) {
        return (
            <div>
                <p>No feedback given</p>
            </div>
        );
    }
    return (
        <table>
            <tbody>
                <Statistic text="good" value={props.good} />
                <Statistic text="neutral" value={props.neu} />
                <Statistic text="bad" value={props.bad} />
                <Statistic text="all" value={props.all} />
                <Statistic text="average" value={props.avg} />
                <Statistic text="positive" value={props.pos} percent="%" />
            </tbody>
        </table>
    );
};

const Statistic = (props) => {
    return (
        <tr>
            <td>{props.text}</td>
            <td>
                {props.value} {props.percent}
            </td>
        </tr>
    );
};

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);
    const [all, setAll] = useState(0);
    const [avg, setAvg] = useState(0);
    const [pos, setPos] = useState(0);
    const tot = good + 1 + neutral + bad;
    const goodclick = () => {
        setGood(good + 1);
        setAll(tot);
        setAvg((good + 1 - bad) / tot);
        setPos(((good + 1) * 100) / tot);
    };
    const badclick = () => {
        setBad(bad + 1);
        setAll(tot);
        setAvg((good - bad - 1) / tot);
        setPos((good * 100) / tot);
    };
    const neutralclick = () => {
        setNeutral(neutral + 1);
        setAll(tot);
        setAvg((good - bad) / tot);
        setPos((good * 100) / tot);
    };

    return (
        <div>
            <h1>give feedback</h1>

            <Button
                goodclick={goodclick}
                neutralclick={neutralclick}
                badclick={badclick}
            />
            <h1>statistics</h1>
            <Statistics
                good={good}
                neu={neutral}
                bad={bad}
                all={all}
                avg={avg}
                pos={pos}
            />
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));
