import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BooksService } from '../books/books.service';
import { AddBookComponent } from '../books/book/add-book/add-book.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  public isNavCollapsed = true;

  constructor(private bookService: BooksService, private modalService: NgbModal) {
  }

  addBook() {
    this.modalService.open(AddBookComponent);
  }

}
