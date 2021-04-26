import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';


@Component({
  selector: 'app-increment',
  templateUrl: './increment.component.html',
  styles: [
  ]
})
export class IncrementComponent implements OnInit  {
  ngOnInit() {
    this.btnClass = `btn ${this.btnClass}`;
  }

  @Input('valor') progreso : number = 10;
  @Input() btnClass: string = "btn-info";

  @Output() emiteValor : EventEmitter<number> = new EventEmitter();

 get getPorcentaje(){
    return `${this.progreso}%`
 }

 cambiarValor(valor: number){

    if(this.progreso >=100 && valor>0 ){
      this.emiteValor.emit(100);
      return this.progreso = 100;
    }

    if(this.progreso <=0 && valor < 0 ){
      this.emiteValor.emit(0);
      return this.progreso = 0;
    }

    this.progreso = this.progreso + valor;
    this.emiteValor.emit(this.progreso);
 }

 onChange(newValor:number){
    
  if( newValor >= 100){
    this.progreso = 100;
  }else if(newValor <=0){
    this.progreso = 0;
  }else{
    this.progreso =newValor ;
  }
  
  this.emiteValor.emit(this.progreso);
 }

}
