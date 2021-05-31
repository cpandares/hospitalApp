import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.models';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {

  public profileForm : FormGroup;
  public usuario : Usuario;
  public uploadPhoto : File;
  public imgTemp : any = null;

  constructor( private fb: FormBuilder, private usuarioService:UsuariosService, private fileUploadService:FileUploadService ) { 
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {

    this.profileForm = this.fb.group({

      nombre : [ this.usuario.nombre, Validators.required ],
      email : [ this.usuario.email, [ Validators.required, Validators.email ] ]

    })
  }

  updateProfile(){
    this.usuarioService.updateProfile(this.profileForm.value).subscribe(resp=>{
      //console.log(resp);
      const { nombre, email } = this.profileForm.value;
      this.usuario.nombre = nombre;
      this.usuario.email = email;
      Swal.fire('Great','User updated','success');
    },(err)=>{
      
      Swal.fire('No Updated',err.error.msg,'error');
    })
  }


  changeImage(file:File){
    //console.log(file)
    this.uploadPhoto = file;

    if(!file){ return this.imgTemp = null }

    const reader = new FileReader();

    reader.readAsDataURL( file );

    reader.onloadend = ()=>{

        this.imgTemp = reader.result;

    }

  }

  subirImagen(){
    this.fileUploadService.updatePhoto( this.uploadPhoto,'usuarios',this.usuario.uid )
                          .then( img => { this.usuario.img = img 
                                      Swal.fire('Great','User Photo updated','success')
                          } )
                

     
  }

}
