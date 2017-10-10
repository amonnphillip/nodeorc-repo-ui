import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { UploadComponent } from './upload/upload.component';
import { NodeorcRepoService } from './nodeorc-repo-service/nodeorc-repo.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { NavComponent } from './nav/nav.component';

const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent },
  {
    path: 'upload',
    component: UploadComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  { path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
];

@NgModule({
  declarations: [
    AppComponent,
    UploadComponent,
    DashboardComponent,
    LoginComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
  ],
  providers: [
    NodeorcRepoService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
