import { Component, OnInit } from '@angular/core';
import { ClassesService } from 'src/app/services/classes/classes.service';
import { UserServicesService } from 'src/app/services/users/user-services.service';

@Component({
  selector: 'app-all-teachers',
  templateUrl: './all-teachers.component.html',
  styleUrls: ['./all-teachers.component.css']
})
export class AllTeachersComponent implements OnInit {

  Teachers:any = [];
  currentTeacher: boolean = false;
  successAlert:boolean = false;
  errorAlert:boolean = false;
  successText:string = '';
  errorText:string = '';
  emptyMsg:boolean = false;
  spinner:boolean = false;
  classesTable:boolean = false;

  constructor(private cs: ClassesService, private uss: UserServicesService) { }

  ngOnInit(): void {
    this.allTeachers();
  }

  allTeachers(){
    this.spinner = true;
    this.classesTable = false;
    this.uss.getTeachers().subscribe(data => {
      if (data !== null) {
        this.spinner = false;
        this.classesTable = true;
      }else{
        this.emptyMsg = true;
        this.classesTable = false;
      }
      this.Teachers = data;
    });
  }

  deleteSelectedTeacher(tId){
    var confirmation = confirm("Are you sure to delete this teacher? Once deleted, teacher and his/her classes also will be deleted. Those data can not be recovered.");
    if (confirmation) {
      this.uss.deleteTeacher(tId).subscribe((res) => {
        this.successAlert = true;
        this.successText = "Teacher deleted successfully.";
        this.allTeachers();
      }, (err) => {
        this.errorAlert = true;
        this.errorText = "Process failed. Something went wrong.";
        console.log(err);
      })
    }
  }

  closeAlert(){ 
    this.successAlert = false ;
    this.errorAlert = false;
  }

  dataRefresh(){
    this.allTeachers();
  }

}
