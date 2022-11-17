import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClassesService } from 'src/app/services/classes/classes.service';

@Component({
  selector: 'app-std-class-view',
  templateUrl: './std-class-view.component.html',
  styleUrls: ['./std-class-view.component.css']
})
export class StdClassViewComponent implements OnInit {

  bannerImage: string;

  constructor(private route: ActivatedRoute, private cs: ClassesService) { }

  classId = this.route.snapshot.params.id;
  className = this.route.snapshot.params.name;

  ngOnInit(): void {
    this.getSingleClassData();
    this.route.paramMap.subscribe(params => {
      // let id = params.get('id');
    });
  }

  getSingleClassData() {
    this.cs.getSingleClass(this.classId).subscribe(data => {
      this.bannerImage = data.imagePath;
    })
  }

}
