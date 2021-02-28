import { Component, OnInit } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  lineChartData: ChartDataSets[] = [
    { data: [6, 7, 5, 4, 1, 4, 8, 10, 5, 2], label: 'Classes' },
  ];

  lineChartLabels: Label[] = ['Combined Mathematics', 'Chemistry', 'Physics', 'Technology', 'Mathematics', 'Science', 'History', 'English', 'Sinhala', 'Art'];

  lineChartOptions = {
    responsive: true,
    scales: {
      xAxes: [{
        ticks: {
          beginAtZero: true,
        }
      }]
    }
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: '#ebb57b',
    },
  ];

  lineChartLegend = false;
  lineChartPlugins = [];
  lineChartType = 'horizontalBar';

}
