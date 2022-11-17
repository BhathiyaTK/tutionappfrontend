import { Component, HostListener, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ClassesService } from 'src/app/services/classes/classes.service';
import { UserServicesService } from 'src/app/services/users/user-services.service';
import { CustomFiletypeValidationService } from 'src/app/services/validations/custom-filetype-validation.service';

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.css']
})
export class AddClassComponent implements OnInit {

  constructor(
    private fb: FormBuilder, 
    private cs: ClassesService,
    private uss: UserServicesService,
    private cftv: CustomFiletypeValidationService,
    private fbs: AngularFireStorage,
    ) { }

  Teachers:any = [];
  successMsg: boolean = false;
  errorMsg: boolean = false;
  note:any = '';
  pendingClzAdd: boolean = false;
  imageFile: string;
  percentageVal: Observable<number>;
  UploadedImageURL: Observable<any>;

  name:string;
  teacher:number;
  fee:string;
  date:string;
  time:string;
  notes:string;
  image:string;
  adminApprovalState:string = "Approved";
  imageName:string;

  addClassForm = this.fb.group({
    name: ['', [Validators.required]],
    teacher: ['', [Validators.required]],
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
    this.allTeachers();
  }

  get class_add(){
    return this.addClassForm.controls;
  }

  allTeachers(){
    this.uss.getTeachers().subscribe(data => {
      this.Teachers = data.filter(o => o.fName !== 'admin');
    });
  }

  onChange(event) { 
    this.imageFile = event.target.files[0];
  } 

  addNewClass(){
    this.pendingClzAdd = true;
    const storagePath = "/class_covers/"+this.addClassForm.get('teacher').value+"/"+Math.random();
    const storageRef = this.fbs.ref(storagePath);
    const uploadTask = this.fbs.upload(storagePath, this.imageFile);
    
    this.percentageVal = uploadTask.percentageChanges();
    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        this.UploadedImageURL = storageRef.getDownloadURL();
        this.UploadedImageURL.subscribe(imageUrl => {
          if (imageUrl) {
            if (this.addClassForm.valid) {
              var val = {
                name: this.addClassForm.get('name').value,
                notes: this.addClassForm.get('notes').value,
                hDate: this.addClassForm.get('date').value,
                htime: this.addClassForm.get('time').value,
                classFee: this.addClassForm.get('fee').value,
                imagePath: imageUrl,
                approvalStatus: this.adminApprovalState,
                teacherModel:{
                  teacherId: this.addClassForm.get('teacher').value
                }
              }
              this.cs.addClass(val).subscribe((res) => {
                this.pendingClzAdd = false;
                this.successMsg = true;
                this.addClassForm.reset();
                this.note = '';
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
