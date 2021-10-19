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

  constructor(public cs: ClassesService) { }

  ngOnInit(): void {
    this.getAllClasses(this.initialPageNumber);
  }

  getAllClasses(pageNo){
    this.spinner = true;
    this.cs.getClasses(pageNo).subscribe(data => {
      if (data.content.length !== 0) {
        this.spinner = false;
      }else{
        this.spinner = true;
        this.emptyMsg = true;
      }
      this.allclasses = data.content;
      this.pagesCount = data.totalPages;
      this.totalElements = data.totalElements;
      this.currentPageNumber = data.pageable.pageNumber;
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

}
