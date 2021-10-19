import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserServicesService } from 'src/app/services/users/user-services.service';

@Component({
  selector: 'app-std-add-to-class',
  templateUrl: './std-add-to-class.component.html',
  styleUrls: ['./std-add-to-class.component.css']
})
export class StdAddToClassComponent implements OnInit {

  successAlert: boolean = false;
  errorAlert: boolean = false;
  successText:string = '';
  errorText:string = '';
  emptyMsg:boolean = false;
  spinner:boolean = false;
  inputDisabled:boolean = false;

  constructor(private us: UserServicesService, public fb: FormBuilder) { }

  ngOnInit(): void {
  }

  stdClassAddForm = this.fb.group({
    subClassId: ['', Validators.required],
    stdId: ['', Validators.required]
  })

  get stdAddClz(){
    return this.stdClassAddForm.controls;
  }

  stdAddToClass(){
    if (this.stdClassAddForm.valid) {
      this.inputDisabled = true;
      let subClzId = this.stdClassAddForm.get('subClassId').value;
      let stdId = this.stdClassAddForm.get('stdId').value;
      this.us.studentJoinedToClass(subClzId, stdId).subscribe(data => {
        this.inputDisabled = false;
        this.successText = 'Student added to the class successfully.'
        this.successAlert = true;
        this.stdClassAddForm.reset();
      }, err => {
        this.inputDisabled = false;
        this.errorText = err;
        this.errorAlert = true;
      })
    }
  }

}
