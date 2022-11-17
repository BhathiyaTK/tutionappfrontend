import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AppRoutingModule } from './app-routing.module';
import { environment } from './../environments/environment.prod';
import { ErrorIntercept } from './services/http-interceptor';
import { TokenInterceptor } from './services/token-interceptor';
import { AuthGuard } from './services/auth/auth.guard';
import { AuthService } from './services/auth/auth.service';
import { StudentGuard } from './services/auth/student.guard';
import { TeacherGuard } from './services/auth/teacher.guard';
import { AdminGuard } from './services/auth/admin.guard';
import { UserServicesService } from './services/users/user-services.service';
import { ClassesService } from './services/classes/classes.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { ChartsModule } from 'ng2-charts';
import { NgxSpinnerModule } from 'ngx-spinner';
import { DecimalPipe } from '@angular/common';
import { SidebarModule } from 'ng-sidebar';

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
import { TeacherInfoModalComponent } from './dashboard/std-class-view/std-class-summery/teacher-info-modal/teacher-info-modal.component';
import { UnavailableClassesComponent } from './dashboard/unavailable-classes/unavailable-classes.component';
import { TchrClassViewComponent } from './dashboard/tchr-class-view/tchr-class-view.component';
import { TchrClassSummeryComponent } from './dashboard/tchr-class-view/tchr-class-summery/tchr-class-summery.component';
import { TchrClassTabsComponent } from './dashboard/tchr-class-view/tchr-class-tabs/tchr-class-tabs.component';
import { LastLessonComponent } from './dashboard/tchr-class-view/tchr-class-tabs/last-lesson/last-lesson.component';
import { DndDirective } from './directives/dnd.directive';
import { StudyMaterialsComponent } from './dashboard/tchr-class-view/tchr-class-tabs/study-materials/study-materials.component';
import { AssignmentsComponent } from './dashboard/tchr-class-view/tchr-class-tabs/assignments/assignments.component';
import { NoAccessComponent } from './error/no-access/no-access.component';
import { NotFoundComponent } from './error/not-found/not-found/not-found.component';
import { AdminDashboardComponent } from './dashboard/admin-dashboard/admin-dashboard.component';
import { AdminManageClassesComponent } from './dashboard/admin-manage-classes/admin-manage-classes.component';
import { AdminManageTeachersComponent } from './dashboard/admin-manage-teachers/admin-manage-teachers.component';
import { AdminManageStudentsComponent } from './dashboard/admin-manage-students/admin-manage-students.component';
import { AddClassComponent } from './dashboard/admin-manage-classes/add-class/add-class.component';
import { AdminAllClassesComponent } from './dashboard/admin-manage-classes/admin-all-classes/admin-all-classes.component';
import { AllTeachersComponent } from './dashboard/admin-manage-teachers/all-teachers/all-teachers.component';
import { AllStudentsComponent } from './dashboard/admin-manage-students/all-students/all-students.component';
import { NextClassComponent } from './dashboard/tchr-class-view/tchr-class-tabs/next-class/next-class.component';
import { DashboardNumsComponent } from './dashboard/admin-dashboard/dashboard-nums/dashboard-nums.component';
import { BarChartComponent } from './dashboard/admin-dashboard/bar-chart/bar-chart.component';
import { PieChartComponent } from './dashboard/admin-dashboard/pie-chart/pie-chart.component';
import { StdAddToClassComponent } from './dashboard/admin-manage-students/std-add-to-class/std-add-to-class.component';
import { PasswordRestComponent } from './password-rest/password-rest.component';
import { AboutComponent } from './about/about.component';
import { ClassApprovalsComponent } from './dashboard/admin-manage-classes/class-approvals/class-approvals.component';
import { CustomFiletypeValidationService } from './services/validations/custom-filetype-validation.service';
import { TeacherCreateClassComponent } from './dashboard/teacher-create-class/teacher-create-class.component';
import { FirebaseAuthService } from './services/auth/firebase-auth.service';
import { StudentsComponent } from './dashboard/tchr-class-view/tchr-class-tabs/students/students.component';
import { ClassEditComponent } from './dashboard/tchr-class-view/class-edit/class-edit.component';
import { TchrClassRequestsComponent } from './dashboard/tchr-class-requests/tchr-class-requests.component';

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
    AllStudentsComponent,
    NextClassComponent,
    DashboardNumsComponent,
    BarChartComponent,
    PieChartComponent,
    StdAddToClassComponent,
    PasswordRestComponent,
    AboutComponent,
    ClassApprovalsComponent,
    TeacherCreateClassComponent,
    StudentsComponent,
    ClassEditComponent,
    TchrClassRequestsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgxDropzoneModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    NgxPaginationModule,
    ChartsModule,
    NgxSpinnerModule,
    SidebarModule.forRoot()
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
    FirebaseAuthService,
    AuthGuard,
    StudentGuard,
    TeacherGuard,
    AdminGuard,
    UserServicesService,
    ClassesService,
    CustomFiletypeValidationService,
    DecimalPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
