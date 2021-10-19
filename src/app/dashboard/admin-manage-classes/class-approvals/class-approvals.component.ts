import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-class-approvals',
  templateUrl: './class-approvals.component.html',
  styleUrls: ['./class-approvals.component.css']
})
export class ClassApprovalsComponent implements OnInit {

  Classes:any = [
    { id: '1', name: 'Combined Mathematics', teacher: 'Nirmal Dissanayaka', hDate: 'Friday', hTime: '14:00', fee: '3400', desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum minus dolores, minima animi, sit molestiae enim dolor excepturi veritatis tenetur delectus numquam ex cupiditate incidunt ut officia quibusdam, fugiat reiciendis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum minus dolores, minima animi, sit molestiae enim dolor excepturi veritatis tenetur delectus numquam ex cupiditate incidunt ut officia quibusdam, fugiat reiciendis. Lorem ipsum dolor sit amet consectetur adipisici.'},
    { id: '1', name: 'Chemistry', teacher: 'Jayanath Amarasinghe', hDate: 'Wednesday', hTime: '09:30', fee: '3200', desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum minus dolores, minima animi, sit molestiae enim dolor excepturi veritatis tenetur delectus numquam ex cupiditate incidunt ut officia quibusdam, fugiat reiciendis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum minus dolores, minima animi, sit molestiae enim dolor excepturi veritatis tenetur delectus numquam ex cupiditate incidunt ut officia quibusdam, fugiat reiciendis. Lorem ipsum.'}
  ];

  approvalStatus:string = '';
  spinner:boolean = false;
  emptyMsg:boolean = false;
  successAlert:boolean = false;
  errorAlert:boolean = false;
  successText:string = '';
  errorText:string = '';
  requestList:boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.getAllRequests();
  }

  getAllRequests() {
    this.spinner = true;
    this.requestList = false;
    setTimeout(() => {
      if (this.Classes.length !== 0) {
        this.requestList = true;
        this.spinner = false;
        return null;
      }else {
        this.spinner = false;
        this.emptyMsg = true;
      }
    }, 1000);
  }

  approvalSubmit(approval: string, classId, item) {
    let accept_confirmation = confirm('Are you sure? Please confirm your action.');
    if (accept_confirmation) {
      if (approval == 'Approved') {
        this.approvalStatus = approval;
        let index = this.Classes.indexOf(item);
        this.Classes.splice(index, 1);
        this.successText = 'Class approved';
        this.successAlert = true;
        this.getAllRequests();
      }else if (approval == 'NotApproved') {
        this.approvalStatus = approval;
        let index = this.Classes.indexOf(item);
        this.Classes.splice(index, 1);
        this.successText = 'Class rejected';
        this.successAlert = true;
        this.getAllRequests();
      }
    } else {
      return null;
    }
  }

  dataRefresh(){
    this.emptyMsg = false;
    this.getAllRequests();
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

  closeAlert(){ 
    this.successAlert = false;
    this.errorAlert = false;
  }

}
