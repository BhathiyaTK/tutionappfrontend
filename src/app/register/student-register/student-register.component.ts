import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { UserServicesService } from 'src/app/services/users/user-services.service';
import { CustomValidationService } from '../custom-validation.service';

@Component({
  selector: 'app-student-register',
  templateUrl: './student-register.component.html',
  styleUrls: ['./student-register.component.css']
})
export class StudentRegisterComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private customValidator: CustomValidationService,
    private userService: UserServicesService
  ) { }
  
  successAlert:boolean = false;
  errorAlert:boolean = false;
  errorText:string = '';
  pendingAlert:boolean = false;

  fName:string;
  lName:string;
  address:string;
  city:string;
  telephone:string;
  garTelephone:string;
  email:string;
  password:string;
  role:string = "student";

  stdRegForm = this.fb.group({
    fName: ['', [Validators.required]],
    lName: ['', [Validators.required]],
    address: ['', [Validators.required]],
    city: ['', [Validators.required]],
    email: ['', [
      Validators.required,
      Validators.email
    ],
    // this.customValidator.validateEmailNotExist.bind(this.customValidator)
    ],
    telephone: ['', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
      Validators.pattern('^[0-9]+$')
    ]],
    garTelephone: ['', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
      Validators.pattern('^[0-9]+$')
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

  ngOnInit(): void { }

  get std_reg(){
    return this.stdRegForm.controls;
  }

  stdRegister(){
    if (this.stdRegForm.valid) {
      this.pendingAlert = true;
      var val = {
        fName: this.stdRegForm.get('fName').value,
        lName: this.stdRegForm.get('lName').value,
        address: this.stdRegForm.get('address').value,
        city: this.stdRegForm.get('city').value,
        telephone: this.stdRegForm.get('telephone').value,
        garTelephone: this.stdRegForm.get('garTelephone').value,
        userModel:{
          username: this.stdRegForm.get('email').value,
          password: this.stdRegForm.get('password').value,
          role: this.role
        }
      }
      this.userService.registerStudent(val).subscribe((res) => {
        this.pendingAlert = false;
        this.successAlert = true;
        this.stdRegForm.reset();
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
