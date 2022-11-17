import { Component, OnInit } from '@angular/core';
import { ClassesService } from 'src/app/services/classes/classes.service';

@Component({
  selector: 'app-all-classes',
  templateUrl: './all-classes.component.html',
  styleUrls: ['./all-classes.component.css']
})
export class AllClassesComponent implements OnInit {

  allclasses: any = []

  pagesCount:number;
  totalElements:number;
  currentPageNumber:number;
  initialPageNumber:any = 0;
  spinner:boolean = false;
  successAlert: boolean = false;
  successText:string = '';
  errorAlert: boolean = false;
  errorText:string = '';
  emptyMsg:boolean = false;
  imageAltText: string = "Loading image...";

  constructor(public cs: ClassesService) { }

  ngOnInit(): void {
    this.getAllClasses(this.initialPageNumber);
  }

  getAllClasses(pageNo){
    this.spinner = true;
    this.cs.getClasses(pageNo).subscribe(data => {
      if (data.content.length !== 0) {
        this.spinner = false;
          this.allclasses = data.content.filter(o => o.approvalStatus == 'Approved');
        if (data.content.imagePath == '' || data.content.imagePath == null) {
          this.imageAltText = "Banner image loading...";
        } else {
          this.imageAltText = "Class banner image";
        }
        this.pagesCount = data.totalPages;
        this.totalElements = data.totalElements;
        this.currentPageNumber = data.pageable.pageNumber;
      }else{
        this.spinner = true;
        this.emptyMsg = true;
      }
    })
  }

  pageNumberClick(event){
    this.getAllClasses(event-1);
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

  currencyConvertor(currency) {
    var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency', currency: 'LKR'
    });
    return formatter.format(currency);
  }

}
