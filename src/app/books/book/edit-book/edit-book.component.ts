import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BooksService } from '../../books.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss']
})
export class EditBookComponent {
  showFormError = false;

  constructor(private bookService: BooksService, public activeModal: NgbActiveModal) {
  }

  onSaveEditedBook(bookId, bookEditForm: NgForm) {
    if (bookEditForm.valid) {
      // console.log('Book edited:', 'id: ' + bookId, bookEditForm.value);
      this.activeModal.dismiss();
      // Remove all non-word and white space characters from the book title
      // "\w" for word characters "\s" for white space
      // Reference: https://www.w3schools.com/jsref/jsref_obj_regexp.asp
      const formattedTitle = bookEditForm.value.bookTitle.replace(/[^\w\s]/gi, '');
      this.bookService.updateBook({
        id: bookId,
        title: formattedTitle,
        author: bookEditForm.value.bookAuthor,
        publishDate: bookEditForm.value.bookPublishDate
      });
    } else {
      this.showFormError = true;
      setTimeout(() => {
        this.showFormError = false;
      }, 3500);
    }
  }
}
