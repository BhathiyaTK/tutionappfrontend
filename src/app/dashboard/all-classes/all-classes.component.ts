import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-classes',
  templateUrl: './all-classes.component.html',
  styleUrls: ['./all-classes.component.css']
})
export class AllClassesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  allclasses: any[] = [
    { "id": "1", "name": "Combined Mathematics", "teacher": "Mr. Nihal Perera", "date": "Monday", "time": "02.00 P.M. to 6.00 P.M.", "fee": "2500.00" },
    { "id": "2", "name": "Chemistry", "teacher": "Mrs. Ramya Liyanage", "date": "Tuesday", "time": "08.00 A.M. to 10.00 A.M.", "fee": "2500.00" },
    { "id": "3", "name": "Physics", "teacher": "Mr. Kapila Fernando", "date": "Wednesday", "time": "09.00 A.M. to 12.00 noon.", "fee": "2500.00" },
    { "id": "4", "name": "GIT", "teacher": "Miss. Heshani Gunathilake", "date": "Thursday", "time": "08.00 A.M. to 11.00 A.M.", "fee": "1500.00" },
    { "id": "5", "name": "English (Advanced Level)", "teacher": "Mrs. Kamala Athukorala", "date": "Friday", "time": "10.00 A.M. to 12.00 noon.", "fee": "1300.00" },
    { "id": "6", "name": "Biology", "teacher": "Mr. Athula Siriwardhana", "date": "Monday", "time": "8.00 A.M. to 11.00 A.M.", "fee": "2500.00" },
    { "id": "7", "name": "Engineering Technology", "teacher": "Mr. Saman Silva", "date": "Tuesday", "time": "9.00 A.M. to 12.00 noon.", "fee": "1800.00" },
    { "id": "8", "name": "Computer Science", "teacher": "Mr. Dinuth Udugama", "date": "Wednesday", "time": "8.00 A.M. to 10.00 A.M.", "fee": "2000.00" }
  ]

}
