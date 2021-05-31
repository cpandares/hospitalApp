import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';


import { loginForm } from '../interfaces/login.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { Usuario } from '../models/usuario.models';

declare const gapi:any;

const baseUrl = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  public auth2: any;

  public usuario : Usuario;

  constructor( private http: HttpClient, private router : Router, private ngZone:NgZone ) { 
    this.googleInit();
  }

  get token():string{
   return  localStorage.getItem('token') || '';
  }

  get uid():string{
    return this.usuario.uid || '';
  }

  googleInit(){


    gapi.load('auth2', ()=>{
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      this.auth2 = gapi.auth2.init({
        client_id: '115583852563-b97lu8i6p9vaneden8edmuqv784d6a11.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        // Request scopes in addition to 'profile' and 'email'
        //scope: 'additional_scope'
      });
     
    });

  }

  logout(){
    localStorage.removeItem('token');
   

    this.auth2.signOut().then( ()=> {

      this.ngZone.run(()=>{
        this.router.navigateByUrl('/login');
      })
      
    })

  }

  validateToken():Observable<boolean>{

  

    return this.http.get(`${ baseUrl }/login/renew`,{
      headers: {
        'x-token' : this.token
      }
    }).pipe(
      map((resp :any)=>{

        console.log(resp)

        const { email, google, img='', nombre, role, uid  } = resp.usuario;

        this.usuario = new Usuario(
         nombre, email, '', role, google, img, uid
        )
      
        localStorage.setItem('token', resp.token);

        return true;
      }),
    
      catchError( error => of(false) )
    )

  }

  crearUsuario( formData: RegisterForm ){

      return this.http.post(`${ baseUrl }/usuarios`,formData).pipe(
              tap( (resp : any)=>{
              localStorage.setItem('token', resp.token)
              } )
            )

  }

  updateProfile( data: { nombre:string, email:string, role:string} ){

    data = {
      ...data,
      role: this.usuario.role
    }

    return this.http.put(`${ baseUrl }/usuarios/${this.uid}`,data, {
      headers: {
        'x-token' : this.token
      }
    })

  }

      login( formData: loginForm ){

        return this.http.post(`${ baseUrl }/login`, formData )
                    .pipe(
                      tap( (resp : any)=>{
                      localStorage.setItem('token', resp.token)
                      } )
                    )

    }

    loginGoogle( token ){

      return this.http.post(`${ baseUrl }/login/google`,{ token } )
                  .pipe(
                    tap( (resp : any)=>{
                     localStorage.setItem('token', resp.token)
                    } )
                  )
  
  }

}
