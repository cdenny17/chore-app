import React, { Component } from "react";
import FlipMove from "react-flip-move";

class ChoreItems extends Component {
    constructor(props) {
        super(props);
        this.createChores = this.createChores.bind(this);
    }


//wrote half of this
    createChores(item) {
        return <li onClick={() => this.delete(item.key)}
                    style={{color: item.color}}
                    key={item.key}>{item.name} - {item.text}
                    </li>
    }

    delete(key) {
        this.props.delete(key);
    }

// got this from tutorial addapted for my own use
    render() {
        var ChoreEntries = this.props.entries;
        var ChoreItems = ChoreEntries.map(this.createChores);

        return (
            <ul className="theList">
                <FlipMove duration={150} easing="ease-out">{/* this is to animate the erase effect */}
                    {ChoreItems}
                </FlipMove>
            </ul>
        );
    }
}

export default ChoreItems;