import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ClassesService } from 'src/app/services/classes/classes.service';
import { UserServicesService } from 'src/app/services/users/user-services.service';

@Component({
  selector: 'app-admin-all-classes',
  templateUrl: './admin-all-classes.component.html',
  styleUrls: ['./admin-all-classes.component.css']
})
export class AdminAllClassesComponent implements OnInit {

  Classes: any = [];
  selectedClass: Array<any> = [];
  Teachers:any = [];
  TeachersEntity: Array<any> = [];
  notes:any = '';

  pagesCount:number;
  totalElements:number;
  currentPageNumber:number;
  initialPageNumber:any = 0;
  currentTeacher: boolean = false;
  successAlert:boolean = false;
  errorAlert:boolean = false;
  successText:string = '';
  errorText:string = '';
  emptyMsg:boolean = false;
  spinner:boolean = false;
  modalLoadSpinner:boolean = false;
  classesTable:boolean = false;

  delVal:string = 'show';
  typedFilterText:string = '';
  filteredResultCount:number = 0;
  totalClassesList:any = [];

  constructor(private cs: ClassesService, private uss: UserServicesService) { }

  ngOnInit(): void {
    this.fetchAllClasses(this.initialPageNumber);
    this.allTeachers();
    // this.setTeachersEntities();
  }

  pageNumbers(n: number): Array<number> { 
    return Array(n); 
  } 

  fetchAllClasses(pageNo){
    this.spinner = true;
    this.classesTable = false;
    this.cs.getClasses(pageNo).subscribe(data => {
      if (data.content.length !== 0) {
        this.spinner = false;
        this.classesTable = true;
      }else{
        this.spinner = false;
        this.emptyMsg = true;
        this.classesTable = false;
      }
      this.Classes = data.content;
      this.totalClassesList = data.content;
      this.pagesCount = data.totalPages;
      this.totalElements = data.totalElements;
      this.currentPageNumber = data.pageable.pageNumber;
      for (let i = 0; i < this.Classes.length; i++) {
        const element = this.Classes[i].teachersEntity;
        this.TeachersEntity.push(element);
      }
    })
  }

  filterByClass(event, pageNo) {
    this.typedFilterText = "class name '"+event.target.value+"'";
    const selectedClass = event.target.value;
    if (event.target.value !== '') {
      if (this.totalClassesList !== null) {
        this.Classes = this.totalClassesList.filter(o => o.name === selectedClass);
        if (this.Classes.length !== 0) {
          this.filteredResultCount = this.Classes.length;
          this.emptyMsg = false;
          this.classesTable = true;
        } else {
          this.filteredResultCount = 0;
          this.emptyMsg = true;
          this.classesTable = false;
        }
      } else {
        this.emptyMsg = true;
        this.classesTable = false;
      }
    } else {
      this.typedFilterText = "";
      this.emptyMsg = false;
      this.classesTable = true;
      this.fetchAllClasses(pageNo);
    }
  }

  filterByTeacher(event, pageNo) {
    this.typedFilterText = "teacher name '"+event.target.value+"'";
    const selectedTeacher = event.target.value;
    if (event.target.value !== '') {
      if (this.totalClassesList !== null) {
        this.Classes = this.totalClassesList.filter(o => (o.teacherEntity.fName.toLowerCase() === selectedTeacher) || (o.teacherEntity.lName.toLowerCase() === selectedTeacher));
        if (this.Classes.length !== 0) {
          this.filteredResultCount = this.Classes.length;
          this.emptyMsg = false;
          this.classesTable = true;
        } else {
          this.filteredResultCount = 0;
          this.emptyMsg = true;
          this.classesTable = false;
        }
      } else {
        this.emptyMsg = true;
        this.classesTable = false;
      }
    } else {
      this.typedFilterText = "";
      this.emptyMsg = false;
      this.classesTable = true;
      this.fetchAllClasses(pageNo);
    }
  }

  clearFilters(pageNo) {
    this.filteredResultCount = 0;
    this.typedFilterText = '';
    this.emptyMsg = false;
    this.fetchAllClasses(pageNo);
  }

  setTeachersEntities(){
    console.log("classes length = ", this.Classes.length);
    for (let i = 0; i < this.Classes.length; i++) {
      const element = this.Classes[i].teachersEntity.fName;
      this.TeachersEntity.push(element);
    }
    console.log(this.TeachersEntity);
  }

  pageNumberClick(event){
    this.fetchAllClasses(event-1);
  }

  selectedEditClass(selectedClassId, pageNo){
    this.modalLoadSpinner = true;
    setTimeout(() => {
      this.selectedClass = [];
      this.cs.getClasses(pageNo).subscribe(data => {
        for (let j = 0; j < data.content.length; j++) {
          const element = data.content[j];
          if (element.tutionClassId == selectedClassId) {
            this.selectedClass.push(element);
            this.modalLoadSpinner = false;
          }
        }
      })
    });
  }

  allTeachers(){
    this.uss.getTeachers().subscribe(data => {
      this.Teachers = data;
    });
  }

  updateClass(pageNo, classId, formData){
    let values = formData.value;
    var val = {
      name: values.className,
      notes: values.classNote,
      hDate: values.heldDate,
      htime: values.classTime,
      classFee: values.classFee,
      teacherModel: {
        teacherId: values.classTeacher
      }
    }
    console.log(val);
    this.cs.updateClass(classId, val).subscribe((res) => {
      this.successAlert = true;
      this.successText = "Class updated successfully.";
      formData.reset();
      this.fetchAllClasses(pageNo);
    }, (err) => {
      this.errorAlert = true;
      this.errorText = "Process failed! Something went wrong.";
      formData.reset();
    })
  }

  deleteSelectedClass(classId, pageNo){
    var confirmation = confirm("Are you sure to delete this class? Once delete, class can not be recovered.");
    if (confirmation) {
      this.cs.deleteClass(classId).subscribe((res) => {
        this.successAlert = true;
        this.successText = "Class deleted successfully.";
        this.fetchAllClasses(pageNo);
      }, (err) => {
        this.errorAlert = true;
        this.errorText = "Process failed. Something went wrong.";
      })
    }
  }

  closeAlert(){ 
    this.successAlert = false ;
    this.errorAlert = false;
  }

  dataRefresh(pageNo){
    this.emptyMsg = false;
    this.clearFilters(pageNo);
    this.fetchAllClasses(pageNo);
  }

  currencyConvertor(currency) {
    var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency', currency: 'LKR'
    });
    return formatter.format(currency);
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
