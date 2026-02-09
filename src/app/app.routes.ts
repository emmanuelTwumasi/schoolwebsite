import { Routes } from '@angular/router';
import { DirectoryComponent } from './components/directory/directory.component';
import { EventsComponent } from './components/events/events.component';
import { GalleryListComponent } from './components/gallery-list/gallery-list.component';
import { AlbumDetailComponent } from './components/album-detail/album-detail.component';
import { NewsListComponent } from './components/news-list/news-list.component';
import { ForumComponent } from './components/forum/forum.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { HomeRedirectComponent } from './components/home-redirect/home-redirect.component'; // Import HomeRedirectComponent
import { AuthGuard } from './services/auth.guard';

export const routes: Routes = [
  { path: 'news', component: NewsListComponent },
  { path: 'directory', component: DirectoryComponent },
  { path: 'events', component: EventsComponent },
  { path: 'gallery', component: GalleryListComponent },
  { path: 'gallery/:id', component: AlbumDetailComponent },
  { path: 'forum', component: ForumComponent },
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin'] }
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    data: { roles: ['alumni', 'admin'] }
  },
  {
    path: 'dashboard',
    component: UserDashboardComponent,
    canActivate: [AuthGuard],
    data: { roles: ['alumni', 'admin'] }
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: HomeRedirectComponent, pathMatch: 'full' } // Use HomeRedirectComponent for the root path
];
