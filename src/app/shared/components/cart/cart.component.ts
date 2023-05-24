import {Component} from "@angular/core"
import { ShoppingCartService } from "../../services/shopping-cart.service"

@Component({
    selector:'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  quantity$ = this.shoppingCartSVC.quantityAction$
  total$ = this.shoppingCartSVC.totalAction$
    
  constructor(private shoppingCartSVC: ShoppingCartService) { }
}