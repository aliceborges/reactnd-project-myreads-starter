import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from './utils/BooksAPI'

class Search extends Component{

	state={
		query: '',
	  books: []
	}

	updateQuery = (query) => {
		this.setState({query:query.trim()});
		BooksAPI.search(this.state.query).then((books)=> {
	    this.setState({books})
	  })
	}

	render(){


		//const { onUpdate }=this.props

		return(
			<div className="search-books">
			  <div className="search-books-bar">
			    <Link className="close-search" to='/'>Close</Link>
			    <div className="search-books-input-wrapper">
			      <input 
			      	type="text" 
			      	placeholder="Search by title or author"
			      	onChange={(event)=>this.updateQuery(event.target.value)}
			      />
			    </div>
			  </div>
			  <div className="search-books-results">
			    <ol className="books-grid">
				    {this.state.books.map((book)=>(
				    	<Book
				    		key={book.id}
				    		onUpdate={this.props.onUpdate}
				    		book={book}
				    	/>
				    ))}
			    </ol>
			  </div>
			</div>
		)
	}
}

export default Search