import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { App } from './app';
import { routes } from './app.routes';
import { TenantService } from './services/tenant.service';
import { ThemeService } from './services/theme.service';
import { AlumniService } from './services/alumni.service';
import { EventService } from './services/event.service';
import { PhotoService } from './services/photo.service';
import { NewsService } from './services/news.service';
import { ForumService } from './services/forum.service';
import { AuthService } from './services/auth.service';
import { ErrorInterceptor } from './services/error.interceptor';
import { AuthInterceptor } from './services/auth.interceptor'; // Import AuthInterceptor
import { LoaderInterceptor } from './services/loader.interceptor'; // Import LoaderInterceptor

import { DirectoryComponent } from './components/directory/directory.component';
import { EventsComponent } from './components/events/events.component';
import { GalleryListComponent } from './components/gallery-list/gallery-list.component';
import { AlbumDetailComponent } from './components/album-detail/album-detail.component';
import { NewsListComponent } from './components/news-list/news-list.component';
import { ForumComponent } from './components/forum/forum.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { NewsAdminComponent } from './components/news-admin/news-admin.component';
import { EventsAdminComponent } from './components/events-admin/events-admin.component';
import { PhotoAdminComponent } from './components/photo-admin/photo-admin.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MemberAdminComponent } from './components/member-admin/member-admin.component';
import { EmailAdminComponent } from './components/email-admin/email-admin.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { HomeRedirectComponent } from './components/home-redirect/home-redirect.component';
import { LoaderComponent } from './components/loader/loader.component'; // Import LoaderComponent

@NgModule({
  declarations: [
    App,
    DirectoryComponent,
    EventsComponent,
    GalleryListComponent,
    AlbumDetailComponent,
    NewsListComponent,
    ForumComponent,
    AdminDashboardComponent,
    NewsAdminComponent,
    EventsAdminComponent,
    PhotoAdminComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    MemberAdminComponent,
    EmailAdminComponent,
    UserDashboardComponent,
    HomeRedirectComponent,
    LoaderComponent // Declare LoaderComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule
  ],
  providers: [
    TenantService,
    ThemeService,
    AlumniService,
    EventService,
    PhotoService,
    NewsService,
    ForumService,
    AuthService,
    // Provide the interceptors in the correct order
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [App]
})
export class AppModule { }
