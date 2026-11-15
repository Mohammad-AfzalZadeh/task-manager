import { Routes } from '@angular/router';
import { TaskListComponent } from '../task-list/task-list.component';

export const routes: Routes = [
    {
        path: 'list',
        component: TaskListComponent,
        title: 'فهرست ',
    },
];
