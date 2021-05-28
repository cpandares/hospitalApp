import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';

import { UsuariosService } from '../services/usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private usuarioService: UsuariosService, private router: Router ) { }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {     
       
    return this.usuarioService.validateToken()
                .pipe(
                  tap( isAuth=>{
                    if(!isAuth){
                      this.router.navigateByUrl('/login');
                    }
                  } )
                )
  }
  
}
