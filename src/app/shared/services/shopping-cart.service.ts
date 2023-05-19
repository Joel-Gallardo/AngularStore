import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Product } from "src/app/pages/products/interfaces/product.interface";

@Injectable({
    providedIn: 'root'
  })
export class ShoppingCartService {
    products :Product[] = [];

    private cartSubject = new Subject<Product[]>();
    private totalSubject = new Subject<number>();
    private quantitySubject = new Subject<number>();


    get totalAction$(): Observable<number> {
        return this.totalSubject.asObservable();
    }
    get quantityAction$(): Observable<number> {
        return this.quantitySubject.asObservable();
    }
    get cartAction$(): Observable<Product[]> {
        return this.cartSubject.asObservable();
    }

    updateCard(product:Product): void{
        this.addTocard(product);
        this.quantityProducts();
        this.calcTotal();
    }

    private addTocard(product:Product): void{
        this.products.push(product);
        this.cartSubject.next(this.products)
    }
    private quantityProducts(): void {
        const quantity = this.products.length;
        this.quantitySubject.next(quantity);
    }
    private calcTotal(): void {
        const total = this.products.reduce((acc, prod) => acc += prod.price, 0);
        this.totalSubject.next(total);
    }
}