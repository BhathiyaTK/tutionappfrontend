import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CommonNavbarComponent } from './common-navbar/common-navbar.component';
import { CopyrightSecComponent } from './copyright-sec/copyright-sec.component';
import { RegisterComponent } from './register/register.component';
import { StudentRegisterComponent } from './register/student-register/student-register.component';
import { TeacherRegisterComponent } from './register/teacher-register/teacher-register.component';
import { SigninComponent } from './home/signin/signin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './dashboard/sidebar/sidebar.component';
import { DashboardTopbarComponent } from './dashboard/dashboard-topbar/dashboard-topbar.component';
import { UserProfileComponent } from './dashboard/user-profile/user-profile.component';
import { ShowBioInfoComponent } from './dashboard/user-profile/show-bio-info/show-bio-info.component';
import { ShowUserStatusComponent } from './dashboard/user-profile/show-user-status/show-user-status.component';
import { UpdateBioInfoComponent } from './dashboard/user-profile/update-bio-info/update-bio-info.component';
import { JoinedClassesComponent } from './dashboard/joined-classes/joined-classes.component';
import { StdClassViewComponent } from './dashboard/std-class-view/std-class-view.component';
import { StdClassSummeryComponent } from './dashboard/std-class-view/std-class-summery/std-class-summery.component';
import { StdClassTabsComponent } from './dashboard/std-class-view/std-class-tabs/std-class-tabs.component';
import { AllClassesComponent } from './dashboard/all-classes/all-classes.component';
import { PurchaseClassComponent } from './dashboard/purchase-class/purchase-class.component';
import { MyClassesComponent } from './dashboard/my-classes/my-classes.component';
import { ErrorIntercept } from './services/http-interceptor';
import { TokenInterceptor } from './services/token-interceptor';
import { TeacherInfoModalComponent } from './dashboard/std-class-view/std-class-summery/teacher-info-modal/teacher-info-modal.component';
import { UnavailableClassesComponent } from './dashboard/unavailable-classes/unavailable-classes.component';
import { TchrClassViewComponent } from './dashboard/tchr-class-view/tchr-class-view.component';
import { TchrClassSummeryComponent } from './dashboard/tchr-class-view/tchr-class-summery/tchr-class-summery.component';
import { TchrClassTabsComponent } from './dashboard/tchr-class-view/tchr-class-tabs/tchr-class-tabs.component';
import { LastLessonComponent } from './dashboard/tchr-class-view/tchr-class-tabs/last-lesson/last-lesson.component';
import { DndDirective } from './directives/dnd.directive';
import { StudyMaterialsComponent } from './dashboard/tchr-class-view/tchr-class-tabs/study-materials/study-materials.component';
import { AssignmentsComponent } from './dashboard/tchr-class-view/tchr-class-tabs/assignments/assignments.component';
import { AuthGuard } from './services/auth/auth.guard';
import { AuthService } from './services/auth/auth.service';
import { UserServicesService } from './services/users/user-services.service';
import { NoAccessComponent } from './error/no-access/no-access.component';
import { NotFoundComponent } from './error/not-found/not-found/not-found.component';
import { AdminDashboardComponent } from './dashboard/admin-dashboard/admin-dashboard.component';
import { AdminManageClassesComponent } from './dashboard/admin-manage-classes/admin-manage-classes.component';
import { AdminManageTeachersComponent } from './dashboard/admin-manage-teachers/admin-manage-teachers.component';
import { AdminManageStudentsComponent } from './dashboard/admin-manage-students/admin-manage-students.component';
import { StudentGuard } from './services/auth/student.guard';
import { TeacherGuard } from './services/auth/teacher.guard';
import { AdminGuard } from './services/auth/admin.guard';
import { AddClassComponent } from './dashboard/admin-manage-classes/add-class/add-class.component';
import { AdminAllClassesComponent } from './dashboard/admin-manage-classes/admin-all-classes/admin-all-classes.component';
import { ClassesService } from './services/classes/classes.service';
import { AllTeachersComponent } from './dashboard/admin-manage-teachers/all-teachers/all-teachers.component';
import { AllStudentsComponent } from './dashboard/admin-manage-students/all-students/all-students.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CommonNavbarComponent,
    CopyrightSecComponent,
    RegisterComponent,
    StudentRegisterComponent,
    TeacherRegisterComponent,
    SigninComponent,
    DashboardComponent,
    SidebarComponent,
    DashboardTopbarComponent,
    UserProfileComponent,
    ShowBioInfoComponent,
    ShowUserStatusComponent,
    UpdateBioInfoComponent,
    JoinedClassesComponent,
    StdClassViewComponent,
    StdClassSummeryComponent,
    StdClassTabsComponent,
    AllClassesComponent,
    PurchaseClassComponent,
    MyClassesComponent,
    TeacherInfoModalComponent,
    UnavailableClassesComponent,
    TchrClassViewComponent,
    TchrClassSummeryComponent,
    TchrClassTabsComponent,
    LastLessonComponent,
    DndDirective,
    StudyMaterialsComponent,
    AssignmentsComponent,
    NoAccessComponent,
    NotFoundComponent,
    AdminDashboardComponent,
    AdminManageClassesComponent,
    AdminManageTeachersComponent,
    AdminManageStudentsComponent,
    AddClassComponent,
    AdminAllClassesComponent,
    AllTeachersComponent,
    AllStudentsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent},
      { 
        path: 'register', 
        component: RegisterComponent,
        children: [
          { path: '', redirectTo: 'student', pathMatch: 'full' },
          { path: 'student', component: StudentRegisterComponent },
          { path: 'teacher', component: TeacherRegisterComponent }
        ]
      },
      { 
        path: 'mPanel', 
        component: DashboardComponent,
        canActivate: [AuthGuard],
        children: [
          { path: 'profile', component: UserProfileComponent},
          { path: 'joined-classes/:id/:name', component: StdClassViewComponent, canActivate: [StudentGuard] },
          { path: 'joined-classes', component: JoinedClassesComponent, canActivate: [StudentGuard] },
          { path: 'unavailable-classes', component: UnavailableClassesComponent, canActivate: [StudentGuard] },
          { path: 'classes/:id/:name/purchase', component: PurchaseClassComponent, canActivate: [StudentGuard] },
          { path: 'classes', component: AllClassesComponent, canActivate: [StudentGuard] },
          { path: 'my-classes/:id/:name', component: TchrClassViewComponent, canActivate: [TeacherGuard] },
          { path: 'my-classes', component: MyClassesComponent, canActivate: [TeacherGuard] },
          { path: 'dashboard', component: AdminDashboardComponent, canActivate: [AdminGuard] },
          { path: 'manage-classes', component: AdminManageClassesComponent, canActivate: [AdminGuard] },
          { path: 'manage-teachers', component: AdminManageTeachersComponent, canActivate: [AdminGuard] },
          { path: 'manage-students', component: AdminManageStudentsComponent, canActivate: [AdminGuard] },
          { path: 'no-access', component: NoAccessComponent },
          { path: 'not-found', component: NotFoundComponent }
        ]
      }
    ]),
    NgxDropzoneModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyBKAeFn4RMGSZq3f7OOhE1wOI3_jMJ82zY",
      authDomain: "schoolapp-e7d45.firebaseapp.com",
      projectId: "schoolapp-e7d45",
      storageBucket: "schoolapp-e7d45.appspot.com",
      messagingSenderId: "53365894430",
      appId: "1:53365894430:web:9cdca2ce35272ea6b0ed0f",
      measurementId: "G-KF92S6WN7L"
    }),
    AngularFireStorageModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorIntercept,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi:true
    },
    AuthService,
    AuthGuard,
    StudentGuard,
    TeacherGuard,
    AdminGuard,
    UserServicesService,
    ClassesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
