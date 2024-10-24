import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Page, PageRequest } from '../models/page';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RestUtil } from './rest-util';
import { Checkout } from '../models/checkout';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private readonly baseUrl = environment.backendUrl + '/api/checkout';

  constructor(
    private http: HttpClient,
  ) {
  }

  getCheckouts(filter: Partial<PageRequest>): Observable<Page<Checkout>> {
    const url = this.baseUrl + '/getCheckouts';
    const params = RestUtil.buildParamsFromPageRequest(filter);
    return this.http.get<Page<Checkout>>(url, {params});
  }

//   getBook(bookId: string): Observable<Book> {
//     const url = this.baseUrl + '/getBook';
//     const params = new HttpParams().set('bookId', bookId);
//     return this.http.get<Book>(url, {params});
//   }

//   saveBook(book: Book): Observable<void> {
//     const url = this.baseUrl + '/saveBook';
//     return this.http.post<void>(url, book);
//   }

//   deleteBook(bookId: string): Observable<void> {
//     const url = this.baseUrl + '/deleteBook';
//     const params = new HttpParams().set('bookId', bookId);
//     return this.http.delete<void>(url, {params});
//   }

}