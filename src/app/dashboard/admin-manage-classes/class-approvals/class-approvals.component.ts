import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ClassesService } from 'src/app/services/classes/classes.service';

@Component({
  selector: 'app-class-approvals',
  templateUrl: './class-approvals.component.html',
  styleUrls: ['./class-approvals.component.css']
})
export class ClassApprovalsComponent implements OnInit {

  Classes: any = [];
  approvalStatus:string = '';
  spinner:boolean = false;
  emptyMsg:boolean = false;
  successAlert:boolean = false;
  errorAlert:boolean = false;
  successText:string = '';
  errorText:string = '';
  requestList:boolean = false;
  pagesCount:number;
  totalElements:number;
  currentPageNumber:number;
  initialPageNumber:any = 0;

  constructor(private cs: ClassesService) { }

  ngOnInit(): void {
    this.getAllRequests(this.initialPageNumber);
  }

  getAllRequests(pageNo) {
    this.spinner = true;
    this.requestList = false;
    this.cs.getClasses(pageNo).subscribe(data1 => {
      if (data1.content.filter(o => o.approvalStatus == 'Pending').length !== 0) {
        this.requestList = true;
        this.spinner = false;
      }else{
        this.spinner = false;
        this.emptyMsg = true;
        this.requestList = false;
      }
      this.Classes = data1.content.filter(o => o.approvalStatus == 'Pending');
      this.pagesCount = data1.totalPages;
      this.totalElements = data1.totalElements;
      this.currentPageNumber = data1.pageable.pageNumber;
    })
  }

  approvalSubmit(approval: string, classId, item) {
    let accept_confirmation = confirm('Are you sure? Please confirm your action.');
    if (accept_confirmation) {
      if (approval == 'Approved') {
        this.approvalStatus = approval;
        this.cs.approveOrRejectClass(classId, approval).subscribe(data => {
          let index = this.Classes.indexOf(item);
          this.Classes.splice(index, 1);
          this.successText = 'Class request approved';
          this.successAlert = true;
          this.getAllRequests(this.currentPageNumber);
        })
      }else if (approval == 'NotApproved') {
        this.approvalStatus = approval;
        this.cs.approveOrRejectClass(classId, approval).subscribe(data => {
          let index = this.Classes.indexOf(item);
          this.Classes.splice(index, 1);
          this.successText = 'Class requested rejected';
          this.successAlert = true;
          this.getAllRequests(this.currentPageNumber);
        })
      }
    } else {
      return null;
    }
  }

  dataRefresh(){
    this.emptyMsg = false;
    this.getAllRequests(this.currentPageNumber);
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
