import { gql } from 'apollo-boost';

const getAuthorQuery = gql`
  {
    authors{
      name,
      id
    }
  }
`;

const getBooksQuery = gql`
  {
    books{
      name,
      id
    }
  }
`;

const addBookMutation = gql`
  mutation($name: String!, $genre: String!, $authorId: ID!){
      addBook(name: $name, genre: $genre, authorId:  $authorId){
        name,
        id
      }
  }
`;

const getBookQuery = gql`
  query($id: ID){
    book(id: $id){
      name
      genre
      id
      author{
        name
        id
        books{
          name
          id
        }
      }
    }
  }
`;

export {
    getAuthorQuery, 
    getBooksQuery,
    addBookMutation,
    getBookQuery
}