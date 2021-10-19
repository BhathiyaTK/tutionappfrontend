import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserServicesService } from '../services/users/user-services.service';

@Component({
  selector: 'app-password-rest',
  templateUrl: './password-rest.component.html',
  styleUrls: ['./password-rest.component.css']
})
export class PasswordRestComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private us: UserServicesService
  ) { }

  successAlert:boolean = false;
  errorAlert:boolean = false;
  errorText:string = '';
  pendingAlert:boolean = false;
  requested_email: string = '';

  email:string;

  passwordResetForm = this.fb.group({
    email: ['', [
      Validators.required,
      Validators.email
    ]]
  });

  ngOnInit(): void {
  }

  get password_reset(){
    return this.passwordResetForm.controls;
  }

  passwordReset(){
    if (this.passwordResetForm.valid) {
      this.pendingAlert = true;
      var val = this.passwordResetForm.get('email').value;
      this.us.passwordReset(val).subscribe((res) => {
        this.requested_email = val;
        this.pendingAlert = false;
        this.successAlert = true;
        this.passwordResetForm.reset();
      }, (error) => {
        this.pendingAlert = false;
        this.errorAlert = true;
        this.errorText = "Process Failed! Something went wrong. " + error;
      })
    } else {
      console.log("Email Verification Failed!");
    }
  }

  closeAlert(){ 
    this.successAlert = false;
    this.errorAlert = false;
  }

}
