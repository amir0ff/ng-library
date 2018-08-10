import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BooksService } from './books/books.service';
import { BooksModule } from './books/books.module';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AppRoutingModule } from './app-routing.module';
import { AboutComponent } from './about/about.component';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BooksModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule.forRoot(),
    AngularFontAwesomeModule,
    NgbCollapseModule
  ],
  providers: [BooksService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
