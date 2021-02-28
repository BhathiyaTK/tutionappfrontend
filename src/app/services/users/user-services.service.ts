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

  public getStudents(pageNo): Observable<any>{
    return this.http.get<any>(this.APIUrl + '/getallstudents?pageNo='+ pageNo +'&pageSize=10');
  }

  public getSingleTeacher(userId, currentMonth): Observable<any>{
    return this.http.get<any>(this.APIUrl + '/getOneTeacher/'+ userId +'/2021' + currentMonth);
  }

  public getSingleStudent(userId, currentMonth): Observable<any>{
    return this.http.get<any>(this.APIUrl + '/getOneStudent/'+ userId +'/2021' + currentMonth);
  }

  studentJoinedToClass(scId, sId){
    return this.http.post(this.APIUrl + '/student/addSubClass/' + scId + '/' + sId, {responseType: 'text' as 'json'});
  }

  updateTeachers(val:any){
    return this.http.put(this.APIUrl + '/teacher/update/' + val.teacherId, val);
  }

  updateStudents(val:any){
    return this.http.put(this.APIUrl + '/student/update/' + val.studentId, val);
  }

  deleteTeacher(tId:any){
    return this.http.delete(this.APIUrl + '/admin/deleteTeacher/' + tId, {responseType: 'text' as 'json'});
  }

  deleteStudent(val:any){
    return this.http.delete(this.APIUrl + '/admin/deleteTeacher/' + val.studentId, val);
  }
  
}
