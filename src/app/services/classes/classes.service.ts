import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassesService {

  readonly APIUrl = "https://tutionspringbootbackend.herokuapp.com";

  constructor(private http: HttpClient) { }

  getClasses(): Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl + '/admin/getallclass');
  }

  addClass(val:any){
    return this.http.post<any>(this.APIUrl + '/admin/newclass', val);
  }

  updateClass(val:any){
    return this.http.put(this.APIUrl + '/admin/updatetuionclass/' + val.classId, val);
  }

  deleteClass(val:any){
    return this.http.delete(this.APIUrl + '/admin/deletetuionclass/' + val.classId, val);
  }

}
