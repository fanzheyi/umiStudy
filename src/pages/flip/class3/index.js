import ReactDOM from "react-dom";
import React, { Component, useState } from "react";
import { Flipper, Flipped } from "react-flip-toolkit";
import { shuffle } from "lodash";
import styles from "./index.css";

export default class ListShuffler extends Component {
    state = {
        data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        data2: [{ id: 'a', color: '#9240D5' }, { id: 'b', color: '#FF8B40' }, { id: 'c', color: '#34D1B2' }, { id: 'd', color: '#FFF840' }],
        dataIndex: ['a', 'b', 'c', 'd'],
        status: false

    }
    //乱序
    shuffleList = () => this.setState({ data: shuffle(this.state.data) });
    //动画内容
    ani = (arr) => {
        let resArr = [...arr]
        let cur = { ...resArr[arr.length - 1] }
        let flipK = []
        resArr.pop()
        resArr.unshift(cur)
        resArr.map((itm) => flipK.push(itm.id))
        this.setState({ data2: resArr, dataIndex: flipK })
    }

    animation
    //开始事件
    start = () => {
        if (this.animation) {
            clearInterval(this.animation)
        }

        this.setState({
            status: !this.state.status
        }, () => {
            if (this.state.status) {
                this.animation = setInterval(() => {
                    // this.setState({ data2: this.ani(this.state.data2) })
                    this.ani(this.state.data2)
                }, 1000)
            } else {
                clearInterval(this.animation)
            }

        })

    }
    render() {
        const { data, data2, status, dataIndex } = this.state;
        console.log('dataIndex.join(""): ', dataIndex.join(""));

        return (
            <React.Fragment>
                <Flipper flipKey={data.join("")} className={styles.class3}>
                    <p style={{ fontSize: '20px', fontWeight: '600' }}>乱序</p>
                    <button onClick={this.shuffleList}> shuffle</button>
                    <ul className={styles.list}>
                        {data.map(d => (
                            <Flipped key={d} flipId={d}>
                                <li>{d}</li>
                            </Flipped>
                        ))}
                    </ul>
                </Flipper>
                <Flipper
                    flipKey={dataIndex.join("")}
                    className={styles.class3b}
                    spring={'veryGentle'}
                >
                    <p style={{ fontSize: '20px', fontWeight: '600' }}>动画</p>
                    <button onClick={this.start}> {status ? '停止' : '开始'}</button>
                    <ul className={styles.list2}>
                        {data2.map(d => (
                            <Flipped key={d.id} flipId={d.id}>
                                <li style={{ margin: '5px', backgroundColor: d.color, borderRadius: '5%', boxShadow: '2px 2px 0  #999' }}></li>
                            </Flipped>
                        ))}
                    </ul>
                </Flipper>
            </React.Fragment>
        );
    };

}

// ReactDOM.render(<ListShuffler />, document.querySelector("#root"));