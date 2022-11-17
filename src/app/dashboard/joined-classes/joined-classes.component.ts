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
  imageAltText: string = "Loading image...";

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
        for (let z = 0; z < data.length; z++) {
          this.cs.getSingleClass(data[z].classId).subscribe(clz => {
            data[z].image = clz.imagePath;
            if (clz.imagePath == '' || clz.imagePath == null) {
              this.imageAltText = "Banner image loading failed!";
            } else {
              this.imageAltText = "Class banner image";
            }
          })
        }
        this.spinner = false;
        this.classes = data;
      } else {
        this.spinner = false;
        this.emptyMsg = true;
      }
    }, err => {
      this.spinner = false;
      this.errorAlert = true;
      this.errorText = "Data couldn't be loaded. Something went wrong. Please try refreshing the webpage. If the issue still has, contact MASTERY.LK support team.";
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

  currencyConvertor(currency) {
    var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency', currency: 'LKR'
    });
    return formatter.format(currency);
  }

  removeUrlSpaces(str: string){
    return str.replace(/\s/g, '-');
  }

}
