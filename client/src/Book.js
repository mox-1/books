import React, { Component, PropTypes } from 'react';
import './Book.css';

class Book extends Component {
    render() {
        const {data} = this.props;
        return (
            <div className='book'>
                {
                    data.loading ? (
                        <div className="spinner">
                            <div className="double-bounce1"></div>
                            <div className="double-bounce2"></div>
                        </div>
                    ) : (
                        <div>
                            <div className={'book-title'}>
                                <p>{data.title.toUpperCase()}</p>
                            </div>
                            <div>{data.authorName}</div>
                            <div>{data.genre}</div>
                        </div>
                    )
                }
            </div>
        )
    }
}

Book.propTypes = {
    data: PropTypes.object.isRequired
}

export default Book;
