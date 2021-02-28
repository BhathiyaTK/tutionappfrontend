import { EventEmitter } from '@angular/core';
import { Component, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  sidebarStatus:string;

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
  }

  @Output() exEvent = new EventEmitter();
  sidebarToggleEvent(){
    this.exEvent.emit(null);
  }

}
