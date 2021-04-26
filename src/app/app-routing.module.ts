import { NgModule } from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { AuthsRoutingModule } from './auth/auth.routing';
import { PagesRoutingModule } from './pages/pages.routing.module';

import { NopagesfoundComponent } from './nopagesfound/nopagesfound.component';



const routes: Routes = [
  
 
  { path:'', redirectTo:'/dashboard',pathMatch:'full' },
  { path:'**', component:NopagesfoundComponent }
]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    PagesRoutingModule,
    AuthsRoutingModule
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
