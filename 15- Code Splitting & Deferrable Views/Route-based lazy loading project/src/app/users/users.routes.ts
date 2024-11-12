import { Routes } from '@angular/router';

import {
  NewTaskComponent,
  canLeaveEditPage,
} from '../tasks/new-task/new-task.component';
import { resolveUserTasks, TasksComponent } from '../tasks/tasks.component';
import { TasksService } from '../tasks/tasks.service';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full',
  },
  {
    path: '',
    providers: [TasksService],
    children: [
      {
        path: 'tasks', // <your-domain>/users/<uid>/tasks
        // loadComponent: () => {
        //   return import('../tasks/tasks.component').then(
        //     (mod) => mod.TasksComponent
        //   );
        // },
        component: TasksComponent,
        runGuardsAndResolvers: 'always',
        resolve: {
          userTasks: resolveUserTasks,
        },
      },
      {
        path: 'tasks/new',
        component: NewTaskComponent,
        canDeactivate: [canLeaveEditPage],
      },
    ],
  },
];
