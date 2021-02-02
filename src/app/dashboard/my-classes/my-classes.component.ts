import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-classes',
  templateUrl: './my-classes.component.html',
  styleUrls: ['./my-classes.component.css']
})
export class MyClassesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  myclasses: any[] = [
    { "id": "1", "name": "Combined Mathematics", "date": "Tuesday", "time": "02.00 P.M. to 6.00 P.M.", "fee": "2500.00" },
    { "id": "2", "name": "Combined Mathematics (Revision)", "date": "Monday", "time": "08.00 A.M. to 12.00 noon.", "fee": "2200.00" },
    { "id": "3", "name": "Mathematics (O/L)", "date": "Friday", "time": "08.00 A.M. to 10.00 A.M.", "fee": "1500.00" }
  ]

}
