import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ClassesService } from 'src/app/services/classes/classes.service';
import { UserServicesService } from 'src/app/services/users/user-services.service';
import { CustomFiletypeValidationService } from 'src/app/services/validations/custom-filetype-validation.service';

@Component({
  selector: 'app-teacher-create-class',
  templateUrl: './teacher-create-class.component.html',
  styleUrls: ['./teacher-create-class.component.css']
})
export class TeacherCreateClassComponent implements OnInit {

  constructor(
    public auth: AuthService,
    private fb: FormBuilder, 
    private cs: ClassesService,
    private uss: UserServicesService,
    private cftv: CustomFiletypeValidationService
  ) { }

  teacher_id: number;
  successMsg: boolean = false;
  errorMsg: boolean = false;
  note:any = '';
  c_month: string;

  name:string;
  teacher:number;
  fee:string;
  date:string;
  time:string;
  notes:string;
  image:string;
  adminApprovalState:string = 'Pending';
  imageName:string;

  addClassForm = this.fb.group({
    name: ['', [Validators.required]],
    fee: ['', [Validators.required]],
    date: ['', [Validators.required]],
    time: ['', [Validators.required]],
    notes: ['', [
      Validators.required,
      Validators.maxLength(255)
    ]],
    image: ['', [
      Validators.required, 
      this.cftv.requiredFileTypes('jpg')
    ]]
  });

  ngOnInit(): void {
    this.getTeacherId(this.auth.currentUser.userId, this.c_month);
    this.getCurrentMonth();
  }

  get class_add(){
    return this.addClassForm.controls;
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

  getTeacherId(uId, currentMonth) {
    this.uss.getSingleTeacher(uId, currentMonth).subscribe(data => {
      this.teacher_id = data.teacherEntity.teacherId;
    });
  }

  addNewClass(){
    if (this.addClassForm.valid) {
      var val = {
        name: this.addClassForm.get('name').value,
        notes: this.addClassForm.get('notes').value,
        hDate: this.addClassForm.get('date').value,
        htime: this.addClassForm.get('time').value,
        classFee: this.addClassForm.get('fee').value,
        imagePath: this.addClassForm.get('image').value,
        approvalState: this.adminApprovalState,
        teacherModel:{
          teacherId: this.teacher_id
        }
      }
      this.cs.addClass(val).subscribe((res) => {
        this.successMsg = true;
        this.addClassForm.reset();
        this.note = '';
      },(err) => {
        this.errorMsg = true;
        console.log(err);
      });
    } else {
      console.log("Validation Failed!");
    }
  }

}
