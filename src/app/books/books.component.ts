import { Component, OnDestroy, OnInit } from '@angular/core';
import { Book } from './book/book.model';
import { BooksService } from './books.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit, OnDestroy {
  booksList: Book[] = [];
  bookLoading = true;
  booksloadingProgress = 0;
  editedBookSubscription: Subscription;
  newBookSubscription: Subscription;
  deletedBookSubscription: Subscription;

  constructor(private bookService: BooksService) {
  }

  private interval = setInterval(() => {
    this.booksloadingProgress++;
  }, 100);

  ngOnInit() {
    this.fetchBooks();
    this.editedBookSubscription = this.bookService.editedBook.subscribe(editedBook => {
      this.updateBook(editedBook);
    });
    this.newBookSubscription = this.bookService.newBook.subscribe(newBook => {
      this.addBook(newBook);
    });
    this.deletedBookSubscription = this.bookService.deletedBook.subscribe(deletedBook => {
      this.deleteBook(deletedBook);
    });
  }

  ngOnDestroy() {
    this.editedBookSubscription.unsubscribe();
    this.newBookSubscription.unsubscribe();
    this.deletedBookSubscription.unsubscribe();
  }

  fetchBooks() {
    this.bookService.getBooks().subscribe((data: Book) => {
      // Set a time out to mimic real server fetch
      setTimeout(() => {
        this.booksList = data['books'];
        clearInterval(this.interval);
        this.bookLoading = false;
      }, 1000);
    });
  }

  updateBook(editedBook) {
    // Loop though existing books list
    for (let i = 0; i < this.booksList.length; i++) {
      // Match existing books with edited one
      if (this.booksList[i].id === editedBook.id) {
        // Modify books's title, author name and publish date
        this.booksList[i].title = editedBook.title;
        this.booksList[i].author = editedBook.author;
        this.booksList[i].date = editedBook.date;
        return;
      }
    }
  }

  addBook(newBook) {
    this.booksList.push(newBook);
  }

  deleteBook(deletedBook) {
    // Loop though existing books list
    for (let i = 0; i < this.booksList.length; i++) {
      // Match existing books with deleted one
      if (this.booksList[i].id === deletedBook) {
        // console.log('Book deleted: ', this.booksList[i]);
        this.booksList = this.booksList.filter(element => element.id !== deletedBook);
      }
    }
  }

}
