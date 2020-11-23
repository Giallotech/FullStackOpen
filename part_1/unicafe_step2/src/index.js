import React, { useState } from "react";
import ReactDOM from "react-dom";

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
            <button onClick={goodclick}>good</button>
            <button onClick={neutralclick}>neutral</button>
            <button onClick={badclick}>bad</button>
            <h1>statistics</h1>
            <p>good {good}</p>
            <p>neutral {neutral}</p>
            <p>bad {bad}</p>
            <p>all {all}</p>
            <p>average {avg}</p>
            <p>positive {pos} % </p>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));
