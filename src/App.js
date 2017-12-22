import React from 'react';
import './App.css'
import * as BooksAPI from './utils/BooksAPI'
import BookShelf from './BookShelf'
import {Route, Link} from 'react-router-dom'
import Search from './Search'

class BooksApp extends React.Component {

  state={
    books: [],
    showSearchPage: false
  }

  componentDidMount(){
    BooksAPI.getAll().then((books)=> {
      this.setState({books})
    })
  }

  onUpdate = (book, shelf) => {
    BooksAPI.update(book, shelf)
    .then(res => {
      return BooksAPI.getAll();
     })
     .then( books => {
       this.setState({books: books});
     });
  }

  render() {
    return (
      <div className="app">
        <Route path="/search" render={ ( {history} )=> (
          <Search 
            onUpdate={this.onUpdate}
            existingShelf={this.state.books}
          />
        )}/>
        <Route exact path="/" render={ () => ( 
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <BookShelf 
              key={this.state.books}
              books={this.state.books} 
              onUpdate={this.onUpdate}
            />
            <div className="open-search">
              <Link to='/search' onClick={()=> this.setState({ showSearchPage: true })}>Add a book</Link>
            </div>
          </div> 
        )}/>
      </div>
      )
  }
}

export default BooksApp
