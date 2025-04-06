import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthorDashboardComponent } from './author-dashboard/author-dashboard.component';
import { WriterComponent } from './author-dashboard/writer/writer.component';
import { MyblogsComponent } from './author-dashboard/myblogs/myblogs.component';
import { EditComponent } from './author-dashboard/edit/edit.component';
import { FullpostComponent } from './fullpost/fullpost.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'post/:id',
    component: FullpostComponent,
  },
  {
    path: 'author-dashboard',
    component: AuthorDashboardComponent,
    children: [
      {
        path: 'writer',
        component: WriterComponent,
      },
      {
        path: 'myblogs',
        component: MyblogsComponent,
      },
      {
        path: 'edit/:id',
        component: EditComponent,
      },
    ],
  },
];
