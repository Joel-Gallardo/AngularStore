import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JoelComponent } from './pages/joel/joel.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { HeroesListComponent } from './pages/heroes-list/heroes-list.component';

const routes: Routes = [
  { path: 'joel', component: JoelComponent },
  { path: 'heroes-list', component: HeroesListComponent },
  { path: '', redirectTo: '/joel', pathMatch: 'full' },
  { path: 'products', loadChildren: () => import('./pages/products/products.module').then(m => m.ProductsModule) },
  //Wild Card Route for 404 request
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
