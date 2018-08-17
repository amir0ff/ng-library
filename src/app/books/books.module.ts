import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BooksComponent } from './books.component';
import { BookComponent } from './book/book.component';
import { AddBookComponent } from './book/add-book/add-book.component';
import { EditBookComponent } from './book/edit-book/edit-book.component';
import { DeleteBookComponent } from './book/delete-book/delete-book.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DateTransformPipe } from './utilities/dateTransform.pipe';

@NgModule({
  declarations: [
    BooksComponent,
    BookComponent,
    EditBookComponent,
    AddBookComponent,
    DateTransformPipe,
    DeleteBookComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule.forRoot(),
    AngularFontAwesomeModule
  ],
  exports: [
    BooksComponent
  ],
  entryComponents: [EditBookComponent, AddBookComponent, DeleteBookComponent]
})
export class BooksModule {
}
