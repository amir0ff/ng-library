import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BooksService } from '../../books.service';
import { Book } from '../book.model';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss']
})
export class EditBookComponent {
  @Input() book: Book;
  editedBook: object;
  showFormError = false;

  constructor(private bookService: BooksService, public activeModal: NgbActiveModal) {
  }

  onEditBook(bookId: number, bookEditForm: NgForm) {
    if (bookEditForm.valid) {
      this.activeModal.dismiss();
      // console.log('Book edited:', 'id: ' + bookId, bookEditForm.value);
      this.editedBook = {
        id: bookId,
        title: bookEditForm.value.bookTitle,
        author: bookEditForm.value.bookAuthor,
        publishDate: bookEditForm.value.bookPublishDate
      };
      this.bookService.editBook(this.editedBook);
    } else {
      this.showFormError = true;
      setTimeout(() => {
        this.showFormError = false;
      }, 3500);
    }
  }
}
