import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ClassesService } from 'src/app/services/classes/classes.service';
import { UserServicesService } from 'src/app/services/users/user-services.service';

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.css']
})
export class AddClassComponent implements OnInit {

  constructor(
    private fb: FormBuilder, 
    private cs: ClassesService,
    private uss: UserServicesService
    ) { }

  Teachers:any = [];
  successMsg: boolean = false;
  errorMsg: boolean = false;

  name:string;
  teacherId:string;
  notes:string;

  addClassForm = this.fb.group({
    name: ['', [Validators.required]],
    teacherId: ['', [Validators.required]],
    notes: ['', [Validators.required]]
  });

  ngOnInit(): void {
    this.allTeachers();
  }

  get class_add(){
    return this.addClassForm.controls;
  }

  allTeachers(){
    this.uss.getTeachers().subscribe(data => {
      this.Teachers = data;
    });
  }

  addNewClass(){
    if (this.addClassForm.valid) {
      var val = {
        name: this.addClassForm.get('name').value,
        notes: this.addClassForm.get('notes').value,
        teacherModel:{
          teacherId: this.addClassForm.get('teacherId').value
        }
      }
      this.cs.addClass(val).subscribe((res) => {
        this.successMsg = true;
      }, (error) => {
        this.errorMsg = true;
        console.log("Error occured ====> ", error);
      })
    } else {
      console.log("Validation Failed!");
    }
  }

}
