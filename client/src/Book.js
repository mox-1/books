import React, { Component } from 'react';
import './Book.css';

class Book extends Component {
    render() {
        return (
            <div style={{backgroundColor: this.props.data.color}} className='book'>
                {Object.keys(this.props.data).map((d, i) => (
                    <div style={{display: 'inline-block'}} key={i}>{this.props.data[d]}</div>
                ))}
            </div>
        )
    }
}

export default Book;
