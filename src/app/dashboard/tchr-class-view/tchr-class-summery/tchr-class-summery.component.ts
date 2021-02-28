import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClassesService } from 'src/app/services/classes/classes.service';

@Component({
  selector: 'app-tchr-class-summery',
  templateUrl: './tchr-class-summery.component.html',
  styleUrls: ['./tchr-class-summery.component.css']
})
export class TchrClassSummeryComponent implements OnInit {

  class_name: string;
  class_time: any;
  class_fee: any;
  student_count: number;
  study_mat_count: any;
  assign_count: any;
  class_date: any;

  constructor(private ar: ActivatedRoute, private cs: ClassesService) { }

  classId = this.ar.snapshot.params.id;

  ngOnInit(): void {
    this.getClassData();
    this.getAssignmentsCount();
    this.getStudyMaterialsCount();
  }

  getClassData(){
    this.cs.getSingleClass(this.classId).subscribe(data => {
      this.class_name = data.name;
      this.class_time = data.htime;
      this.class_date = data.hDate;
      this.class_fee = data.classFee;
    }, err => {
      console.log(err);
    })
  }

  getAssignmentsCount(){
    this.cs.getAssignmentList(this.classId).snapshotChanges().subscribe(
      list => {
        if (list.length == 0) {
          this.assign_count = 0;
        }else{
          this.assign_count = list.length;
        }
      }
    )
  }

  getStudyMaterialsCount(){
    this.cs.getStudyMaterialList(this.classId).snapshotChanges().subscribe(
      list => {
        if (list.length == 0) {
          this.study_mat_count = 0;
        }else{
          this.study_mat_count = list.length;
        }
      }
    )
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
