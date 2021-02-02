import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServicesService {

  readonly APIUrl = "https://tutionspringbootbackend.herokuapp.com";

  constructor(private http: HttpClient) { }

  registerStudent(val:any){
    return this.http.post(this.APIUrl + '/newstudent/register', val);
  }

  registerTeacher(val:any){
    return this.http.post(this.APIUrl + '/newteacher/register', val);
  }

  public getAllUsers(): Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl + '/getAllUsers');
  }

  public getTeachers(): Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl + '/admin/getAllTeachers');
  }

  public getStudents(){
    return this.http.get(this.APIUrl + '/admin/getAllStudents');
  }

  updateTeachers(val:any){
    return this.http.put(this.APIUrl + '/teacher/update/' + val.teacherId, val);
  }

  updateStudents(val:any){
    return this.http.put(this.APIUrl + '/student/update/' + val.studentId, val);
  }

  deleteTeacher(val:any){
    return this.http.delete(this.APIUrl + '/admin/deleteTeacher/' + val.teacherId, val);
  }

  deleteStudent(val:any){
    return this.http.delete(this.APIUrl + '/admin/deleteTeacher/' + val.studentId, val);
  }
  
}
