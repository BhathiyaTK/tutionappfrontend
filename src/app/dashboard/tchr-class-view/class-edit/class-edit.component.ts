import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ClassesService } from 'src/app/services/classes/classes.service';
import { UserServicesService } from 'src/app/services/users/user-services.service';
import { CustomFiletypeValidationService } from 'src/app/services/validations/custom-filetype-validation.service';

@Component({
  selector: 'app-class-edit',
  templateUrl: './class-edit.component.html',
  styleUrls: ['./class-edit.component.css']
})
export class ClassEditComponent implements OnInit {

  teacher_id: number;
  successMsg: boolean = false;
  errorMsg: boolean = false;
  note:any = '';
  c_month: string;
  pendingClzAdd: boolean = false;
  imageFile: string;
  percentageVal: Observable<number>;
  UploadedImageURL: Observable<any>;
  loadingClassData: boolean = false;

  name:string;
  teacher:number;
  fee:string;
  date:string;
  time:string;
  notes:string;
  image:string;
  adminApprovalState:string = "Approved";
  imageName:string;

  constructor(
    public auth: AuthService,
    private ar: ActivatedRoute,
    private cs: ClassesService,
    private uss: UserServicesService,
    private cftv: CustomFiletypeValidationService,
    private afs: AngularFireStorage,
    private fb: FormBuilder
    ) { }

  classId = this.ar.snapshot.params.id;
  className = this.ar.snapshot.params.name;

  updateClassForm = this.fb.group({
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
    this.getClassData();
  }

  get class_add(){
    return this.updateClassForm.controls;
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

  getClassData() {
    this.loadingClassData = true;
    this.cs.getSingleClass(this.classId).subscribe(clzData => {
      this.name = clzData.name;
      this.fee = clzData.classFee;
      this.date = clzData.hDate;
      this.time = clzData.htime;
      this.notes = clzData.notes;
      this.image = clzData.imagePath;
      this.loadingClassData = false;
    })
  }

  getTeacherId(uId, currentMonth) {
    this.uss.getSingleTeacher(uId, currentMonth).subscribe(data => {
      this.teacher_id = data.teacherEntity.teacherId;
    });
  }

  onChange(event) { 
    this.imageFile = event.target.files[0];
  } 

  updateClass(){
    this.pendingClzAdd = true;
    if (this.imageFile == '' || this.imageFile == null) {
      var val = {
        name: this.updateClassForm.get('name').value,
        notes: this.updateClassForm.get('notes').value,
        hDate: this.updateClassForm.get('date').value,
        htime: this.updateClassForm.get('time').value,
        classFee: this.updateClassForm.get('fee').value,
        imagePath: this.image,
        approvalStatus: this.adminApprovalState,
        teacherModel:{
          teacherId: this.teacher_id
        }
      }
      this.cs.updateClass(this.classId, val).subscribe((res) => {
        this.pendingClzAdd = false;
        this.successMsg = true;
        this.updateClassForm.reset();
        this.note = '';
        this.getClassData();
      },(err) => {
        this.pendingClzAdd = false;
        this.errorMsg = true;
        console.log(err);
      });
    } else {
      this.cs.deleteClassCover(this.image);
      const storagePath = "/class_covers/"+this.teacher_id+"/"+Math.random();
      const storageRef = this.afs.ref(storagePath);
      const uploadTask = this.afs.upload(storagePath, this.imageFile);
      
      this.percentageVal = uploadTask.percentageChanges();
      uploadTask.snapshotChanges().pipe(
        finalize(() => {
          this.UploadedImageURL = storageRef.getDownloadURL();
          this.UploadedImageURL.subscribe(imageUrl => {
            if (imageUrl) {
              if (this.updateClassForm.valid) {
                var val = {
                  name: this.updateClassForm.get('name').value,
                  notes: this.updateClassForm.get('notes').value,
                  hDate: this.updateClassForm.get('date').value,
                  htime: this.updateClassForm.get('time').value,
                  classFee: this.updateClassForm.get('fee').value,
                  imagePath: imageUrl,
                  approvalStatus: this.adminApprovalState,
                  teacherModel:{
                    teacherId: this.teacher_id
                  }
                }
                this.cs.updateClass(this.classId, val).subscribe((res) => {
                  this.pendingClzAdd = false;
                  this.successMsg = true;
                  this.updateClassForm.reset();
                  this.note = '';
                  this.getClassData();
                },(err) => {
                  this.pendingClzAdd = false;
                  this.errorMsg = true;
                  console.log(err);
                });
              } else {
                console.log("Validation Failed!");
              }
            } else {
              this.errorMsg = true;
              console.log("Class banner image upload failed! Try again shortly.");
            }
          })
        })
      ).subscribe();
    }
  }

}
