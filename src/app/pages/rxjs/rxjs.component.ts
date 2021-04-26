import { Component, OnDestroy } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { retry, take,map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy {

  public intervalSubs:Subscription;

  constructor() {

   
    /*this.retornaObservable().pipe(
      retry(1)
    ).subscribe(
      valor => console.log('Subs:',valor),
      err => console.warn('error',err),
      ()=>console.log('obs finalizado')
    );*/

     this.intervalSubs =  this.retornaInterval().subscribe(
     // (valor) => console.log(valor)
         console.log
    );

   }
  ngOnDestroy(): void {
   this.intervalSubs.unsubscribe();
  }

   retornaInterval(): Observable<number>{

      const intervalo$ = interval(200).pipe( 
                                            //take(10),
                                            map(valor => { return valor+1 }),
                                            filter( valor => ( valor % 2===0 ) ? true : false )
                                             )
                                          

      return intervalo$;

   }

   retornaObservable(): Observable<number>{
      
    let i = -1;

    const obs$ = new Observable<number>( observer=>{
     
     const intervalo = setInterval( ()=>{

         i++;
         observer.next(i)

         if(i=== 4){
           clearInterval(intervalo);
           observer.complete();
         }

         if(i===2){
        
           observer.error('i llego a 2');
         }

         

      },1000 )

    } );

    return obs$;

   }

   


}
