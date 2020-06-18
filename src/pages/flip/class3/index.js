import ReactDOM from "react-dom";
import React, { Component, useState } from "react";
import { Flipper, Flipped } from "react-flip-toolkit";
import { shuffle } from "lodash";
import styles from "./index.css";

export default class ListShuffler extends Component {
    state = {
        data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    }
    shuffleList = () => this.setState({ data: shuffle(this.state.data) });
    render() {
        const { data } = this.state;

        return (
            <Flipper flipKey={data.join("")} className={styles.class3}>
                <p style={{fontSize:'20px',fontWeight:'600'}}>乱序</p>
                <button onClick={this.shuffleList}> shuffle</button>
                <ul className={styles.list}>
                    {data.map(d => (
                        <Flipped key={d} flipId={d}>
                            <li>{d}</li>
                        </Flipped>
                    ))}
                </ul>
            </Flipper>
        );
    };

}

// ReactDOM.render(<ListShuffler />, document.querySelector("#root"));