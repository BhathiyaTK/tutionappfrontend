import { Component, OnInit } from '@angular/core';
import { ClassesService } from 'src/app/services/classes/classes.service';

@Component({
  selector: 'app-admin-all-classes',
  templateUrl: './admin-all-classes.component.html',
  styleUrls: ['./admin-all-classes.component.css']
})
export class AdminAllClassesComponent implements OnInit {

  Classes: any = [];

  constructor(private cs: ClassesService) { }

  ngOnInit(): void {
    this.fetchAllClasses();
  }

  fetchAllClasses(){
    this.cs.getClasses().subscribe(data => {
      this.Classes = data;
      console.log(this.Classes);
    })
  }

}
