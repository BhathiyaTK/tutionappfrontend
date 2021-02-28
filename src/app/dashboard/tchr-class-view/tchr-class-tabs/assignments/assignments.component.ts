import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ClassesService } from 'src/app/services/classes/classes.service';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {

  successAlert:boolean = false;
  errorAlert:boolean = false;
  successText:string = '';
  errorText:string = '';
  hasClass:boolean = false;
  emptyMsg:boolean = false;
  inputDisabled:boolean = false;
  assigtFile:string;
  isUploading: boolean;
  downloadUrl:any;
  progress:any;
  lastClass:any = [];

  percentageVal: Observable<number>;
  trackSnapshot: Observable<any>;
  UploadedVideoURL: Observable<any>;

  assigtList:any = [];
  assigtKeyList:any = [];

  constructor(public fb: FormBuilder, 
    private af: AngularFireStorage, 
    private afd: AngularFireDatabase, 
    private classService: ClassesService,
    private ar: ActivatedRoute) { }

  classId = this.ar.snapshot.params.id;

  ngOnInit(): void {
    this.getAssignments(this.classId);
  }

  assigtUploadForm = this.fb.group({
    assigtName: ['', [Validators.required]],
    assigtDeadline: ['', [Validators.required]],
    assigtFile: ['', [
      Validators.required
    ]]
  })

  get assigtUpload(){
    return this.assigtUploadForm.controls;
  }

  onChange(event) { 
    this.assigtFile = event.target.files[0]; 
  } 

  assigtAdd(){
    this.isUploading = true;

    if (this.assigtUploadForm.valid) {
      this.inputDisabled = true;
      const storagePath = "/assignments/"+this.classId+"/"+Math.random();
      const storageRef = this.af.ref(storagePath);
      const uploadTask = this.af.upload(storagePath, this.assigtFile);

      this.percentageVal = uploadTask.percentageChanges();
      uploadTask.snapshotChanges().pipe(
        finalize(() => {
          this.UploadedVideoURL = storageRef.getDownloadURL();
          this.UploadedVideoURL.subscribe(downloadUrl => {
            if (downloadUrl) {
              this.downloadUrl = downloadUrl;
              this.afd.database.ref(this.classId).child('assignments').child(this.randomAssigtId(8)).set({
                title: this.assigtUploadForm.get('assigtName').value,
                date: this.assigtUploadForm.get('assigtDeadline').value,
                assigtFile: this.downloadUrl,
                assigtPath: storagePath
              })
            }
            this.emptyMsg = false;
            this.isUploading = false;
            this.successAlert = true;
            this.successText = 'Assignment uploaded successfully.';
            this.inputDisabled = false;
            this.assigtUploadForm.reset();
            this.getAssignments(this.classId);
          }, error => {
            this.isUploading = false;
            this.errorAlert = true;
            this.errorText = error;
            this.inputDisabled = false;
            this.assigtUploadForm.reset();
          })
        })
      ).subscribe();
    }
  }

  getAssignments(cId){
    this.classService.getAssignmentList(cId).snapshotChanges().subscribe(
      list => {
        if (list.length == 0) {
          this.emptyMsg = true;
        }else{
          this.assigtList = list.map(item => {
            return item.payload.val();
          });
          this.assigtKeyList = list.map(itemKey => {
            return itemKey.payload.key;
          });
        }
      }
    )
  }

  randomAssigtId(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  shorterFileName(assigtName, len){
    if (assigtName.length <= len) {
      return assigtName;
    }else{
      assigtName = assigtName.substr(0,len) + (assigtName.length > len ? '[...]' : '');
      return assigtName;
    }
  }

  closeAlert(){ 
    this.successAlert = false ;
    this.errorAlert = false;
  }

}
