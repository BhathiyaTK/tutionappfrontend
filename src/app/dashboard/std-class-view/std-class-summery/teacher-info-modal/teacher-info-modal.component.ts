import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClassesService } from 'src/app/services/classes/classes.service';
import { UserServicesService } from 'src/app/services/users/user-services.service';

@Component({
  selector: 'app-teacher-info-modal',
  templateUrl: './teacher-info-modal.component.html',
  styleUrls: ['./teacher-info-modal.component.css']
})
export class TeacherInfoModalComponent implements OnInit {

  teacher_id: string;
  teacher_name: string;
  teacher_degree: string;
  teacher_tel: string;
  teacher_intro: string;

  constructor(private ar: ActivatedRoute, private cs: ClassesService, private us: UserServicesService) { }

  classId = this.ar.snapshot.params.id;

  ngOnInit(): void {
    this.getTeacherData();
  }

  getTeacherData(){
    this.cs.getSingleClass(this.classId).subscribe(data => {
      this.teacher_id = data.teacherEntity.teacherId;
      this.teacher_name = data.teacherEntity.fName + " " + data.teacherEntity.lName;
      this.teacher_degree = data.teacherEntity.eduQual;
      this.teacher_intro = data.teacherEntity.teacherIntro;
      this.teacher_tel = data.teacherEntity.telephone;
    }, err => {
      console.log(err);
    })
  }

}
