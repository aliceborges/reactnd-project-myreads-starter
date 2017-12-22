import React, {Component} from 'react'
import sortBy from 'sort-by'
import Book from './Book'

class BookShelf extends Component{

	render(){

		const { books }=this.props

		let currentlyReading
		currentlyReading=books.filter((book)=> book.shelf==='currentlyReading')
    currentlyReading.sort(sortBy('title'))


		let wantToRead
		wantToRead=books.filter((book)=> book.shelf==='wantToRead')
    wantToRead.sort(sortBy('title'))

		let read
		read=books.filter((book)=> book.shelf==='read')
    read.sort(sortBy('title'))

    let categories
    categories=[
          {
                name: 'Currently Reading',
                field: currentlyReading
          },
          {
                name: 'Want to Read',
                field: wantToRead
          },
          {
                name: 'Read',
                field: read
          }
    ]

		return(
      <div className="list-books-content">
          <div>
            {categories.map((category)=> (
                  <div className="bookshelf" key={category.name} >
                    <h2 className="bookshelf-title"> { category.name } </h2>
                    <div className="bookshelf-books">
                      <ol className="books-grid">
                        { category.field.map((book)=> (
                          <Book 
                            onUpdate={this.props.onUpdate}
                            book={book}
                          />
                        )) }
                      </ol>
                    </div>
                  </div>
            ))}
          </div>
    </div>           
	)
	}

}

export default BookShelf