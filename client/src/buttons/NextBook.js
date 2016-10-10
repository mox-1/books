import React, {Component} from 'react';
import './buttons.css';

export default class extends Component {
    render() {
        return (
            <div onClick={this.props.nextSlide} className='down button'></div>
        )
    }
}
