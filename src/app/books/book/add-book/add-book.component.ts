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
  newBookCover = null;

  constructor(private bookService: BooksService, public activeModal: NgbActiveModal) {
  }

  ngOnInit() {
    this.fetchBooks();
  }

  getBookCover() {
    // @ts-ignore
    const file = document.querySelector('#newBookCover').files;
    if (file.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(file[0]);
      reader.onload = () => {
        this.newBookCover = reader.result;
        // console.log(reader.result);
      };
      reader.onerror = (error) => {
        console.log('Error: ', error);
      };
    }
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
    if (this.newBookCover && bookAddForm.valid) {
      // console.log('Book added:', bookAddForm.value, 'newBookCover:', this.newBookCover);
      this.activeModal.dismiss();
      // Remove all non-word and white space characters from the book title
      // "\w" for word characters "\s" for white space
      // Reference: https://www.w3schools.com/jsref/jsref_obj_regexp.asp
      const formattedTitle = bookAddForm.value.newBookTitle.replace(/[^\w\s]/gi, '');
      this.bookService.addBook({
        id: bookAddForm.value.newBookId,
        title: formattedTitle,
        author: bookAddForm.value.newBookAuthor,
        date: bookAddForm.value.newBookPublishDate,
        cover: this.newBookCover
      });
    } else {
      this.showFormError = true;
      setTimeout(() => {
        this.showFormError = false;
      }, 3500);
    }
  }

}
