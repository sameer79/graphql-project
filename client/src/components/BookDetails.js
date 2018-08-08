import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import _ from 'lodash';
import { getBookQuery } from '../queries';

class BookDetails extends Component{

    getBookDetails = (book) => {
        return (
            <div>
                <h2>{book.name}</h2>
                <p>{book.genre}</p>
                <p>{book.author.name}</p>
                <p>All books by this author:</p>
                <ul className="other-books">
                    {
                         _.map(book.author.books, (book) => {
                            return <li key={book.name}>{book.name}</li>
                        })
                    }
                </ul>
            </div>
        );
    }


    render(){
        const {data} = this.props;
        const {book} = data;
        return(
            <div  className="book-details">
                {
                    book
                    ? <div>
                         {this.getBookDetails(book)}
                    </div>
                    : <p>No book selected..</p>
                }
            </div>
        );
    }
}

export default graphql(getBookQuery, {
    options: (props) => {
        return {
            variables: {
                id: props.bookId
            }
        }
    }
})(BookDetails);