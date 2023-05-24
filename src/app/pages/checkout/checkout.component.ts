import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { switchMap, tap } from 'rxjs';
import { Details, Order } from 'src/app/shared/interfaces/order.interface';
import { Store } from 'src/app/shared/interfaces/stores.interfaces';
import { DataService } from 'src/app/shared/services/data.service';
import { Product } from '../products/interfaces/product.interface';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
  model = {
    name: 'joel',
    store: '',
    shippingAddress: '',
    city: ''
  };

  isDelivery = false;
  cart: Product[] = [];
  stores: Store[] = [];

  constructor(private dataSvc: DataService, private shoppingCartSvc: ShoppingCartService) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getStores();
    this.getDataCart();
    this.prepareDetails();
  }
  onPickupOrDelivery(value:boolean): void {
    this.isDelivery = value;
  }

  onSubmit({value: formData}:NgForm): void {
    console.log('Guardar', formData);
    const data: Order = {
      ...formData,
      date: this.getCurrentDay,
      pickup: this.isDelivery
    }
    this.dataSvc.saveOrder(data)
    .pipe(
        tap( res => console.log(res) ),
        switchMap( (order) => {
          const orderId = order.id; 
          const details = this.prepareDetails();
          return this.dataSvc.saveDetailsOrder({details, orderId});
        }),
        tap(res => console.log('Finish ->', res)),
      )
    .subscribe();
  }

  getStores(): void {
    this.dataSvc.getStores()
    .pipe(
      tap( (stores:Store[]) => this.stores = stores ))
    .subscribe()
  }

  private getCurrentDay():string {
    return new Date().toLocaleDateString();
  }

  private prepareDetails(): Details[] {
    const details :  Details[] = [];
    this.cart.forEach((product:Product) => {
      const {id:productId, name:productName, qty:quantity, stock}= product;
      details.push({productId, productName, quantity});
    });
    return details;  
  }

  private getDataCart(): void {
    this.shoppingCartSvc.cartAction$
    .pipe(
        tap((products:Product[]) => this.cart = products)
      )
    .subscribe()
  }
}