import { Component, OnInit } from '@angular/core';
import { UserServicesService } from 'src/app/services/users/user-services.service';

@Component({
  selector: 'app-all-students',
  templateUrl: './all-students.component.html',
  styleUrls: ['./all-students.component.css']
})
export class AllStudentsComponent implements OnInit {
  
  Students:any = [];

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

  constructor(private uss: UserServicesService) { }

  ngOnInit(): void {
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
        this.spinner = true;
        this.emptyMsg = true;
        this.studentsTable = false;
      }
      this.Students = data.content;
      this.pagesCount = data.totalPages;
      this.totalElements = data.totalElements;
      this.currentPageNumber = data.pageable.pageNumber;
    })
  }

  deleteSelectedStudent(stdId, pageNo){

  }

  pageNumberClick(event){
    this.getAllStudents(event-1);
  }

  dataRefresh(pageNo){
    this.emptyMsg = false;
    this.getAllStudents(pageNo);
  }

  closeAlert(){ 
    this.successAlert = false ;
    this.errorAlert = false;
  }

}
