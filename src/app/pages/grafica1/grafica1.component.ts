import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component  {

 public labels: string[] = ['pan','galletas','refresco'];

 public data : number[] = [20,30,50];

}
