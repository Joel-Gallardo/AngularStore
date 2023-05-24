import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TankYouPageComponent } from './tank-you-page.component';

const routes: Routes = [{ path: '', component: TankYouPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TankYouPageRoutingModule { }
