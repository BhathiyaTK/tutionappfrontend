import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { AngularFireStorage } from "@angular/fire/storage";
import { Observable } from 'rxjs/internal/Observable';
import { finalize } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';
import { ClassesService } from 'src/app/services/classes/classes.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-last-lesson',
  templateUrl: './last-lesson.component.html',
  styleUrls: ['./last-lesson.component.css']
})
export class LastLessonComponent implements OnInit {

  successAlert:boolean = false;
  errorAlert:boolean = false;
  successText:string = '';
  errorText:string = '';
  hasClass:boolean = false;
  emptyMsg:boolean = false;
  inputDisabled:boolean = false;
  videoFile:string;
  isUploading: boolean;
  downloadUrl:any;
  progress:any;
  lastClass:any = [];

  percentageVal: Observable<number>;
  trackSnapshot: Observable<any>;
  UploadedVideoURL: Observable<any>;

  constructor( public fb: FormBuilder, 
    private af: AngularFireStorage, 
    private afd: AngularFireDatabase, 
    private classService: ClassesService,
    private ar: ActivatedRoute) { }

  classId = this.ar.snapshot.params.id;

  videoUploadForm = this.fb.group({
    lesson: ['', [Validators.required]],
    date: ['', [Validators.required]],
    note: ['', [
      Validators.required,
      Validators.maxLength(400)
    ]],
    videoFile: ['', [
      Validators.required
    ]]
  })

  ngOnInit(): void {
    this.getLastClassData(this.classId);
  }

  get lessonUpload(){
    return this.videoUploadForm.controls;
  }

  onChange(event) { 
    this.videoFile = event.target.files[0]; 
  } 

  lessonAdd(){
    this.isUploading = true;

    if (this.videoUploadForm.valid) {
      this.inputDisabled = true;
      const storagePath = "/classes/"+this.classId+"/"+Math.random();
      const storageRef = this.af.ref(storagePath);
      const uploadTask = this.af.upload(storagePath, this.videoFile);

      this.percentageVal = uploadTask.percentageChanges();
      uploadTask.snapshotChanges().pipe(
        finalize(() => {
          this.UploadedVideoURL = storageRef.getDownloadURL();
          this.UploadedVideoURL.subscribe(downloadUrl => {
            if (downloadUrl) {
              this.downloadUrl = downloadUrl;
              this.afd.database.ref(this.classId).child('last_lesson').set({
                lesson: this.videoUploadForm.get('lesson').value,
                date: this.videoUploadForm.get('date').value,
                note: this.videoUploadForm.get('note').value,
                videoFile: this.downloadUrl,
                videoPath: storagePath
              })
            }
            this.isUploading = false;
            this.successAlert = true;
            this.successText = 'Lesson uploaded successfully.';
            this.inputDisabled = false;
            this.emptyMsg = false;
            this.videoUploadForm.reset();
          }, error => {
            this.isUploading = false;
            this.errorAlert = true;
            this.errorText = "Lesson updating failed!";
            this.inputDisabled = false;
            this.videoUploadForm.reset();
          })
        })
      ).subscribe();
    }
  }

  getLastClassData(cId){
    this.classService.getLastLesson(cId).valueChanges().subscribe(classData => {
      if (classData == null) {
        this.emptyMsg = true;
      }else{
        this.hasClass = true;
        this.lastClass = classData;
      }
    })
  }

  closeAlert(){ 
    this.successAlert = false ;
    this.errorAlert = false;
  }

}
