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
  showFormError = false;
  showDuplicateError = false;
  bookCover = null;

  constructor(private bookService: BooksService, public activeModal: NgbActiveModal) {
  }

  ngOnInit() {
    this.fetchBooks();
  }

  getBookCover() {
    // @ts-ignore
    const files = document.querySelector('#newBookCover').files;
    if (files.length > 0) {
      this.convertToBase64(files[0]);
    }
  }

  convertToBase64(bookCover) {
    const reader = new FileReader();
    reader.readAsDataURL(bookCover);
    reader.onload = () => {
      // console.log(reader.result);
      this.bookCover = reader.result;
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }


  fetchBooks() {
    this.bookService.getBooks().subscribe((data: Book) => {
      this.booksList = data['books'];
    });
  }

  onSaveNewBook(bookAddForm: NgForm) {
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
    if (this.bookCover && bookAddForm.valid) {
      // console.log('Book added:', bookAddForm.value, 'newBookCover:', this.bookCover);
      this.activeModal.dismiss();
      // Remove all non-word and white space characters from the book title
      // "\w" for word characters "\s" for white space
      // Reference: https://www.w3schools.com/jsref/jsref_obj_regexp.asp
      const formattedTitle = bookAddForm.value.newBookTitle.replace(/[^\w\s]/gi, '');
      this.bookService.addBook({
        id: bookAddForm.value.newBookId,
        title: formattedTitle,
        author: bookAddForm.value.newBookAuthor,
        publishDate: bookAddForm.value.newBookPublishDate,
        cover: this.bookCover
      });
    } else {
      this.showFormError = true;
      setTimeout(() => {
        this.showFormError = false;
      }, 3500);
    }
  }

}
