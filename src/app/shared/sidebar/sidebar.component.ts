import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.models';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent  {

  public usuario : Usuario;

  menuItems :any[];
  constructor( private sidebarService:SidebarService, private usuarioService: UsuariosService ) {
    this.menuItems = sidebarService.menu;
    this.usuario = usuarioService.usuario;
   }

   logout(){
    this.usuarioService.logout();
  }

}
