import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserServicesService } from 'src/app/services/users/user-services.service';

@Component({
  selector: 'app-show-bio-info',
  templateUrl: './show-bio-info.component.html',
  styleUrls: ['./show-bio-info.component.css']
})
export class ShowBioInfoComponent implements OnInit {
  
  c_month: any;
  uId:number = this.auth.currentUser.userId;
  user_name: string;
  user_address: string;
  user_tel: string;
  user_eduQl: string;
  user_intro: string;
  user_std_id: number;
  user_garTel: string;

  isStudent: boolean = false;
  isTeacher: boolean = false;

  constructor(public auth: AuthService, public us: UserServicesService) { }

  ngOnInit(): void {
    this.getCurrentMonth();
    if (this.auth.currentUser.Role == 'teacher') {
      this.isTeacher = true;
      this.getTeacher(this.uId, this.getCurrentMonth);
    }else {
      this.isStudent = true;
      this.getStudent(this.uId, this.getCurrentMonth());
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
      this.user_name = data.teacherEntity.fName + ' ' + data.teacherEntity.lName;
      this.user_address = data.teacherEntity.address;
      this.user_tel = data.teacherEntity.telephone;
      this.user_eduQl = data.teacherEntity.eduQual;
      this.user_intro = data.teacherEntity.teacherIntro;
    }, err => {
      console.log(err);
    })
  }

  getStudent(uId, currentMonth){
    currentMonth = this.c_month;
    this.us.getSingleStudent(uId, currentMonth).subscribe(data => {
      this.user_std_id = data.studentEntity.studentId;
      this.user_name = data.studentEntity.fName + ' ' + data.studentEntity.lName;
      this.user_address = data.studentEntity.address;
      this.user_tel = data.studentEntity.telephone;
      this.user_garTel = data.studentEntity.garTelephone;
    }, err => {
      console.log(err);
    })
  }

}
