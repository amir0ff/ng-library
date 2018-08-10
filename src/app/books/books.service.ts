import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable()
export class BooksService {
  editedBook = new Subject;
  newBook = new Subject;
  deletedBook = new Subject;

  constructor(private http: HttpClient) {
  }

  getBooks() {
    return this.http.get('./assets/data/books.json');
  }

  editBook(editedBook) {
    // console.log('Edited books data received:', editedBook);
    this.editedBook.next(editedBook);
  }

  addBook(newBook) {
    // console.log('New books data received:', newBook);
    this.newBook.next(newBook);
  }

  deleteBook(deletedBook) {
    // console.log('Deleted books data received:', deletedBook);
    this.deletedBook.next(deletedBook);
  }

}
