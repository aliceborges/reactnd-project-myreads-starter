import React from 'react'
import sortBy from 'sort-by'
import Book from './Book'

const BookShelf= React.createClass({

	render(){

		const { books, onUpdate }=this.props

		let currentlyReading
		currentlyReading=books.filter((book)=> book.shelf==='currentlyReading').sort(sortBy('title'))


		let wantToRead
		wantToRead=books.filter((book)=> book.shelf==='wantToRead').sort(sortBy('title'))

		let read
		read=books.filter((book)=> book.shelf==='read').sort(sortBy('title'))

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
                            key={book.id}
                            onUpdate={onUpdate}
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

});

export default BookShelf