import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-study-materials',
  templateUrl: './study-materials.component.html',
  styleUrls: ['./study-materials.component.css']
})
export class StudyMaterialsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  files: File[] = [];

	onSelect(event) {
    if (this.files && this.files.length >= 2) {
      this.onRemove(this.files[0]);
    }
    this.files.push(...event.addedFiles);
    console.log(event.addedFiles[0]);
    console.log(event.addedFiles[0].name);
  }

	onRemove(event) {
		console.log(event);
		this.files.splice(this.files.indexOf(event), 1);
  }
  

}
