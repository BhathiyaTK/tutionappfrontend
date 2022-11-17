import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AdminDashboardComponent } from './dashboard/admin-dashboard/admin-dashboard.component';
import { AdminManageClassesComponent } from './dashboard/admin-manage-classes/admin-manage-classes.component';
import { AdminManageStudentsComponent } from './dashboard/admin-manage-students/admin-manage-students.component';
import { AdminManageTeachersComponent } from './dashboard/admin-manage-teachers/admin-manage-teachers.component';
import { AllClassesComponent } from './dashboard/all-classes/all-classes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { JoinedClassesComponent } from './dashboard/joined-classes/joined-classes.component';
import { MyClassesComponent } from './dashboard/my-classes/my-classes.component';
import { PurchaseClassComponent } from './dashboard/purchase-class/purchase-class.component';
import { StdClassViewComponent } from './dashboard/std-class-view/std-class-view.component';
import { TchrClassRequestsComponent } from './dashboard/tchr-class-requests/tchr-class-requests.component';
import { ClassEditComponent } from './dashboard/tchr-class-view/class-edit/class-edit.component';
import { TchrClassViewComponent } from './dashboard/tchr-class-view/tchr-class-view.component';
import { TeacherCreateClassComponent } from './dashboard/teacher-create-class/teacher-create-class.component';
import { UnavailableClassesComponent } from './dashboard/unavailable-classes/unavailable-classes.component';
import { UserProfileComponent } from './dashboard/user-profile/user-profile.component';
import { NoAccessComponent } from './error/no-access/no-access.component';
import { NotFoundComponent } from './error/not-found/not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { PasswordRestComponent } from './password-rest/password-rest.component';
import { RegisterComponent } from './register/register.component';
import { StudentRegisterComponent } from './register/student-register/student-register.component';
import { TeacherRegisterComponent } from './register/teacher-register/teacher-register.component';
import { AdminGuard } from './services/auth/admin.guard';
import { AuthGuard } from './services/auth/auth.guard';
import { StudentGuard } from './services/auth/student.guard';
import { TeacherGuard } from './services/auth/teacher.guard';

const routes: Routes = [
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
  { path: 'about', component: AboutComponent},
  { path: 'forgotPassword', component: PasswordRestComponent},
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
      { path: 'my-classes/:id/:name/edit', component: ClassEditComponent, canActivate: [TeacherGuard] },
      { path: 'my-classes', component: MyClassesComponent, canActivate: [TeacherGuard] },
      { path: 'create-class', component: TeacherCreateClassComponent, canActivate: [TeacherGuard] },
      { path: 'class-requests', component: TchrClassRequestsComponent, canActivate: [TeacherGuard] },
      { path: 'dashboard', component: AdminDashboardComponent, canActivate: [AdminGuard] },
      { path: 'manage-classes', component: AdminManageClassesComponent, canActivate: [AdminGuard] },
      { path: 'manage-teachers', component: AdminManageTeachersComponent, canActivate: [AdminGuard] },
      { path: 'manage-students', component: AdminManageStudentsComponent, canActivate: [AdminGuard] },
      { path: 'no-access', component: NoAccessComponent },
      { path: 'not-found', component: NotFoundComponent }
    ]
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
