import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClassesService } from 'src/app/services/classes/classes.service';

@Component({
  selector: 'app-std-class-summery',
  templateUrl: './std-class-summery.component.html',
  styleUrls: ['./std-class-summery.component.css']
})
export class StdClassSummeryComponent implements OnInit {

  class_name: string;
  class_time: string;
  class_date: string;
  class_fee: string;
  teacher_id: string;
  teacher_name: string;
  teacher_degree: string;
  nextClass_link: string = '';

  nextClass_empty_msg: string;

  constructor(private ar: ActivatedRoute, private cs: ClassesService) { }

  classId = this.ar.snapshot.params.id;

  ngOnInit(): void {
    this.getClassData();
    this.getNextClass(this.classId);
  }

  getClassData(){
    this.cs.getSingleClass(this.classId).subscribe(data => {
      this.class_name = data.name;
      this.class_time = data.htime;
      this.class_date = data.hDate;
      this.class_fee = data.classFee;
      this.teacher_id = data.teacherEntity.teacherId;
      this.teacher_name = data.teacherEntity.fName + " " + data.teacherEntity.lName;
      this.teacher_degree = data.teacherEntity.eduQual;
    }, err => {
      console.log(err);
    })
  }

  getNextClass(cId){
    this.cs.getNextClassLink(cId).valueChanges().subscribe(nLink => {
      if (nLink) {
        this.nextClass_link = nLink.link;
      }else{
        this.nextClass_empty_msg = "Not Scheduled";
      }
    }, err => {
      console.log(err);
    })
  }

}
