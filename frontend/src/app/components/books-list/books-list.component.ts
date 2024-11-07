import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Observable } from 'rxjs';
import { Page, PageRequest } from '../../models/page';
import { Book } from '../../models/book';
import { RouterLink } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-books-list',
  // standalone : true,
  // imports: [RouterLink, BrowserModule],
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})



export class BooksListComponent implements OnInit {
  books$!: Observable<Page<Book>>;
  pageRequest !: PageRequest;
  pageIndex : number = 0
  pageSize : number = 20
  totalPages !: Number;

  dropdownValues: number[] = [1, 5, 10, 20, 50, 100];
  // selectedValue: number = 1; // default selected value

  onSelectionChange(value: number) {
    this.pageSize = value;
    this.requestBooks()
  }


  constructor(
    private bookService: BookService,
  ) {
  }

  ngOnInit(): void {
    // TODO this observable should emit books taking into consideration pagination, sorting and filtering options.

    //TODO: getBooks gets a filter from somwehre that it uses for pagination.

    //in FE add : page size, page index, sort, direction (asc desc)
    this.requestBooks()
  }

  incrementPageIndex(){
    this.pageIndex += 1
    this.requestBooks()
  }
  
  
  decreasePageIndex(){
    this.pageIndex -= 1
    this.requestBooks()
  }

  changePageSize(size :number){
    this.pageSize = size;
    this.requestBooks();
  }

  requestBooks(){
    this.pageRequest = {pageIndex : this.pageIndex, pageSize : this.pageSize} as PageRequest;

    this.books$ = this.bookService.getBooks(this.pageRequest);

    this.books$.subscribe((page: Page<Book>) => {
      this.totalPages = page.totalPages;
    });
  }
}
