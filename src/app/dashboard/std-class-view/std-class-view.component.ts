import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-std-class-view',
  templateUrl: './std-class-view.component.html',
  styleUrls: ['./std-class-view.component.css']
})
export class StdClassViewComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      // let id = params.get('id');
    });
  }

}
