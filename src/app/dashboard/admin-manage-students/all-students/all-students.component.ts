import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserServicesService } from 'src/app/services/users/user-services.service';

@Component({
  selector: 'app-all-students',
  templateUrl: './all-students.component.html',
  styleUrls: ['./all-students.component.css']
})
export class AllStudentsComponent implements OnInit {
  
  Students:any = [];

  uId:number;
  pagesCount:number;
  totalElements:number;
  currentPageNumber:number;
  initialPageNumber:any = 0;
  successAlert: boolean = false;
  errorAlert: boolean = false;
  successText:string = '';
  errorText:string = '';
  emptyMsg:boolean = false;
  spinner:boolean = false;
  studentsTable:boolean = false;
  delVal:string = 'show';
  typedFilterText:string = '';
  filteredResultCount:number = 0;
  totalStudentsList:any = [];

  constructor(public auth: AuthService, private uss: UserServicesService) { }

  ngOnInit(): void {
    this.uId = this.auth.currentUser.userId;
    this.getAllStudents(this.initialPageNumber);
  }

  getAllStudents(pageNo){
    this.spinner = true;
    this.studentsTable = false;
    this.uss.getStudents(pageNo).subscribe(data => {
      if (data.content.length !== 0) {
        this.spinner = false;
        this.studentsTable = true;
      }else{
        this.spinner = false;
        this.emptyMsg = true;
        this.studentsTable = false;
      }
      this.Students = data.content;
      this.totalStudentsList = data.content;
      this.pagesCount = data.totalPages;
      this.totalElements = data.totalElements;
      this.currentPageNumber = data.pageable.pageNumber;
    })
  }

  filterStudents(event, pageNo) {
    this.typedFilterText = event.target.value;
    if (event.target.value !== '') {
      const studentName = (event.target.value as string).replace(/\s/g, "").toLowerCase();
      if (this.totalStudentsList !== null) {
        this.Students = this.totalStudentsList.filter(o => (o.fName.toLowerCase() === studentName) || (o.lName.toLowerCase() === studentName));
        if (this.Students.length !== 0) {
          this.filteredResultCount = this.Students.length;
          this.emptyMsg = false;
          this.studentsTable = true;
        } else {
          this.filteredResultCount = 0;
          this.emptyMsg = true;
          this.studentsTable = false;
        }
      } else {
        this.emptyMsg = true;
        this.studentsTable = false;
      }
    } else {
      this.emptyMsg = false;
      this.studentsTable = true;
      this.getAllStudents(pageNo);
    }
  }

  clearFilters(pageNo) {
    this.filteredResultCount = 0;
    this.typedFilterText = '';
    this.emptyMsg = false;
    this.getAllStudents(pageNo);
  }

  deleteSelectedStudent(stdId, pageNo){
    var confirmation = confirm("Are you sure to delete this student? Once deleted, student data can not be recovered.");
    if (confirmation) {
      this.uss.deleteStudent(stdId).subscribe((res) => {
        this.successAlert = true;
        this.successText = "Student deleted successfully.";
        this.getAllStudents(pageNo);
      }, (err) => {
        this.errorAlert = true;
        this.errorText = "Process failed. Something went wrong.";
      })
    }
  }

  pageNumberClick(event){
    this.getAllStudents(event-1);
  }

  dataRefresh(pageNo){
    this.emptyMsg = false;
    this.clearFilters(pageNo);
    this.getAllStudents(pageNo);
  }

  closeAlert(){ 
    this.successAlert = false ;
    this.errorAlert = false;
  }

}
