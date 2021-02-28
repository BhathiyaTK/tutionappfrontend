import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserServicesService } from 'src/app/services/users/user-services.service';
import { CustomValidationService } from '../custom-validation.service';

@Component({
  selector: 'app-teacher-register',
  templateUrl: './teacher-register.component.html',
  styleUrls: ['./teacher-register.component.css']
})
export class TeacherRegisterComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private customValidator: CustomValidationService,
    private userService: UserServicesService
  ) { }

  successAlert:boolean = false;
  errorAlert:boolean = false;
  errorText:string = '';
  pendingAlert:boolean = false;
  intro = '';

  fName:string;
  lName:string;
  address:string;
  city:string;
  telephone:string;
  email:string;
  eduQual:string;
  teacherIntro:string;
  password:string;
  role:string = "teacher";

  tchrRegForm = this.fb.group({
    fName: ['', [Validators.required]],
    lName: ['', [Validators.required]],
    address: ['', [Validators.required]],
    city: ['', [Validators.required]],
    telephone: ['', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
      Validators.pattern('^[0-9]+$')
    ]],
    email: ['', [
      Validators.required,
      Validators.email
    ],
    // this.customValidator.validateEmailNotExist.bind(this.customValidator)
    ],
    eduQual: ['', [Validators.required]],
    teacherIntro: ['', [
      Validators.required,
      Validators.maxLength(255)
    ]],
    password: ['', [
      Validators.required,
      Validators.minLength(6)
    ]],
    conf_password: ['', [
      Validators.required,
      Validators.minLength(6)
    ]]
  },{
    validator: this.customValidator.passwordMatchValidator('password', 'conf_password')
  });

  ngOnInit(): void {
  }

  get tchr_reg(){
    return this.tchrRegForm.controls;
  }

  tchrRegister(){
    if (this.tchrRegForm.valid) {
      this.pendingAlert = true;
      var val = {
        fName: this.tchrRegForm.get('fName').value,
        lName: this.tchrRegForm.get('lName').value,
        address: this.tchrRegForm.get('address').value,
        city: this.tchrRegForm.get('city').value,
        telephone: this.tchrRegForm.get('telephone').value,
        eduQual: this.tchrRegForm.get('eduQual').value,
        teacherIntro: this.tchrRegForm.get('teacherIntro').value,
        userModel:{
          username: this.tchrRegForm.get('email').value,
          password: this.tchrRegForm.get('password').value,
          role: this.role
        }
      }
      this.userService.registerTeacher(val).subscribe(res => {
        this.pendingAlert = false;
        this.successAlert = true;
        this.intro = '';
        this.tchrRegForm.reset();
      }, (error) => {
        this.pendingAlert = false;
        this.errorAlert = true;
        this.errorText = error;
      });

    } else {
      console.log("Validation Failed!");
    }
  }

  closeAlert(){ this.successAlert = false }

}
