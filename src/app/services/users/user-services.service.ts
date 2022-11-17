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

  readonly APIUrl = "http://lms.clickyapp.cloud";

  constructor(private http: HttpClient) { }

  registerStudent(val: any) {
    return this.http.post(this.APIUrl + '/newstudent/register', val);
  }

  registerTeacher(val: any) {
    return this.http.post(this.APIUrl + '/newteacher/register', val);
  }

  passwordReset(val: any) {
    return this.http.get(this.APIUrl + '/passwordforget/' + val, { responseType: 'text' as 'json' });
  }

  public getAllUserEmails(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + '/filter/getAllUsersEmails');
  }

  public getTeachers(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + '/filter/filterGetAllTeachers');
  }

  public getStudents(pageNo): Observable<any> {
    return this.http.get<any>(this.APIUrl + '/getallstudents?pageNo=' + pageNo + '&pageSize=20');
  }

  public getSingleTeacher(userId, currentMonth): Observable<any> {
    return this.http.get<any>(this.APIUrl + '/getOneTeacher/' + userId + '/2021' + currentMonth);
  }

  public getSingleStudent(userId, currentMonth): Observable<any> {
    return this.http.get<any>(this.APIUrl + '/getOneStudent/' + userId + '/2021' + currentMonth);
  }

  studentJoinedToClass(val: any) {
    return this.http.post<any>(this.APIUrl + '/student/addSubClass', val, { responseType: 'text' as 'json' });
  }

  updateTeachers(teacherId, val: any) {
    return this.http.put(this.APIUrl + '/currentTeacher/update/' + teacherId, val);
  }

  updateStudents(studentId, val: any) {
    return this.http.put(this.APIUrl + '/currentStudent/update/' + studentId, val);
  }

  teacherCredUpdate(userId, val: any) {
    return this.http.put(this.APIUrl + '/currentTeacher/credentialsUpdate/' + userId, val);
  }

  studentCredUpdate(userId, val: any) {
    return this.http.put(this.APIUrl + '/currentStudent/credentialsUpdate/' + userId, val);
  }

  deleteTeacher(tId: any) {
    return this.http.delete(this.APIUrl + '/admin/deleteTeacher/' + tId, { responseType: 'text' as 'json' });
  }

  deleteStudent(stdId: any) {
    return this.http.delete(this.APIUrl + '/admin/deleteStudent/' + stdId, { responseType: 'text' as 'json' });
  }

}
