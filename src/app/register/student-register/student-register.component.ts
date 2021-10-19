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
  validateMsgSucess: boolean = false;
  validateMsgError: boolean = false;
  validatingSpinner: boolean = false;

  fName:string;
  lName:string;
  address:string;
  city:string;
  telephone:string;
  garTelephone:string;
  email:string;
  password:string;
  medium:string;
  grade:string;
  role:string = "student";

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

  stdRegForm = this.fb.group({
    fName: ['', [Validators.required]],
    lName: ['', [Validators.required]],
    address: ['', [Validators.required]],
    city: ['', [Validators.required]],
    email: ['', [
      Validators.required,
      Validators.email
    ]],
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
    medium: ['', [Validators.required]],
    grade: ['', [Validators.required]],
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
        medium: this.stdRegForm.get('medium').value,
        grade: this.stdRegForm.get('grade').value,
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

  checkEmail(event) {
    // this.validatingSpinner = true;
    // this.userService.getAllUserEmails().subscribe((data) => {
    //   if (
    //     data.emails.filter((o) => o === event.target.value).length !== 0
    //   ) {
    //     this.validatingSpinner = false;
    //     this.validateMsgError = true;
    //   } else {
    //     this.validatingSpinner = false;
    //     this.validateMsgError = false;
    //   }
    // });
  }

  closeAlert(){ this.successAlert = false }

}
