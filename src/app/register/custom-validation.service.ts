import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { map} from "rxjs/operators";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomValidationService {

  readonly UsersAPIUrl = "https://tutionspringbootbackend.herokuapp.com/getAllUsers";

  constructor(private http: HttpClient) { }

  passwordMatchValidator(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (
        confirmPasswordControl.errors &&
        !confirmPasswordControl.errors.passwordMismatch
      ) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    };
  }

  validateEmailNotExist(control: AbstractControl) {
    return this.checkEmailNotExist(control.value).pipe(
      map(res => {
        return res ? null : { emailExist: true };
      })
    );
  }

  checkEmailNotExist(email: string):Observable<boolean> {
    return this.http.get(this.UsersAPIUrl).pipe(
      map((emailList: Array<any>) =>
        emailList.filter(user => user.username === email)
      ),
      map(users => !users.length)
    );
  }
}
