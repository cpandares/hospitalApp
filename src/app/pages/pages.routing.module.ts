import { NgModule } from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { AuthGuard } from '../guard/auth.guard';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { ProfileComponent } from './profile/profile.component';
import { ProgressComponent } from './progress/progress.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';


const routes: Routes = [
    { 
        path:'dashboard', 
        component:PagesComponent,
        canActivate: [ AuthGuard ],
        children:[
          { path:'', component:DashboardComponent , data:{ titulo: 'Dashboard' } },
          { path:'grafica1', component:Grafica1Component, data:{ titulo: 'Grafica # 1' }  },
          { path:'progress', component:ProgressComponent, data:{ titulo: 'ProgresBar' }  },
          { path:'promesas', component:PromesasComponent, data:{ titulo: 'Promesas' } },
          { path:'rxjs', component:RxjsComponent , data:{ titulo: 'Rxjs' } },
          { path:'profile', component:ProfileComponent , data:{ titulo: 'User Profile' } },
          { path:'account-settings', component:AccountSettingsComponent , data:{ titulo: 'Account Settings' }},
         
        ]
      
      },
  
 
  
]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class PagesRoutingModule { }
