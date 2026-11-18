import { Routes } from '@angular/router';
import { TaskListComponent } from '../task-list/task-list.component';
import { TestTaileComponent } from '../test-taile/test-taile.component';

export const routes: Routes = [
    {
        path: 'list',
        component: TaskListComponent,
        title: 'فهرست ',
    },
    {
        path: 'tt',
        component: TestTaileComponent,
        title: 'tt',
    },
];
