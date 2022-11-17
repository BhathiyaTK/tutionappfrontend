import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ClassesService } from 'src/app/services/classes/classes.service';
import { UserServicesService } from 'src/app/services/users/user-services.service';

@Component({
  selector: 'app-dashboard-nums',
  templateUrl: './dashboard-nums.component.html',
  styleUrls: ['./dashboard-nums.component.css']
})
export class DashboardNumsComponent implements OnInit {

  uId:number;
  teachersCount:number;
  studentsCount:number;
  initialPageNumber:any = 0;
  totalClasses: any;
  spinner:boolean = false;
  dashboardComponents:boolean = false;

  constructor(public auth: AuthService, private cs: ClassesService, private uss: UserServicesService) { }

  ngOnInit(): void {
    this.uId = this.auth.currentUser.userId;
    this.allClasses(this.initialPageNumber);
    this.allTeachers();
    this.allStudents(this.initialPageNumber);
  }

  allClasses(pageNo){
    this.spinner = true;
    this.dashboardComponents = false;
    this.cs.getClasses(pageNo).subscribe(data => {
      if (data) {
        this.spinner = false;
        this.dashboardComponents = true;
      }
      this.totalClasses = data.content.filter(o => o.approvalStatus == 'Approved').length;
      this.totalClasses = this.formatNumber(this.totalClasses);
    })
  }

  allTeachers(){
    this.spinner = true;
    this.uss.getTeachers().subscribe(data => {
      if (data) {
        this.spinner = false;
        this.dashboardComponents = true;
      }
      this.teachersCount = data.filter(o => o.fName !== 'admin').length;
      this.teachersCount = this.formatNumber(this.teachersCount);
    });
  }

  allStudents(pageNo){
    this.spinner = true;
    this.uss.getStudents(pageNo).subscribe(data => {
      if (data) {
        this.spinner = false;
        this.dashboardComponents = true;
      }
      this.studentsCount = data.totalElements;
      this.studentsCount = this.formatNumber(this.studentsCount);
    })
  }

  formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }

}
