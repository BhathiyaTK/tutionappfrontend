import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserServicesService } from 'src/app/services/users/user-services.service';

@Component({
  selector: 'app-dashboard-topbar',
  templateUrl: './dashboard-topbar.component.html',
  styleUrls: ['./dashboard-topbar.component.css']
})
export class DashboardTopbarComponent implements OnInit {

  c_month: string;
  uId:number = this.auth.currentUser.userId;
  user_full_name:any;

  constructor(public auth: AuthService, public us: UserServicesService) { }

  ngOnInit(): void {
    this.getCurrentMonth();
    if (this.auth.currentUser.Role == 'teacher') {
      this.getTeacher(this.uId, this.getCurrentMonth);
    } else if (this.auth.currentUser.Role == 'student')  {
      this.getStudent(this.uId, this.getCurrentMonth);
    }
  }

  getCurrentMonth(){
    let month = new Date().getMonth();
    switch (month) {
      case 0:
        this.c_month = 'January';
        break;
      case 1:
        this.c_month = 'February';
        break;
      case 2:
        this.c_month = 'March';
        break;
      case 3:
        this.c_month = 'April';
        break;
      case 4:
        this.c_month = 'May';
        break;
      case 5:
        this.c_month = 'June';
        break;
      case 6:
        this.c_month = 'July';
        break;
      case 7:
        this.c_month = 'August';
        break;
      case 8:
        this.c_month = 'September';
        break;
      case 9:
        this.c_month = 'October';
        break;
      case 10:
        this.c_month = 'November';
        break;
      case 11:
        this.c_month = 'December';
        break;
      default:
        break;
    }
    return this.c_month;
  }

  getTeacher(uId, currentMonth){
    currentMonth = this.c_month;
    this.us.getSingleTeacher(uId, currentMonth).subscribe(data => {
      this.user_full_name = data.teacherEntity.fName + ' ' + data.teacherEntity.lName;
    }, err => {
      console.log(err);
    })
  }

  getStudent(uId, currentMonth){
    currentMonth = this.c_month;
    this.us.getSingleStudent(uId, currentMonth).subscribe(data => {
      this.user_full_name = data.studentEntity.fName + ' ' + data.studentEntity.lName;
    }, err => {
      console.log(err);
    })
  }

}
