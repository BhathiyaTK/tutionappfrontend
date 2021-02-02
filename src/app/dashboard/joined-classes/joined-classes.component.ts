import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-joined-classes',
  templateUrl: './joined-classes.component.html',
  styleUrls: ['./joined-classes.component.css']
})
export class JoinedClassesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  classes: any[] = [
    { "id": "1", "name": "Combined Mathematics", "teacher": "Mr. Nihal Perera", "date": "31/01/2021", "time": "02.00 P.M. to 6.00 P.M.", "fee": "2500.00" },
    { "id": "2", "name": "Chemistry", "teacher": "Mrs. Ramya Liyanage", "date": "25/01/2021", "time": "08.00 A.M. to 10.00 A.M.", "fee": "2500.00" },
    { "id": "3", "name": "Physics", "teacher": "Mr. Kapila Fernando", "date": "27/01/2021", "time": "09.00 A.M. to 12.00 noon.", "fee": "2500.00" },
    { "id": "4", "name": "GIT", "teacher": "Miss. Heshani Gunathilake", "date": "01/02/2021", "time": "08.00 A.M. to 11.00 A.M.", "fee": "1500.00" },
    { "id": "5", "name": "English (Advanced Level)", "teacher": "Mrs. Kamala Athukorala", "date": "05/02/2021", "time": "10.00 A.M. to 12.00 noon.", "fee": "1300.00" }
  ]

}
