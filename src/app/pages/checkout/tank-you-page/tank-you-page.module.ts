import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TankYouPageRoutingModule } from './tank-you-page-routing.module';
import { TankYouPageComponent } from './tank-you-page.component';


@NgModule({
  declarations: [
    TankYouPageComponent
  ],
  imports: [
    CommonModule,
    TankYouPageRoutingModule
  ]
})
export class TankYouPageModule { }
