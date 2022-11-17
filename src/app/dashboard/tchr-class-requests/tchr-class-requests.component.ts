import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ClassesService } from 'src/app/services/classes/classes.service';
import { UserServicesService } from 'src/app/services/users/user-services.service';

@Component({
  selector: 'app-tchr-class-requests',
  templateUrl: './tchr-class-requests.component.html',
  styleUrls: ['./tchr-class-requests.component.css']
})
export class TchrClassRequestsComponent implements OnInit {

  pendingClasses: any = [];
  rejectedClasses: any = [];
  selectedClasses: any = [];
  c_month: string;
  teacher_id: number;
  userId:number = this.auth.currentUser.userId;
  pendingEmptyMsg:boolean = false;
  rejectedEmptyMsg:boolean = false;
  spinner:boolean = false;
  modalLoadSpinner:boolean = false;
  successMsg: boolean = false;
  errorMsg: boolean = false;
  pendingAlert: boolean = false;
  imageFile: string;
  percentageVal: Observable<number>;
  UploadedImageURL: Observable<any>;
  adminApprovalState:string = "Pending";

  constructor(
    public auth: AuthService,
    private us: UserServicesService,
    private cs: ClassesService,
    private afs: AngularFireStorage
    ) { }

  ngOnInit(): void {
    this.getTeacherData(this.userId, this.c_month);
    this.getCurrentMonth();
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

  getTeacherData(uId, currentMonth) {
    this.us.getSingleTeacher(uId, currentMonth).subscribe(teacher => {
      this.teacher_id = teacher.teacherEntity.teacherId;
      this.getPendingClasses(this.teacher_id);
      this.getRejectedClasses(this.teacher_id);
    })
  }

  getPendingClasses(tId) {
    this.spinner = true;
    this.cs.getOwnedClasses(tId).subscribe(pClasses => {
      if (pClasses) {
        this.spinner = false;
        this.pendingClasses = pClasses.filter(o => o.approvalStatus == 'Pending');
        if (this.pendingClasses.length == 0) {
          this.pendingEmptyMsg = true;
        } else {
          this.pendingEmptyMsg = false;
        }
      }else{
        this.spinner = false;
        this.pendingEmptyMsg = true;
      }
    })
  }

  getRejectedClasses(tId) {
    this.spinner = true;
    this.cs.getOwnedClasses(tId).subscribe(rClasses => {
      if (rClasses) {
        this.spinner = false;
        this.rejectedClasses = rClasses.filter(o => o.approvalStatus == 'NotApproved');
        if (this.rejectedClasses.length == 0) {
          this.rejectedEmptyMsg = true;
        } else {
          this.rejectedEmptyMsg = false;
        }
      }else{
        this.spinner = false;
        this.rejectedEmptyMsg = true;
      }
    })
  }

  reviewClass(selectedReviewClassId, teacherId) {
    this.modalLoadSpinner = true;
    setTimeout(() => {
      this.selectedClasses = [];
      this.cs.getOwnedClasses(teacherId).subscribe(classes => {
        for (let x = 0; x < classes.filter(o => o.approvalStatus == 'NotApproved').length; x++) {
          const element = classes.filter(o => o.approvalStatus == 'NotApproved')[x];
          if (element.tutionClassId == selectedReviewClassId) {
            this.selectedClasses.push(element);
            this.modalLoadSpinner = false;
          }
        }
      })
    })
  }

  onChange(event) { 
    this.imageFile = event.target.files[0];
  } 

  resubmitClass(classId, imgUrl, formData) {
    this.pendingAlert = true;
    let values = formData.value;
    if (this.imageFile == '' || this.imageFile == null) {
      var val = {
        name: values.className,
        notes: values.classNote,
        hDate: values.heldDate,
        htime: values.classTime,
        classFee: values.classFee,
        imagePath: imgUrl,
        approvalStatus: this.adminApprovalState,
        teacherModel:{
          teacherId: values.classTeacher
        }
      }
      this.cs.updateClass(classId, val).subscribe((res) => {
        this.pendingAlert = false;
        this.successMsg = true;
        this.getTeacherData(this.userId, this.c_month);
        formData.reset();
      },(err) => {
        this.pendingAlert = false;
        this.errorMsg = true;
        console.log(err);
      });
    } else {
      this.cs.deleteClassCover(imgUrl);
      const storagePath = "/class_covers/"+this.teacher_id+"/"+Math.random();
      const storageRef = this.afs.ref(storagePath);
      const uploadTask = this.afs.upload(storagePath, this.imageFile);
      
      this.percentageVal = uploadTask.percentageChanges();
      uploadTask.snapshotChanges().pipe(
        finalize(() => {
          this.UploadedImageURL = storageRef.getDownloadURL();
          this.UploadedImageURL.subscribe(imageUrl => {
            if (imageUrl) {
              if (formData.valid) {
                var val = {
                  name: values.className,
                  notes: values.classNote,
                  hDate: values.heldDate,
                  htime: values.classTime,
                  classFee: values.classFee,
                  imagePath: imageUrl,
                  approvalStatus: this.adminApprovalState,
                  teacherModel:{
                    teacherId: values.classTeacher
                  }
                }
                this.cs.updateClass(classId, val).subscribe((res) => {
                  this.pendingAlert = false;
                  this.successMsg = true;
                  this.getTeacherData(this.userId, this.c_month);
                  formData.reset();
                },(err) => {
                  this.pendingAlert = false;
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

  closeAlert(){ 
    this.successMsg = false ;
    this.errorMsg = false;
  }

}
