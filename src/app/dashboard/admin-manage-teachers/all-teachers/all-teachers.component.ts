import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ClassesService } from 'src/app/services/classes/classes.service';
import { UserServicesService } from 'src/app/services/users/user-services.service';

@Component({
  selector: 'app-all-teachers',
  templateUrl: './all-teachers.component.html',
  styleUrls: ['./all-teachers.component.css']
})
export class AllTeachersComponent implements OnInit {

  uId:number;
  Teachers:any = [];
  currentTeacher: boolean = false;
  successAlert:boolean = false;
  errorAlert:boolean = false;
  successText:string = '';
  errorText:string = '';
  emptyMsg:boolean = false;
  spinner:boolean = false;
  classesTable:boolean = false;
  delVal:string = 'show';
  typedFilterText:string = '';
  filteredResultCount:number = 0;
  totalTeachersList:any = [];

  constructor(public auth: AuthService, private cs: ClassesService, private uss: UserServicesService) { }

  ngOnInit(): void {
    this.uId = this.auth.currentUser.userId;
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
      this.Teachers = data.filter(o => o.fName !== 'admin').sort((a,b) => a.teacherId > b.teacherId ? -1 : 1);
      this.totalTeachersList = data.filter(o => o.fName !== 'admin').sort((a,b) => a.teacherId > b.teacherId ? -1 : 1);
    });
  }

  filterTeacher(event) {
    this.typedFilterText = event.target.value;
    if (event.target.value !== '') {
      const teacherName = (event.target.value as string).replace(/\s/g, "").toLowerCase();
      if (this.totalTeachersList !== null) {
        this.Teachers = this.totalTeachersList.filter(o => (o.fName.toLowerCase() === teacherName) || (o.lName.toLowerCase() === teacherName));
        if (this.Teachers.length !== 0) {
          this.filteredResultCount = this.Teachers.length;
          this.emptyMsg = false;
          this.classesTable = true;
        } else {
          this.filteredResultCount = 0;
          this.emptyMsg = true;
          this.classesTable = false;
        }
      } else {
        this.emptyMsg = true;
        this.classesTable = false;
      }
    } else {
      this.emptyMsg = false;
      this.classesTable = true;
      this.allTeachers();
    }
  }

  clearFilters() {
    this.filteredResultCount = 0;
    this.typedFilterText = '';
    this.emptyMsg = false;
    this.allTeachers();
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
      })
    }
  }

  closeAlert(){ 
    this.successAlert = false ;
    this.errorAlert = false;
  }

  dataRefresh(){
    this.clearFilters();
    this.allTeachers();
  }

}
