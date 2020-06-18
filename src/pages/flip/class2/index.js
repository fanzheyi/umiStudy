import ReactDOM from "react-dom";
import React, { Component } from "react";
import { Flipper, Flipped } from "react-flip-toolkit";
import Card from "./Card";
import data from "./data";
import style from "./index.css";
// import "sanitize.css";
export default class ListExample extends Component {
    state = {
        type: "list",//布局方式
        sort: "asc",//控制排序
        filteredIds: [],
        stagger: "forward",
        spring: "noWobble"
    };

    addToFilteredIds = id => {
        //删除  加入过滤id数组
        this.setState(prevState => {
            console.log('prevState.filteredIds.concat(id): ', prevState.filteredIds.concat(id));

            return {
                filteredIds: prevState.filteredIds.concat(id)
            };
        });
    };

    render() {
        return (
            <div className={style.fmexample}>
                <Flipper
                    flipKey={`${this.state.type}-${this.state.sort}-${JSON.stringify(
                        this.state.filteredIds
                    )}-${JSON.stringify(this.state.stagger)}`}
                    spring={this.state.spring}
                    staggerConfig={{
                        default: {
                            reverse: this.state.stagger !== "forward",
                            speed: 1
                        }
                    }}
                    decisionData={this.state}
                >
                    <div className={style.fmflexcontainer}>
                        <fieldset>
                            <legend>Sort</legend>
                            <label
                                onClick={() => {
                                    this.setState({
                                        sort: "asc"
                                    });
                                }}
                            >
                                <input
                                    type="radio"
                                    name="sort"
                                    checked={this.state.sort === "asc"}
                                />
                                asc
                            </label>
                            <label
                                onClick={() => {
                                    this.setState({
                                        sort: "desc"
                                    });
                                }}
                            >
                                <input
                                    type="radio"
                                    name="sort"
                                    checked={this.state.sort === "desc"}
                                />
                            desc
                        </label>
                        </fieldset>

                        <fieldset>
                            <legend>Type 布局方式</legend>
                            <label
                                onClick={() => {
                                    this.setState({
                                        type: "grid"
                                    });
                                }}
                            >
                                <input
                                    type="radio"
                                    name="type"
                                    checked={this.state.type === "grid"}
                                />
                                grid
                            </label>
                            <label
                                onClick={() => {
                                    this.setState({
                                        type: "list"
                                    });
                                }}
                            >
                                <input
                                    type="radio"
                                    name="type"
                                    checked={this.state.type === "list"}
                                />
                            list
                        </label>
                        </fieldset>

                        <fieldset>
                            {/* <div> */}
                            <legend>Stagger 交错方式</legend>
                            <div className={style.fmflexcontainer}>
                                {["forward", "reverse", "none"].map((type, index) => {
                                    return (
                                        <label key={index}>
                                            <input
                                                type="radio"
                                                name="stagger"
                                                checked={this.state.stagger === type}
                                                onChange={() => {
                                                    this.setState({
                                                        stagger: type,
                                                        sort: this.state.sort === "asc" ? "desc" : "asc"
                                                    });
                                                }}
                                            />
                                            {type}
                                        </label>
                                    );
                                })}
                            </div>
                            {/* </div> */}
                        </fieldset>
                        <fieldset>
                            <legend>Spring 弹性</legend>
                            {["stiff", "noWobble", "veryGentle", "gentle", "wobbly"].map(
                                type => {
                                    return (
                                        <label key={type}>
                                            <input
                                                type="radio"
                                                name="spring"
                                                checked={this.state.spring === type}
                                                onChange={() => {
                                                    this.setState({
                                                        spring: type,
                                                        sort: this.state.sort === "asc" ? "desc" : "asc"
                                                    });
                                                }}
                                            />
                                            {type}
                                        </label>
                                    );
                                }
                            )}
                        </fieldset>
                    </div>
                    <div>
                        {!!this.state.filteredIds.length && (
                            <button
                                className={style.fmshowall}
                                onClick={() => {
                                    this.setState({
                                        filteredIds: []
                                    });
                                }}
                            >
                                show all cards
                            </button>
                        )}
                    </div>

                    <Flipped flipId="list">
                        <div className={this.state.type === "grid" ? style.fmgrid : style.fmlist}>
                            <Flipped inverseFlipId="list">
                                <ul className={style.listcontents}>
                                    {/* 链式处理data */}
                                    {[...data]
                                        .filter(d => !this.state.filteredIds.includes(d.id))
                                        .sort((a, b) => {
                                            if (this.state.sort === "asc") {
                                                return a.id - b.id;
                                            } else {
                                                return b.id - a.id;
                                            }
                                        })
                                        .map(({ title, id }) => (
                                            <Card
                                                id={id}
                                                title={title}
                                                stagger={["forward", "reverse"].includes(
                                                    this.state.stagger
                                                )}
                                                type={this.state.type}
                                                key={id}
                                                addToFilteredIds={this.addToFilteredIds}
                                            />
                                        ))}
                                </ul>
                            </Flipped>
                        </div>
                    </Flipped>
                </Flipper>
            </div>
        );
    }
}

// ReactDOM.render(<ListExample />, document.getElementById("root"));
