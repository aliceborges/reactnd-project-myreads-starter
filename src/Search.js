import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from './utils/BooksAPI'
import { Debounce } from 'react-throttle';

class Search extends Component{

	state={
		query: '',
	  books: []
	}

	updateQuery = (query) => {
		if(!query){
			this.setState({query:'', books:[]})
		}
		else{
			this.setState({query:query.trim()});
			BooksAPI.search(this.state.query).then((books)=> {
				if(books.error){
					this.setState({books:[]})
				}
				else{
		    this.setState({books})
		  	}
		  })
		}
	}

	render(){
		return(
			<div className="search-books">
			  <div className="search-books-bar">
			    <Link className="close-search" to='/'>Close</Link>
			    <div className="search-books-input-wrapper">
			    	<Debounce time="10" handler="onChange">
				      <input 
				      	type="text" 
				      	placeholder="Search by title or author"
				      	onChange={(event)=>this.updateQuery(event.target.value)}
				      />
			      </Debounce>
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