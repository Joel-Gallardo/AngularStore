import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'App tittle';
  
  getName(): void {
    console.log('Hola desde metodo getName en app.component.ts')
  } 
}
