import React, { Component } from 'react';
import Api from './api';
import Book from './Book';

import Carousel from 'nuka-carousel';
import './Wheel.css';

class Wheel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            booksLoaded: false,
            slideIndex: 0
        }
    }
    _nextSlide = () => {
        this.setState({
            slideIndex: this.state.slideIndex + 1
        });
    }
    _previousSlide = () => {
        this.setState({
            slideIndex: this.state.slideIndex - 1
        });
    }
    componentWillMount() {
        Api.get('/books').then((data) => {
            this.setState({
                booksLoaded: true,
                books: data
            }, () => {
                window.dispatchEvent(new Event('resize'));
            });
        });
    }
    render() {
        var Decorators = [{
            component: React.createClass({
                render() {
                  return (
                    <button
                      onClick={this.props.previousSlide}>
                      Previous Slide
                    </button>
                  )
                }
            }),
            position: 'TopCenter',
            style: {
            padding: 0
            }
        }, {
            component: React.createClass({
            render() {
                return (
                    <button
                    onClick={this.props.nextSlide}>
                    Next Slide
                    </button>
                )
            }
            }),
            position: 'BottomCenter',
            style: {
            padding: 0,
            marginTop: -20
            }
        }];
        var settings = {
            vertical: true,
            slidesToShow: 3,
            dragging: true,
            height: 500,
            slideIndex: this.state.slideIndex,
            decorators: Decorators,
            beforeSlide: (a, b) => {
                if (b === this.state.books.length - 3) {
                    Api.get('/books').then((data) => {
                        this.setState({
                            books: [...this.state.books, ...data]
                        });
                    });
                }
            }
        };
        return (
            <div className='carousel-wrapper'>
                <span>All</span>
                <Carousel {...settings}>
                {(this.state.booksLoaded && this.state.books.map((bookData, i) => (
                    <Book data={bookData} key={i}></Book>
                ))) || <div>Hi</div>}
                </Carousel>
            </div>
        );
    }
}

export default Wheel;
