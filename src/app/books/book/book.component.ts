import { Component, OnInit, Input } from '@angular/core';
import { EditBookComponent } from './edit-book/edit-book.component';
import { BooksService } from '../books.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  @Input() booksList;
  deleteBookModalRef: any;

  constructor(private modalService: NgbModal, private bookService: BooksService) {
  }

  ngOnInit() {
  }

  onEditBook(selectedBook) {
    const editBookModalRef = this.modalService.open(EditBookComponent);
    editBookModalRef.componentInstance.book = {
      id: selectedBook.id,
      title: selectedBook.title,
      author: selectedBook.author,
      publishDate: selectedBook.publishDate
    };
  }

  onDeleteBook(deleteBookTempRef) {
    this.deleteBookModalRef = this.modalService.open(deleteBookTempRef);
  }

  onConfirmDeleteBook(bookId: string) {
    // console.log('Deleted books id:', bookId);
    this.bookService.deleteBook(bookId);
    this.deleteBookModalRef.close();
  }

}
