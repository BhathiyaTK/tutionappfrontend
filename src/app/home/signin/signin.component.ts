import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  invalidLogin: boolean = false;
  signinForm: FormGroup;

  constructor(
    private auth: AuthService,
    private aRoute: ActivatedRoute,
    private route: Router
    ) { }

  ngOnInit(): void {
    this.signinForm = new FormGroup({
      signin_email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      signin_password: new FormControl('', [
        Validators.required
      ])
    });
  }

  get signin_form(){
    return this.signinForm.controls;
  }

  submit(){
    if (this.signinForm.valid) {
      var credentials = {
        username: this.signinForm.get('signin_email').value,
        password: this.signinForm.get('signin_password').value
      }
      this.auth.userLogin(credentials).subscribe((res) => {
        let returnUrl = this.aRoute.snapshot.queryParamMap.get('returnUrl');
        let jwtH = new JwtHelperService();
        let decoded = jwtH.decodeToken(res.jwt);
        switch (decoded.Role) {
          case "student":
            this.route.navigate([returnUrl || 'mPanel/joined-classes']);
            break;
          case "teacher":
            this.route.navigate([returnUrl || 'mPanel/my-classes']);
            break;
          case "admin":
            this.route.navigate([returnUrl || 'mPanel/dashboard']);
            break;
          default:
            this.route.navigate([returnUrl || 'mPanel/not-found']);
            break;
        }
      }, (error) => {
        this.invalidLogin = true;
        console.log(error);
      });
    }
  }

}
