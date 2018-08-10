import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BooksService } from '../../books.service';
import { Book } from '../book.model';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {
  booksList: Book[];
  newBook: object;
  showFormError = false;
  showDuplicateError = false;

  constructor(private bookService: BooksService, public activeModal: NgbActiveModal) {
  }

  ngOnInit() {
    this.fetchBooks();
  }

  fetchBooks() {
    this.bookService.getBooks().subscribe((data: Book) => {
      this.booksList = data['books'];
    });
  }

  onAddBook(bookAddForm: NgForm) {
    // Loop through books list and check for matching title and id number
    for (let i = 0; i < this.booksList.length; i++) {
      if (this.booksList[i].id === bookAddForm.value.newBookId || this.booksList[i].title === bookAddForm.value.newBookTitle) {
        // console.log('A books with the same id or title already exists!');
        this.showDuplicateError = true;
        setTimeout(() => {
          this.showDuplicateError = false;
        }, 3500);
        return;
      }
    }
    if (bookAddForm.valid) {
      // console.log('Book added:', bookAddForm.value);
      this.activeModal.dismiss();
      // Remove all non-word and white space characters from the book title
      // "\w" for word characters "\s" for white space
      // Reference: https://www.w3schools.com/jsref/jsref_obj_regexp.asp
      const formattedTitle = bookAddForm.value.newBookTitle.replace(/[^\w\s]/gi, '');
      this.newBook = {
        id: bookAddForm.value.newBookId,
        title: formattedTitle,
        author: bookAddForm.value.newBookAuthor,
        publishDate: bookAddForm.value.newBookPublishDate
      };
      this.bookService.addBook(this.newBook);
    } else {
      this.showFormError = true;
      setTimeout(() => {
        this.showFormError = false;
      }, 3500);
    }

  }

}
