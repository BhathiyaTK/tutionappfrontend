import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ClassesService } from 'src/app/services/classes/classes.service';
import { UserServicesService } from 'src/app/services/users/user-services.service';

@Component({
  selector: 'app-my-classes',
  templateUrl: './my-classes.component.html',
  styleUrls: ['./my-classes.component.css']
})
export class MyClassesComponent implements OnInit {

  myclasses: any = []
  c_month: string;
  teacher_id: any;
  userId:number = this.auth.currentUser.userId;
  emptyMsg:boolean = false;
  spinner:boolean = false;

  constructor(public auth: AuthService, public us: UserServicesService, public cs: ClassesService) { }

  ngOnInit(): void {
    console.log(this.auth.currentUser);
    this.getTeacherClasses(this.userId, this.getCurrentMonth());
    this.getCurrentMonth();
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

  getTeacherClasses(uId, currentMonth){
    this.spinner = true;
    currentMonth = this.c_month;
    this.us.getSingleTeacher(uId, currentMonth).subscribe(data1 => {
      this.teacher_id = data1.teacherEntity.teacherId;
      this.cs.getOwnedClasses(this.teacher_id).subscribe(data2 => {
        if (data2) {
          this.spinner = false;
          this.myclasses = data2;
        }else{
          this.spinner = false;
          this.emptyMsg = true;
        }
      })
    }, err => {
      this.spinner = false;
      console.log(err);
    })
  }

  removeUrlSpaces(str: string){
    return str.replace(/\s/g, '-');
  }

  timeConverter(time){
    if (time) {
      time = time.split(":");
      let AMorPM = parseInt(time[0]) >= 12 ? 'PM':'AM';
      let outputTime = ((parseInt(time[0]) + 11) % 12 + 1) + ':' + time[1] + ' ' + AMorPM;
      return outputTime;
    }else{
      return "N/A";
    }
  }

}
