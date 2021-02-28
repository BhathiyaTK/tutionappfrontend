import { Component, OnInit, HostListener } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  sidebarStatus:string;

  constructor(public auth: AuthService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    if (window.innerWidth <= 667) {
      this.sidebarStatus = 'sidebarHide';
    }else if (window.innerWidth >= 768 && window.innerWidth <= 1024) {
      this.sidebarStatus = 'sidebarHide';
    } else {
      this.sidebarStatus = 'sidebarShow';
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event){
    if (window.innerWidth <= 667) {
      this.sidebarStatus = 'sidebarHide';
    }else if (window.innerWidth >= 768 && window.innerWidth <= 1024) {
      this.sidebarStatus = 'sidebarHide';
    } else {
      this.sidebarStatus = 'sidebarShow';
    }
  }

  mobileNavToggler(){
    if (this.sidebarStatus == 'sidebarHide') {
      this.sidebarStatus = 'sidebarShow';
    }else{
      this.sidebarStatus = 'sidebarHide';
    }
  }

  mobileNavHide(){
    if (window.innerWidth <= 667) {
      this.sidebarStatus = 'sidebarHide';
    }else if (window.innerWidth >= 768 && window.innerWidth <= 1024) {
      this.sidebarStatus = 'sidebarHide';
    } else {
      this.sidebarStatus = 'sidebarShow';
    }
  }

}
