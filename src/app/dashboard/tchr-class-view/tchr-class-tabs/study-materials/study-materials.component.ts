import { registerLocaleData } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from "@angular/fire/storage";
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ClassesService } from 'src/app/services/classes/classes.service';

@Component({
  selector: 'app-study-materials',
  templateUrl: './study-materials.component.html',
  styleUrls: ['./study-materials.component.css']
})
export class StudyMaterialsComponent implements OnInit {

  successAlert:boolean = false;
  errorAlert:boolean = false;
  successText:any = '';
  errorText:any = '';
  emptyMsg:boolean = false;
  isUploading: boolean;
  downloadUrl:any;
  zoneDisable: boolean = false;

  percentageVal: Observable<number>;

  uploadTask: AngularFireUploadTask;
  storageRef: AngularFireStorageReference;
  storagePath: string;

  smList: any[];
  smKeyList: any[];

  constructor(private afs: AngularFireStorage, 
    private afd: AngularFireDatabase, 
    private classService: ClassesService,
    private ar: ActivatedRoute) { }

  classId = this.ar.snapshot.params.id;

  ngOnInit() {
    this.getStudyMaterials(this.classId);
  }

  files: File[] = [];
  filesList: any[] = [];

	onSMSelect(event) {
    this.isUploading = true;
    this.zoneDisable = true;
    
    this.files.push(...event.addedFiles);

    for (let i = 0; i < event.addedFiles.length; i++) {
      this.storagePath = "/study_materials/"+this.classId+"/"+event.addedFiles[i].name;
      this.storageRef = this.afs.ref(this.storagePath);
      this.uploadTask = this.afs.upload(this.storagePath, this.files[i]);
      this.percentageVal = this.uploadTask.percentageChanges();

      this.filesList.push([this.storagePath, this.storageRef, event.addedFiles[i].name]);
    }
    this.uploadTask.snapshotChanges().pipe(
      finalize(async () => {
        for (let el = 0; el < this.filesList.length; el++) {
          this.downloadUrl = await this.filesList[el][1].getDownloadURL().toPromise();
          this.afd.database.ref(this.classId).child('study_materials').child(this.randomSMId(8)).set({
            downloadURL: this.downloadUrl, path: this.filesList[el][0], fileName: this.filesList[el][2]
          });
        }
        this.emptyMsg = false;
        this.isUploading = false;
        this.successAlert = true;
        this.successText = 'Study materials uploaded successfully.';
        this.files = [];
        this.filesList = [];
        setTimeout(() => {
          this.zoneDisable = false;
          this.getStudyMaterials(this.classId);
        }, 500);
      })
    ).subscribe();
  }

	onSMRemove(event) {
		console.log(event);
		this.files.splice(this.files.indexOf(event), 1);
  }

  getStudyMaterials(cId){
    this.classService.getStudyMaterialList(cId).snapshotChanges().subscribe(
      list => {
        if (list.length == 0) {
          this.emptyMsg = true;
        }else{
          this.smList = list.map(item => {
            this.emptyMsg = false;
            return item.payload.val();
          });
          this.smKeyList = list.map(itemKey => {
            return itemKey.payload.key;
          });
        }
      }
    )
  }

  delStudyMaterial(keyVal, filePath){
    var confirmation = confirm("Are you sure to delete this? This material can not be recovered after deleted.");
    if (confirmation) {
      let category = filePath.substring(0,16);
      let fileData = {
        classId: this.classId,
        fileCategory: category,
        fileKey: keyVal,
        filePath: filePath
      }
      this.classService.deleteFile(fileData);
      this.getStudyMaterials(this.classId);
    }
  }

  randomSMId(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  shorterFileName(fname, len){
    let ext = fname.substring(fname.indexOf('.')+1, fname.length).toLowerCase();
    let filename = fname.replace('.'+ext, '');
    if (filename.length <= len) {
      return fname;
    }else{
      filename = filename.substr(0,len) + (fname.length > len ? '[...]' : '');
      return filename + '.' + ext;
    }
  }

  closeAlert(){ 
    this.successAlert = false ;
    this.errorAlert = false;
  }

}
