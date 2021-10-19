import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServicesService {
  getAllEmails() {
    throw new Error('Method not implemented.');
  }

  readonly APIUrl = "https://masterybackend.tk";

  constructor(private http: HttpClient) { }

  registerStudent(val:any){
    return this.http.post(this.APIUrl + '/newstudent/register', val);
  }

  registerTeacher(val:any){
    return this.http.post(this.APIUrl + '/newteacher/register', val);
  }

  passwordReset(val:any){
    return this.http.get(this.APIUrl + '/passwordforget/' + val, {responseType: 'text' as 'json'});
  }

  public getAllUserEmails(): Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl + '/filter/getAllUsersEmails');
  }

  public getTeachers(): Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl + '/filter/filterGetAllTeachers');
  }

  public getStudents(pageNo): Observable<any>{
    return this.http.get<any>(this.APIUrl + '/getallstudents?pageNo='+ pageNo +'&pageSize=20');
  }

  public getSingleTeacher(userId, currentMonth): Observable<any>{
    return this.http.get<any>(this.APIUrl + '/getOneTeacher/'+ userId +'/2021' + currentMonth);
  }

  public getSingleStudent(userId, currentMonth): Observable<any>{
    return this.http.get<any>(this.APIUrl + '/getOneStudent/'+ userId +'/2021' + currentMonth);
  }

  studentJoinedToClass(scId, sId){
    return this.http.post(this.APIUrl + '/student/addSubClass/' + scId + '/' + sId, null, {responseType: 'text' as 'json'});
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

  deleteStudent(stdId:any){
    return this.http.delete(this.APIUrl + '/admin/deleteStudent/' + stdId, {responseType: 'text' as 'json'});
  }
  
}
