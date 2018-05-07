import React, { Component } from "react";
import ChoreItems from "./ChoreItems";
import "./ChoreList.css"
import PrizeList from "./PrizeList";
import * as _ from "underscore";

class ChoreList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            showWheel: false,
            prizes: [],

        };

        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.addPrize = this.addPrize.bind(this);
        this.deletePrize = this.deletePrize.bind(this);
        this.selectPrize = this.selectPrize.bind(this);


    }

    selectPrize() {
        // console.log(_.sample(this.state.prizes))
        if (this.state.prizes.length > 0) {
            this.setState({ prizes: [_.sample(this.state.prizes)] });
        } else {
            alert("You forgot to add prizes")
        }
    }
//I wrote this to change the colors
    addItem(e) {
        e.preventDefault();
        var colors = [
            "#4D4DFF","#7171C6","#7F00FF","#B272A6","#B62084","#BCED91","#00b4cc","#fc0015","#332d46","#57314b","#9b5055","#ff4204","#f6ff46","#f3ff46d8"
        ];
        //.find will iterate throught the array to find one w/matching  value
        var nameMatch = this.state.items.find((item) => {
            return item.name == this._inputName.value;
        });
        var color;
        if (nameMatch) {
            color = nameMatch.color;
        } else {
            color = _.sample(colors)//randomly picks one of the colors array uses a library called underscore
        }
        if (this._inputElement.value !== "") {
            var newItem = {
                text: this._inputElement.value,
                name: this._inputName.value,
                key: Date.now(),
                color: color
            };

            this.setState((prevState) => {
                return {
                    items: prevState.items.concat(newItem)
                }
            });
        }

        this._inputElement.value = "";

        console.log(this.state.items);
    }
//wrote this CD
    addPrize(e) {
        e.preventDefault();
        if (this._inputPrize.value !== "") {
            var newPrize = {
                prize: this._inputPrize.value,
                key: Date.now(),
                won: false
            };

            this.setState((prevState) => {
                return {
                    prizes: prevState.prizes.concat(newPrize)
                }
            });
        }

        this._inputPrize.value = "";

        console.log(this.state.prizes);
    }


// got this from tutorial addapted for my own use
deleteItem(key) {
        var filteredItems = this.state.items.filter(function (item) {
            return (item.key !== key)
        });

        this.setState({ items: filteredItems }, () => {
            if (this.state.items.length == 0) {
                this.setState({ showWheel: true });
            }
        });
    }


// got this from tutorial addapted for my own use
deletePrize(key) {
        var filteredItems = this.state.prizes.filter(function (prize) {
            return (prize.key !== key)
        });

        this.setState({ prizes: filteredItems });


    }

// got this from tutorial addapted for my own use
componentWillMount() {
        localStorage.getItem('ChoreListMain') && this.setState({
            items: JSON.parse(localStorage.getItem('ChoreListMain')),
            isLoading: false
        })
        localStorage.getItem('PrizeList') && this.setState({
            prizes: JSON.parse(localStorage.getItem('PrizeList')),
            isLoading: false
        })
    }

    // componentDidMount(){
    //     if(localStorage.getItem('ChoreListMain')){
    //         this.fetchData();
    //     } else {
    //         console.log('Using data from localStorage');
    //     }
    // } 
    //would use this to fetch data from a data base

// got this from tutorial addapted for my own use
componentWillUpdate(nextProps, nextState) {
        localStorage.setItem('ChoreListMain', JSON.stringify(nextState.items));
        localStorage.setItem('PrizeList', JSON.stringify(nextState.prizes));
    }

    render() {
        let wheel = () => {
            if (this.state.showWheel) {
                return (
                    <div style={{position: 'relative', height: 210}}>
                        <div id="wheel">
                            <div className="circle1">
                            </div>
                            <div className="circle2">
                            </div>
                            <div className="circle3" onClick={this.selectPrize}></div>
                        </div>
                        <h2 style={{position: 'absolute', bottom: 0}}>Click the spinning wheel to select a prize!</h2>
                    </div>
                )
            } else {
                return (
                    <div><h2>Finish all the chores for a chance to spin the prize wheel!</h2></div>
                )
            }
        }
        //wrote this to fix an error CD
        let showChores = () => {
            if (this.state.items.length > 0) {
                return (
                    <ChoreItems
                        entries={this.state.items}
                        delete={this.deleteItem} />
                )
            }
        }
        let showPrizes = () => {
            if (this.state.prizes.length > 0) {
                return (
                    <PrizeList
                        entries={this.state.prizes}
                        delete={this.deletePrize} />
                )
            }
        }
//wrote this CD
        return (
            <div className="ChoreListMain">
                <header>
                   <h1> Chore Time</h1>
                </header>
                <div className="header">
                    <form onSubmit={this.addItem}>
                        <input ref={(a) => this._inputName = a}
                            placeholder="Name">

                        </input>
                        <input ref={(a) => this._inputElement = a}
                            placeholder="Enter task">

                        </input>

                        <button type="submit">add</button>
                    </form>
                </div>
                {showChores()}
                <div className="header">
                    <form onSubmit={this.addPrize}>
                        <input ref={(a) => this._inputPrize = a}
                            placeholder="Enter prizes">

                        </input>

                        <button type="submit">add</button>
                    </form>
                    {showPrizes()}
                    {wheel()}
                </div>

            </div>
        );
    }
}


export default ChoreList;