import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

declare const gapi:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
     './styles.css'
  ]
})
export class LoginComponent implements OnInit {

  public formSubmitted = false;  
  public auth2: any;

  public loginForm = this.fb.group({
   
    email: [ localStorage.getItem('email') || '' , [ Validators.required, Validators.email ] ],
    password: ['', Validators.required],    
    remember: [ false ],

  })

  constructor( private router: Router, private fb: FormBuilder, private usuarioService: UsuariosService,  private ngZone:NgZone ) { }

  ngOnInit(): void {
    this.renderButton()
  }

  

  login(){

    this.usuarioService.login(this.loginForm.value)
                       .subscribe(resp=>{
                         
                        if(this.loginForm.get('remember').value){
                          localStorage.setItem('email', this.loginForm.get('email').value );
                         
                        }else{
                          localStorage.removeItem('email');
                        }
                        this.router.navigateByUrl('/');
                       },(err)=>{
                         Swal.fire('Error', err.error.msg,'error')
                       })
   //this.router.navigateByUrl('/');
  } 

//
  


   renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark'
     
    });

    this.startApp();
  }

   startApp = () =>{
      gapi.load('auth2', ()=>{
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      this.auth2 = gapi.auth2.init({
        client_id: '115583852563-b97lu8i6p9vaneden8edmuqv784d6a11.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        // Request scopes in addition to 'profile' and 'email'
        //scope: 'additional_scope'
      });
      this.attachSignin(document.getElementById('my-signin2'));
    });
  };

   attachSignin(element) {
   // console.log(element.id);
    this.auth2.attachClickHandler(element, {},
        (googleUser)=> {
          
            const id_token = googleUser.getAuthResponse().id_token;
            console.log(id_token);
            this.usuarioService.loginGoogle( id_token ).subscribe(resp=>{
              this.ngZone.run(()=>{
                this.router.navigateByUrl('/');
              })
             
            });
           
        }, (error)=> {
          alert(JSON.stringify(error, undefined, 2));
        });
  }

}
