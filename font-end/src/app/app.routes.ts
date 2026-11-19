import { Routes } from '@angular/router';
import { TaskListComponent } from '../task-list/task-list.component';
import { TestTaileComponent } from '../test-taile/test-taile.component';
import { LoginComponent } from '../auth/login/login.component';
import { RegisterComponent } from '../auth/register/register.component';
import { HomeComponent } from '../shared/home/home.component';
import { DashboardComponent } from '../shared/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';
import { guestGuard } from './guards/guest.guard';

export const routes: Routes = [
    {
        path: 'tt',
        component: TestTaileComponent,
        title: 'tt',
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [guestGuard]
    },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [guestGuard]
    },
    {
        path: 'panel',
        component: HomeComponent,
        data: { breadcrumb: 'پنل' },
        title: 'پورتال',
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent,
                canActivate: [authGuard],
                data: { breadcrumb: 'داشبورد' },
                title: 'داشبورد',
            },
            {
                path: 'list',
                component: TaskListComponent,
                canActivate: [authGuard],
                data: { breadcrumb: 'فهرست' },
                title: 'فهرست ',
            },
        ],
    }
];
