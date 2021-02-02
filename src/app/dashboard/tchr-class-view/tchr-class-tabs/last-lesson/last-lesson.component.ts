import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { AngularFireStorage } from "@angular/fire/storage";
import { Observable } from 'rxjs/internal/Observable';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-last-lesson',
  templateUrl: './last-lesson.component.html',
  styleUrls: ['./last-lesson.component.css']
})
export class LastLessonComponent implements OnInit {

  successAlert:boolean = false;
  errorAlert:boolean = false;
  errorText:string = '';
  videoFile:string;
  isUploading: boolean;
  downloadUrl:any;
  progress:any;

  percentageVal: Observable<number>;
  trackSnapshot: Observable<any>;
  UploadedVideoURL: Observable<any>;

  classId = 121;

  constructor( public fb: FormBuilder, private af: AngularFireStorage) { }

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
      var val = {
        lesson: this.videoUploadForm.get('lesson').value,
        date: this.videoUploadForm.get('date').value,
        note: this.videoUploadForm.get('note').value,
        videoFile: this.UploadedVideoURL
      }

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
            }
          })
          this.isUploading = false;
          this.successAlert = true;
        })
      ).subscribe();
      this.videoUploadForm.reset();
    }
  }

  closeAlert(){ this.successAlert = false }

}
