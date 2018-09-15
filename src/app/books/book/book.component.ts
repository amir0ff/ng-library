import { Component, OnInit, Input } from '@angular/core';
import { EditBookComponent } from './edit-book/edit-book.component';
import { DeleteBookComponent } from './delete-book/delete-book.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  @Input() booksList;

  constructor(private modalService: NgbModal) {
  }

  ngOnInit() {
  }

  onEditBook(selectedBook) {
    const editBookModalRef = this.modalService.open(EditBookComponent);
    editBookModalRef.componentInstance.book = {
      id: selectedBook.id,
      title: selectedBook.title,
      author: selectedBook.author,
      date: selectedBook.date
    };
  }

  onDeleteBook(selectedBook) {
    const deleteBookModalRef = this.modalService.open(DeleteBookComponent);
    deleteBookModalRef.componentInstance.book = {
      id: selectedBook.id,
      title: selectedBook.title
    };
  }

}
