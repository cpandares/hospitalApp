import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartsModule } from 'ng2-charts';


import { IncrementComponent } from './increment/increment.component';

import { FormsModule }  from '@angular/forms';
import { DonaComponent } from './dona/dona.component';


@NgModule({
  declarations: [IncrementComponent, DonaComponent],
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule
    
  ],
  exports:[
    IncrementComponent,
    DonaComponent
  ],
})
export class ComponentsModule { }
