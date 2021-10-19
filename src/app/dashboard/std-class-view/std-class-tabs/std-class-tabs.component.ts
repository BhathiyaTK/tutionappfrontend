import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClassesService } from 'src/app/services/classes/classes.service';

@Component({
  selector: 'app-std-class-tabs',
  templateUrl: './std-class-tabs.component.html',
  styleUrls: ['./std-class-tabs.component.css']
})
export class StdClassTabsComponent implements OnInit {
  emptyMsg: boolean = false;
  hasClass: boolean = false;
  lastClass: any = [];
  smList: any[];
  smKeyList: string[];
  assigtList: any;
  assigtKeyList: any;

  constructor(private cs: ClassesService, private ar: ActivatedRoute) { }

  classId = this.ar.snapshot.params.id;

  ngOnInit(): void {
    this.getLastClassData(this.classId);
    this.getStudyMaterials(this.classId);
    this.getAssignments(this.classId);
  }

  getLastClassData(cId){
    this.cs.getLastLesson(cId).valueChanges().subscribe(classData => {
      if (classData == null) {
        this.emptyMsg = true;
        this.hasClass = false;
      }else{
        this.hasClass = true;
        this.lastClass = classData;
      }
    })
  }

  getStudyMaterials(cId){
    this.cs.getStudyMaterialList(cId).snapshotChanges().subscribe(
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

  getAssignments(cId){
    this.cs.getAssignmentList(cId).snapshotChanges().subscribe(
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

  smFileNameShorter(fname, len){
    let ext = fname.substring(fname.indexOf('.')+1, fname.length).toLowerCase();
    let filename = fname.replace('.'+ext, '');
    if (filename.length <= len) {
      return fname;
    }else{
      filename = filename.substr(0,len) + (fname.length > len ? '[...]' : '');
      return filename + '.' + ext;
    }
  }

  assgtFileNameShorter(assigtName, len){
    if (assigtName.length <= len) {
      return assigtName;
    }else{
      assigtName = assigtName.substr(0,len) + (assigtName.length > len ? '[...]' : '');
      return assigtName;
    }
  }

}
