import React from 'react';
import './App.css'
import * as BooksAPI from './utils/BooksAPI'
import BookShelf from './BookShelf'
import {Route, Link} from 'react-router-dom'
import Search from './Search'

class BooksApp extends React.Component {
  // state = {
  //   *
  //    * TODO: Instead of using this state variable to keep track of which page
  //    * we're on, use the URL in the browser's address bar. This will ensure that
  //    * users can use the browser's back and forward buttons to navigate between
  //    * pages, as well as provide a good URL they can bookmark and share.
     
  //   showSearchPage: false
  // }

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
            //onSearch={this.search}
          />
        )}/>
        <Route exact path="/" render={ () => ( 
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <BookShelf 
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
