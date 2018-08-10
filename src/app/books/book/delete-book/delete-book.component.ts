import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BooksService } from '../../books.service';
import { Book } from '../book.model';

@Component({
  selector: 'app-delete-book',
  templateUrl: './delete-book.component.html',
  styleUrls: ['./delete-book.component.scss']
})
export class DeleteBookComponent {
  @Input() book: Book;

  constructor(private bookService: BooksService, public activeModal: NgbActiveModal) {
  }

  onDeleteBook(bookId: string) {
    // console.log('Deleted books id:', bookId);
    this.bookService.deleteBook(bookId);
    this.activeModal.dismiss();
  }

}
