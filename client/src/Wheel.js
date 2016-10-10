// Packages
import React, { Component, PropTypes } from 'react';
import Carousel from 'nuka-carousel';

// Components + Custom
import Api from './helpers/api';
import Book from './Book';
import * as Buttons from './buttons/index';
import {Categories, Values} from './constants/CategoryConstants';
import AppConstants from './constants/AppConstants';

// Styles
import './styles/Wheel.css';

class Wheel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            loading: false,
            currentSlide: 0,
            count: 0,
            booksLoaded: false,
            booksLoading: false
        }
    }

    _getApiUrl = () => {
        var base = '/books?';
        this.props.filters.forEach(f => {
            Object.keys(f).forEach(k => {
                base += (k + '=' + f[k] + '&');
            })
        });
        return base;
    }

    _getFilterString = () => {
        if (!this.props.filters.length) {
            return 'All books';
        } else {
            var base = 'Where ';
            this.props.filters.forEach(f => {
                Object.keys(f).forEach(k => {
                    base += ((base !== 'Where ')? ' AND ' : '') + Categories[k].label + ' is ' + (k === 'day' ? Values.day[f[k]].label : f[k]);
                })
            });
            return base;
        }
    }

    _beforeSlideChange = (a, b) => {
        if (!this.state.loading && b === this.state.books.length - 3 && b < this.state.count) {
            var update = () => {
                Api.get(this._getApiUrl() + 'index=' + (b + 3)).then((data) => {
                    let {books} = this.state;
                    this.setState({
                        loading: false,
                        books: [...books.filter(d => !d.loading), ...data],
                    });
                });
            }
            this.setState({
                loading: true,
                books: [...this.state.books, {loading: true}]
            }, () => {
                // Simulate latency for testing
                setTimeout(update, 2000);
            })
        }
        this.setState({
            currentSlide: b
        });
    }

    componentWillMount() {
        Api.get(this._getApiUrl()).then((data) => {
            this.setState({
                booksLoaded: true,
                books: data
            }, () => {
                window.dispatchEvent(new Event('resize'));
            });
        });
        Api.get(this._getApiUrl() + 'count=true').then((count) => {
            this.setState({
                count: count
            });
        })
    }

    render() {
        var Decorators = [
            {
                component: Buttons.PreviousBook,
                position: 'TopCenter',
                style: {
                    padding: 0,
                    zIndex: 10
                }
            },
            {
                component: Buttons.NextBook,
                position: 'BottomCenter',
                style: {
                    padding: 0,
                    marginTop: -20,
                    zIndex: 10
                }
            }
        ];
        var settings = {
            vertical: true,
            slidesToShow: AppConstants.SLIDES_TO_SHOW,
            dragging: true,
            height: AppConstants.WHEEL_HEIGHT,
            beforeSlide: this._beforeSlideChange,
            decorators: Decorators,
        };
        return (
            <div className='wheel-wrapper'>
                <div className={'label'}>{this._getFilterString()}
                    {!!this.props.filters.length && <div className='indicator'>{'>'}</div>}
                </div>
                <div className='carousel-wrapper'>
                    <div className='overlay' style={{height: ((this.state.currentSlide + AppConstants.SLIDES_TO_SHOW) * AppConstants.WHEEL_HEIGHT) / this.state.count }}></div>
                    <Carousel {...settings}>
                        {(this.state.booksLoaded && this.state.books.map((bookData, i) => (
                            <Book data={bookData} key={i}></Book>
                        )))}
                    </Carousel>
                </div>
                {!!this.props.active && (<div className='remove' onClick={this.props.remove}></div>)}
            </div>
        );
    }
}

Wheel.propTypes = {
    active: PropTypes.bool.isRequired,
    filters: PropTypes.array.isRequired
}

export default Wheel;
