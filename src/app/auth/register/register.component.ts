import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { repeat } from 'rxjs/operators';
import { UsuariosService } from 'src/app/services/usuarios.service';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [
    './styles.css'
  ]
})
export class RegisterComponent  {

public formSubmitted = false;  

public registerForm = this.fb.group({

  nombre: ['', Validators.required ],
  email: ['', [ Validators.required, Validators.email ] ],
  password: ['', Validators.required],
  password2: ['', Validators.required],
  terminos: [ false, Validators.required ]

},{
  validators: this.passwordsEquals('password','password2')
})

  constructor( private fb: FormBuilder , private usuarioService: UsuariosService, private router : Router ) { }

  crearUsuario(){
    this.formSubmitted = true;

    console.log(this.registerForm);

    if(this.registerForm.invalid){
      console.log('Error en el formulario')
    }

    //Posteo de formulario

    this.usuarioService.crearUsuario( this.registerForm.value )
                        .subscribe(resp=>{
                          this.router.navigateByUrl('/');
                         // console.log(repeat)
                         // console.log('Usuario Creado');
                        }, (err)=>{
                          Swal.fire('Error', err.error.msg,'error')
                        })

  }

  campoNovalido( campo:string ):boolean{
      if(this.registerForm.get(campo).invalid && this.formSubmitted){
        return true;
      }else{
        return false;
      }

  }

  passwordInvalid(){

    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;

    if( (pass1 !== pass2) && this.formSubmitted ){
      return true;

    }{
      return false
    }

  }

  passwordsEquals( pass1:string, pass2:string ){

    return ( formGroup:FormGroup )=>{

      const pass1Control = formGroup.get(pass1);
      const pass2Control = formGroup.get(pass2);

      if( pass1Control.value === pass2Control.value ){
        pass2Control.setErrors(null);
      }else{
        pass2Control.setErrors({ notEqualPasswords : true });
      }

    }

  }

  aceptaTerminos(){

    return !this.registerForm.get('terminos').value && this.formSubmitted

  }

  
}
