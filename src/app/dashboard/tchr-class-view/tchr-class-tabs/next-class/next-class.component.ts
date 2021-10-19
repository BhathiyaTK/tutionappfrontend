import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { ClassesService } from 'src/app/services/classes/classes.service';

@Component({
  selector: 'app-next-class',
  templateUrl: './next-class.component.html',
  styleUrls: ['./next-class.component.css']
})
export class NextClassComponent implements OnInit {

  successAlert:boolean = false;
  errorAlert:boolean = false;
  successText:string = '';
  errorText:string = '';
  hasClass:boolean = false;
  emptyMsg:boolean = false;
  inputDisabled:boolean = false;
  nextClassLink:any = '';

  constructor(public fb: FormBuilder, 
    private af: AngularFireStorage, 
    private afd: AngularFireDatabase, 
    private classService: ClassesService,
    private ar: ActivatedRoute) { }

  classId = this.ar.snapshot.params.id;

  ngOnInit(): void {
    this.getNextClass(this.classId);
  }

  nextClassForm = this.fb.group({
    zoomLink: ['', [Validators.required]]
  })

  get nextClass(){
    return this.nextClassForm.controls;
  }

  nextClassAdd(){
    if (this.nextClassForm.valid) {
      this.inputDisabled = true;

      this.afd.database.ref(this.classId).child('next_class').set({
        link: this.nextClassForm.get('zoomLink').value
      })
      .then(() => {
        this.successAlert = true;
        this.successText = 'Next class link added successfully.';
        this.inputDisabled = false;
        this.emptyMsg = false;
        this.nextClassForm.reset();
        this.getNextClass(this.classId);
      })
      .catch((error) => {
        this.errorAlert = true;
        this.errorText = "Next class updating failed!";
        this.inputDisabled = false;
        this.nextClassForm.reset();
      })
    }
  }

  getNextClass(cId){
    this.classService.getNextClassLink(cId).valueChanges().subscribe(nextLink => {
      if (nextLink == null) {
        this.emptyMsg = true;
      } else {
        this.nextClassLink = nextLink.link;
        return this.nextClassLink;
      }
    })
  }

  closeAlert(){ 
    this.successAlert = false ;
    this.errorAlert = false;
  }

}
