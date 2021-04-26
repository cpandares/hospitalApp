import { Component, Input } from '@angular/core';


import { ChartType } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent  {
  
  @Input('title') title : string = 'Sin titulo';

  @Input('labels') doughnutChartLabels: Label[] = ['Sales', 'In-Store ', 'Mail-Order'];
  @Input('data') doughnutChartData: MultiDataSet = [
    [350, 450, 100],
   
  ];
  public doughnutChartType: ChartType = 'doughnut';

  public colors:Color[] = [
    {backgroundColor: ['#68577E6', '#009FEE','#F02059']}
  ]

}
