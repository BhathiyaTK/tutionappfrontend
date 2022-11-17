import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { FirebaseAuthService } from '../auth/firebase-auth.service';

@Injectable({
  providedIn: 'root'
})
export class ClassesService {

  readonly APIUrl = "http://lms.clickyapp.cloud";

  studyMaterialList: AngularFireList<any>;
  assignmentList: AngularFireList<any>;
  lastClass: any;
  nextClass: any;

  constructor(
    private http: HttpClient,
    private firebaseDb: AngularFireDatabase,
    private firebaseStorage: AngularFireStorage,
    private fAuth: FirebaseAuthService) { }

  user_Id = this.fAuth.userId;

  // Admin Class Services

  public getClasses(pageNo): Observable<any> {
    return this.http.get<any>(this.APIUrl + '/getallclass?pageNo=' + pageNo + '&pageSize=20');
  }

  addClass(val: any) {
    return this.http.post<any>(this.APIUrl + '/tutionClass/newclass', val, { responseType: 'text' as 'json' });
  }

  updateClass(classId, val: any) {
    return this.http.put(this.APIUrl + '/tutionClass/updatetuionclass/' + classId, val);
  }

  deleteClass(classId) {
    return this.http.delete(this.APIUrl + '/admin/deletetutionclass/' + classId, { responseType: 'text' as 'json' });
  }

  approveOrRejectClass(classId, approvalStatus) {
    return this.http.put<any>(this.APIUrl + '/admin/approval/' + classId + '/' + approvalStatus, null);
  }

  // Teacher and Student Class Services

  public getSingleClass(classId): Observable<any> {
    return this.http.get<any>(this.APIUrl + '/getOneTuionClass/' + classId);
  }

  // Student Class Services

  public getJoinedClasses(userId, currentMonth): Observable<any> {
    return this.http.get<any>(this.APIUrl + '/getStudentJoinedClass/' + userId + '/2021' + currentMonth);
  }

  // Teacher Class Services

  getOwnedClasses(teacherId): Observable<any> {
    return this.http.get<any>(this.APIUrl + '/getOwnClassDetails/' + teacherId);
  }

  getClassStudents(subClassId): Observable<any> {
    return this.http.get<any>(this.APIUrl + '/filter/subClassRegisterStudents/' + subClassId);
  }

  getNextClassLink(classId) {
    this.nextClass = this.firebaseDb.object('/' + classId + '/next_class');
    return this.nextClass;
  }

  getLastLesson(classId) {
    this.lastClass = this.firebaseDb.object('/' + classId + '/last_lesson');
    return this.lastClass;
  }

  getStudyMaterialList(classId) {
    this.studyMaterialList = this.firebaseDb.list('/' + classId + '/study_materials');
    return this.studyMaterialList;
  }

  getAssignmentList(classId) {
    this.assignmentList = this.firebaseDb.list('/' + classId + '/assignments');
    return this.assignmentList;
  }

  deleteClassCover(img: any): void {
    this.firebaseStorage.refFromURL(img).delete();
  }

  deleteFile(fileData: any): void {
    this.delFileFromFireDb(fileData.fileKey, fileData.classId, fileData.fileCategory).then(() => {
      this.delFileFromFireStorage(fileData.filePath);
    }).catch(error => { return error; })
  }

  private delFileFromFireDb(key: string, classId: string, category: string): Promise<void> {
    return this.firebaseDb.list(classId + '/' + category).remove(key);
  }

  private delFileFromFireStorage(path: string) {
    this.firebaseStorage.ref(path).delete();
  }

}
