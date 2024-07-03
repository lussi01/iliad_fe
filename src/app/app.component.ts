import { Component, OnInit } from '@angular/core';
import { OrderService } from './order.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  orders: any;
  fakeOrder: any = {
    nome: 'Fake Name',
    cognome: 'Fake Surname',
    data: '01/01/2023 12:00:00',
    'prodotto.nome': 'Fake Product'
  };

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.getOrders();
  }

  getOrders() {
    this.orderService.getOrders()
      .pipe(
        catchError(error => {
          console.error('Error fetching orders:', error);
          return of([this.fakeOrder]); // Return a fake order in case of error
        })
      )
      .subscribe(data => {
        this.orders = data;
        console.log(this.orders);
      });
  }
}
