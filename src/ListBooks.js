import React, {Component} from 'react'
import sortBy from 'sort-by'

class ListBooks extends Component{

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
                        <li key={book.id}>
                          <div className="book">
                            <div className="book-top">
                              <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url('+ book.imageLinks.smallThumbnail +')' }}></div>
                              <div className="book-shelf-changer">
                                <select>
                                  <option value="none" disabled>Move to...</option>
                                  <option value="currentlyReading">Currently Reading</option>
                                  <option value="wantToRead">Want to Read</option>
                                  <option value="read">Read</option>
                                  <option value="none">None</option>
                                </select>
                              </div>
                            </div>
                            <div className="book-title"> {book.title} </div>
                            <div className="book-authors"> {book.authors} </div>
                          </div>
                        </li>
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

export default ListBooks