import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Checkout } from 'src/app/models/checkout';
import { Page } from 'src/app/models/page';
import { CheckoutService } from '../../services/checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  checkouts$!: Observable<Page<Checkout>>;

  // I should Have a type thingy here of 
  // page<checkout>

  // and then render that page

  constructor(
    private CheckoutService : CheckoutService,
  ) {
  }


  ngOnInit(): void {
    // TODO this observable should emit books taking into consideration pagination, sorting and filtering options.
    this.checkouts$ = this.CheckoutService.getCheckouts({});

  }

}
