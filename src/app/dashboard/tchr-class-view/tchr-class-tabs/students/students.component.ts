import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClassesService } from 'src/app/services/classes/classes.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  subClassId: number;
  subClass: any = [];
  studentsList: any = [];
  c_month: string;
  emptyMsg: boolean = false;

  constructor(private cs: ClassesService, private ar: ActivatedRoute) { }

  classId = this.ar.snapshot.params.id;

  ngOnInit(): void {
    this.getSubClass();
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

  getSubClass() {
    this.cs.getSingleClass(this.classId).subscribe(clz => {
      this.subClass = clz.subTutionClassEntityList.filter(o => (o.month).replace('2021', '') == this.c_month);
      this.subClassId = this.subClass[0].subClassId;
      if (this.subClassId !== 0 || this.subClassId !== null) {
        this.getStudents(this.subClassId);
      } else {
        this.emptyMsg = true;
      }
    })
  }

  getStudents(subClzId) {
    this.cs.getClassStudents(subClzId).subscribe(students => {
      this.studentsList = students;
    })
  }

}
