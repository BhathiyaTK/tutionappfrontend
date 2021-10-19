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
  role:string = '';

  email:string;

  constructor(public auth: AuthService, public us: UserServicesService, private fb: FormBuilder) { }

  userDataUpdateForm = this.fb.group({
    fName: ['', [Validators.required]],
    lName: ['', [Validators.required]],
    address: ['', [Validators.required]],
    city: ['', [Validators.required]],
    t_mobile: ['', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
      Validators.pattern('^[0-9]+$')
    ]],
    s_mobile: ['', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
      Validators.pattern('^[0-9]+$')
    ]],
    g_mobile: ['', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
      Validators.pattern('^[0-9]+$')
    ]],
    eduQual: ['', [Validators.required]],
    medium: ['', [Validators.required]],
    t_grade: ['', [Validators.required]],
    s_grade: ['', [Validators.required]],
    teacherIntro: ['', [
      Validators.required,
      Validators.maxLength(500)
    ]]
  });

  ngOnInit(): void {
    if (this.auth.currentUser.Role == 'teacher') {
      this.isTeacher = true;
    }else {
      this.isStudent = true;
    }
  }

  get user_data_update(){
    return this.userDataUpdateForm.controls;
  }

  closeAlert(){ this.successAlert = false }

}
