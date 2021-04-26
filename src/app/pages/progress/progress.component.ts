import { Component } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css'
  ]
})
export class ProgressComponent  {

 progreso1:number = 45;
 progreso2:number = 25;

 get getPorcentaje1(){
   return `${this.progreso1}%`;
 }

 
 get getPorcentaje2(){
  return `${this.progreso2}%`;
}

cambioValorProgress( valor:number ){
  console.log("hey" , valor);
}

}
