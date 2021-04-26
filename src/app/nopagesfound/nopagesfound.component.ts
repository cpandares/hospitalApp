import { Component } from '@angular/core';

@Component({
  selector: 'app-nopagesfound',
  templateUrl: './nopagesfound.component.html',
  styleUrls: [ './styles.css'
  ]
})
export class NopagesfoundComponent {

  constructor() { }

  year = new Date().getFullYear();
}
