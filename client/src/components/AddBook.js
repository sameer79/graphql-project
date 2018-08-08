import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import _ from 'lodash';
import {getAuthorQuery, addBookMutation, getBooksQuery } from '../queries';

class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      genre: '',
      authorId: ''
    };
  }

  submitForm = (e) => {
    const {name, genre, authorId} = this.state;
    e.preventDefault();
    this.props.addBookMutation({
      variables:{
         name,
         genre,
         authorId
      },
      refetchQueries: [{query: getBooksQuery}]
    });
  }

  render() {
    const { getAuthorQuery } = this.props;
    return (
       <div>
           <form id="add-book" onSubmit={this.submitForm.bind(this)}>
                <div className="field">
                    <label>Book name:</label>
                    <input type="text" onChange={(e) => this.setState({name: e.target.value})} />
                </div>
                <div className="field">
                    <label>Genre:</label>
                    <input type="text" onChange={(e) => this.setState({genre: e.target.value})}/>
                </div>
                <div className="field">
                    <label>Author:</label>
                    <select onChange={(e) => this.setState({authorId: e.target.value})}>
                      <option key="12">Select author</option>
                      {
                        _.map(getAuthorQuery.authors, (author) => {
                          return <option key={author.id} value={author.id} >{author.name}</option>
                        })
                      }
                    </select>
                </div>
                <button>+</button>
           </form>
       </div>
    );
  }
}

export default compose(
  graphql(getAuthorQuery, {name: "getAuthorQuery"}),
  graphql(addBookMutation, {name: "addBookMutation"})
)(AddBook);