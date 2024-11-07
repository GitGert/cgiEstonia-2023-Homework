import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Checkout } from 'src/app/models/checkout';
import { Page, PageRequest } from 'src/app/models/page';
import { CheckoutService } from '../../services/checkout.service';
import { map } from 'rxjs/operators';


@Component({
  // standalone : true,
  selector: 'app-checkout',
  // imports: [RouterLink, BrowserModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})

export class CheckoutComponent {

  checkouts$!: Observable<Page<Checkout>>;
  sortedByDueDateAsc : boolean = false;
  pageRequest !: PageRequest;
  pageIndex : number = 0
  pageSize : number = 20
  totalPages !: Number;

  onSelectionChange(value: number) {
    this.pageSize = value;
    this.requestCheckouts()
  }

  dropdownValues: number[] = [1, 5, 10, 20, 50, 100];

  incrementPageIndex(){
    this.pageIndex += 1
    this.requestCheckouts()
  }
  
  decreasePageIndex(){
    this.pageIndex -= 1
    this.requestCheckouts()
  }

  changePageSize(size :number){
    this.pageSize = size;
    this.requestCheckouts();
  }

  // I should Have a type thingy here of 
  // page<checkout>

  // and then render that page

  constructor(
    private CheckoutService : CheckoutService,
  ) {
  }
  // Using backend api endpoint /getCheckouts, also implement the checkouts view. Support paging and sorting for both views

  // Implement individual book and checkout view, support basic CRUD operations, implement checking out and returning books

  // I am assuming that in the cheechout view It should be books for one person and what they want to check out...?

  // so it should be possible as an user to clikc on a add to checkout button and then a book that is not currently rented out will be temporarily saved in the localhost in the cart.
  // then there is a tab for checkout and the user can go there, see the books they have added there and then request to get check out all of these books for themselves.


// oh actually GETCHECKOUTS sounds like an admin panel view for all the books that have been given out. so this just needs to be a basic view of all the data...
// mby just basic data and then later it will be possible to click on it and then it opens up a more detailed view and you can do stuff there. If not then just show all data
// or all relevant data.


  ngOnInit(): void {
    this.checkouts$ = this.CheckoutService.getCheckouts({});
  }


  requestCheckouts(){
    this.pageRequest = {pageIndex : this.pageIndex, pageSize : this.pageSize} as PageRequest;

    this.checkouts$ = this.CheckoutService.getCheckouts(this.pageRequest);

    this.checkouts$.subscribe((page: Page<Checkout>) => {
      this.totalPages = page.totalPages;
    });
  }

  orderByDueDate(){
    // .pipe is from angular 17.
    this.checkouts$ = this.checkouts$.pipe(
      map((page: Page<Checkout>) => {
        const sortedContent = [...page.content]; // Clone to avoid mutating the original
        if (this.sortedByDueDateAsc){ //IF was previously sorted in ascending order, switch to desc
          sortedContent.sort((a: Checkout, b: Checkout) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime());
        }else{
          sortedContent.sort((a: Checkout, b: Checkout) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
        }
        return { ...page, content: sortedContent }; // Return a new page object with sorted content
      })
    );
    this.sortedByDueDateAsc = !this.sortedByDueDateAsc
  }
  orderByCheckedOutDate(){ 
  }
}
