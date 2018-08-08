import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import _ from 'lodash';
import {getBooksQuery} from '../queries';
import BookDetails from './BookDetails';

class BookList extends Component {
  constructor(props){
    super(props);
    this.state = {
      selected: null
    };
  }

  render() {
    const { data } = this.props;
    return (
       <div>
         {
          _.isEmpty(data) && data.loading
            ? <div>Loading book...</div>
            :  <ul className="book-list">
                  {_.map(data.books, (book) => {
                    return <li key={book.id} onClick={(e) => this.setState({selected: book.id})} >{book.name}</li>
                  })
                  }
                </ul>
          }
          <BookDetails bookId={this.state.selected}/>
       </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);