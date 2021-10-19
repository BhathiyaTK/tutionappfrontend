import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ClassesService } from 'src/app/services/classes/classes.service';

@Component({
  selector: 'app-joined-classes',
  templateUrl: './joined-classes.component.html',
  styleUrls: ['./joined-classes.component.css']
})
export class JoinedClassesComponent implements OnInit {

  spinner:boolean = false;
  emptyMsg:boolean = false;
  errorAlert: boolean = false;
  errorText:string = '';
  classes: any = []
  c_month: string;
  userId:number = this.auth.currentUser.userId;

  constructor(public cs: ClassesService, public auth: AuthService) { }

  ngOnInit(): void {
    this.getCurrentMonth();
    this.fetchJoinedClasses(this.userId, this.getCurrentMonth());
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

  fetchJoinedClasses(uId, currentMonth){
    this.spinner = true;
    this.cs.getJoinedClasses(uId, currentMonth).subscribe(data => {
      if (data.length !== 0) {
        this.spinner = false;
      } else {
        this.spinner = false;
        this.emptyMsg = true;
      }
      this.classes = data;
    }, err => {
      this.spinner = false;
      this.errorAlert = true;
      this.errorText = "Data couldn't be loaded. Something went wrong. Please try refreshing the browser. If the issue still has, contact MASTERY.LK.";
    })
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

  removeUrlSpaces(str: string){
    return str.replace(/\s/g, '-');
  }

}
