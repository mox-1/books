import React, { Component } from 'react';
import Wheel from './Wheel';

import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filters: []
        }
    }
    _addFilter = (filter) => {
        this.setState({
            filters: [...this.state.filters, filter]
        });
    }
    render() {
        return (
              <div className="app">
                <div className="page-wrapper">
                    <h1>Scroll through the books</h1>
                    <div onClick={this._addFilter}>+</div>
                    <Wheel active={!this.state.filters.length ? true : false}/>
                    {this.state.filters.map((f, i) => (
                        <Wheel active={i === this.state.filters.length - 1 ? true : false} key={i}/>
                    ))}
                </div>
            </div>
        );
    }
}

export default App;
