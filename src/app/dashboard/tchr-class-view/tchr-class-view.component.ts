import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClassesService } from 'src/app/services/classes/classes.service';

@Component({
  selector: 'app-tchr-class-view',
  templateUrl: './tchr-class-view.component.html',
  styleUrls: ['./tchr-class-view.component.css']
})
export class TchrClassViewComponent implements OnInit {

  bannerImage: string;

  constructor(private cs: ClassesService, private ar: ActivatedRoute) { }

  classId = this.ar.snapshot.params.id;
  className = this.ar.snapshot.params.name;

  ngOnInit(): void {
    this.getSingleClassData();
  }

  getSingleClassData() {
    this.cs.getSingleClass(this.classId).subscribe(data => {
      this.bannerImage = data.imagePath;
    })
  }

}
