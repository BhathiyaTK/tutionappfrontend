import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClassesService } from 'src/app/services/classes/classes.service';

@Component({
  selector: 'app-purchase-class',
  templateUrl: './purchase-class.component.html',
  styleUrls: ['./purchase-class.component.css']
})
export class PurchaseClassComponent implements OnInit {

  teacher_name: string;
  teacher_tel: string;
  teacher_edu: string;
  teacher_intro: string;
  class_id: number;
  class_name: string;
  class_fee: string;
  c_month: string;
  subClassId: number;
  subClassList: any = [];

  constructor(public ar: ActivatedRoute, public cs: ClassesService) { }

  classId = this.ar.snapshot.params.id;

  ngOnInit(): void {
    this.getClassData(this.classId);
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

  getClassData(classId){
    this.cs.getSingleClass(classId).subscribe(data => {
      let month = '2021' + this.c_month;
      for (let j = 0; j < data.subTutionClassEntityList.length; j++) {
        const element = data.subTutionClassEntityList[j].month;
        if (month == element) {
          this.subClassId = data.subTutionClassEntityList[j].subClassId;
        }
      }
      this.teacher_name = data.teacherEntity.fName + ' ' + data.teacherEntity.lName;
      this.teacher_tel = data.teacherEntity.telephone;
      this.teacher_edu = data.teacherEntity.eduQual;
      this.teacher_intro = data.teacherEntity.teacherIntro;
      this.class_id = data.tutionClassId;
      this.class_name = data.name;
      this.class_fee = data.classFee;
    })
  }

}
