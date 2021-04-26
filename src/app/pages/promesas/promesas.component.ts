import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styleUrls: []
})
export class PromesasComponent implements OnInit {

 

  constructor() { }

  ngOnInit(): void {

    this.getUsuarios().then(usuarios => {
      console.log(usuarios)
    })

    /*const promesas = new Promise( (resolve, reject)=>{

      if(false){
        resolve('Hola mundo');
      }else{
        reject("Hola salio mal algo")
      }
   
    })*/

   // promesas.then( (mensaje)=>{
      //console.log(mensaje);
   // }).catch(error => console.log('error promesa' , error))

    //console.log('fin Init');

  }

 
  getUsuarios(){

    const promesa = new Promise( resolve=>{

      fetch('https://reqres.in/api/users?page=2')
      .then(resp=>resp.json())
      .then(body => resolve(body.data) )

    } )
    
      
    return promesa;


  }

  


}
