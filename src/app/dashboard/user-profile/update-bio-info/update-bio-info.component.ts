import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserServicesService } from 'src/app/services/users/user-services.service';

@Component({
  selector: 'app-update-bio-info',
  templateUrl: './update-bio-info.component.html',
  styleUrls: ['./update-bio-info.component.css']
})
export class UpdateBioInfoComponent implements OnInit {

  gradeList = [
    { value: '1', name: '1' },
    { value: '2', name: '2' },
    { value: '3', name: '3' },
    { value: '4', name: '4' },
    { value: '5', name: '5' },
    { value: '6', name: '6' },
    { value: '7', name: '7' },
    { value: '8', name: '8' },
    { value: '9', name: '9' },
    { value: '10', name: '10' },
    { value: '11', name: '11' },
    { value: '12', name: '12' },
    { value: '13', name: '13' }
  ]

  isStudent: boolean = false;
  isTeacher: boolean = false;

  successAlert:boolean = false;
  errorAlert:boolean = false;
  errorText:string = '';
  pendingAlert:boolean = false;
  intro = '';

  fName:string;
  lName:string;
  address:string;
  city:string;
  t_mobile:string;
  s_mobile:string;
  g_mobile:string;
  eduQual:string;
  medium:string;
  t_grade:string;
  s_grade:string;
  teacherIntro:string;
  regNo:string;
  role:string = '';

  email:string;
  c_month: string;
  teacher_id: number;
  student_id: number;

  constructor(
    public auth: AuthService,
    public us: UserServicesService,
    private fb: FormBuilder,
    private uss: UserServicesService
    ) { }

  ngOnInit(): void {
    if (this.auth.currentUser.Role == 'teacher') {
      this.isTeacher = true;
    }else {
      this.isStudent = true;
    }
    this.getUserData(this.auth.currentUser.userId, this.c_month);
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

  getUserData(uId, currentMonth) {
    if (this.auth.currentUser.Role == 'teacher') {
      this.uss.getSingleTeacher(uId, currentMonth).subscribe(data => {
        this.teacher_id = data.teacherEntity.teacherId;
        this.fName = data.teacherEntity.fName;
        this.lName = data.teacherEntity.lName;
        this.address = data.teacherEntity.address;
        this.t_mobile = data.teacherEntity.telephone;
        this.city = data.teacherEntity.city;
        this.eduQual = data.teacherEntity.eduQual;
        this.t_grade = data.teacherEntity.grade;
        this.medium = data.teacherEntity.medium.charAt(0).toUpperCase() + data.teacherEntity.medium.substr(1).toLowerCase();
        this.teacherIntro = data.teacherEntity.teacherIntro;
      });
    } else if (this.auth.currentUser.Role == 'student') {
      this.uss.getSingleStudent(uId, currentMonth).subscribe(data => {
        this.student_id = data.studentEntity.studentId;
        this.regNo = data.studentEntity.regNumber;
        this.fName = data.studentEntity.fName;
        this.lName = data.studentEntity.lName;
        this.address = data.studentEntity.address;
        this.g_mobile = data.studentEntity.garTelephone;
        this.s_mobile = data.studentEntity.telephone;
        this.city = data.studentEntity.city;
        this.s_grade = data.studentEntity.grade;
        this.medium = data.studentEntity.medium.charAt(0).toUpperCase() + data.studentEntity.medium.substr(1).toLowerCase();
      })
    }
  }

  updatePersonalInfo(formData) {
    this.pendingAlert = true;
    let values = formData.value;
    if (this.auth.currentUser.Role == 'teacher') {
      const val = {
        fName: values.fName,
        lName: values.lName,
        telephone: values.t_mobile,
        address: values.address,
        city: values.city,
        eduQual: values.eduQual,
        teacherIntro: values.teacherIntro,
        medium: values.medium,
        grade: values.t_grade,
        userModel:{}
      }
      this.uss.updateTeachers(this.teacher_id, val).subscribe(data => {
        this.pendingAlert = false;
        this.successAlert = true;
      }, (err) => {
        this.pendingAlert = false;
        this.errorAlert = true;
        this.errorText = "Process failed! Something went wrong. ";
      });
    } else if (this.auth.currentUser.Role == 'student') {
      const val = {
        fName: values.fName,
        lName: values.lName,
        telephone: values.s_mobile,
        address: values.address,
        city: values.city,
        garTelephone: values.g_mobile,
        medium: values.medium,
        grade: values.s_grade,
        userModel:{}
      }
      this.uss.updateStudents(this.student_id, val).subscribe(data => {
        this.pendingAlert = false;
        this.successAlert = true;
      }, (err) => {
        this.pendingAlert = false;
        this.errorAlert = true;
        this.errorText = "Process failed! Something went wrong. ";
      });
    }
  }

  closeAlert() {
    this.successAlert = false;
    this.errorAlert = false;
  }

}
