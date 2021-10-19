import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CustomValidationService } from 'src/app/register/custom-validation.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserServicesService } from 'src/app/services/users/user-services.service';

@Component({
  selector: 'app-show-user-status',
  templateUrl: './show-user-status.component.html',
  styleUrls: ['./show-user-status.component.css']
})
export class ShowUserStatusComponent implements OnInit {

  c_month: any;
  uId:number = this.auth.currentUser.userId;
  my_classes: string;
  joined_classes: string;
  total_students: string;
  total_teachers: string;

  updateEmail: string;
  updatePassword1: string;
  updatePassword2: string;

  isStudent: boolean = false;
  isTeacher: boolean = false;

  isDisabled: boolean = true;

  constructor(
    public auth: AuthService, 
    public us: UserServicesService, 
    private fb: FormBuilder, 
    private customValidator: CustomValidationService
    ) { }

  credUpdateForm = this.fb.group({
    updateEmail: ['', [Validators.required, Validators.email]],
    updatePassword1: ['', [Validators.required, Validators.minLength(6)]],
    updatePassword2: ['', [Validators.required, Validators.minLength(6)]]
  },{
    validator: this.customValidator.passwordMatchValidator('updatePassword1', 'updatePassword2')
  });

  get cred_update() {
    return this.credUpdateForm.controls;
  }

  ngOnInit(): void {
    this.getCurrentMonth();
    if (this.auth.currentUser.Role == 'teacher') {
      this.isTeacher = true;
      this.getTeacher(this.uId, this.getCurrentMonth);
    }else {
      this.isStudent = true;
    }
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

  getTeacher(uId, currentMonth){
    currentMonth = this.c_month;
    this.us.getSingleTeacher(uId, currentMonth).subscribe(data => {
      this.my_classes = data.classCount;
      this.total_students = data.studentCount;
    }, err => {
      console.log(err);
    })
  }

  getStudent(uId, currentMonth){
    currentMonth = this.c_month;
    this.us.getSingleStudent(uId, currentMonth).subscribe(data => {
      this.joined_classes = data.classCount;
      this.total_teachers = data.teacherCount;
    }, err => {
      console.log(err);
    })
  }

  onChange($event) {
    if ($event.target.checked) {
      this.isDisabled = false;
    } else {
      this.isDisabled = true;
    }
  }

}
