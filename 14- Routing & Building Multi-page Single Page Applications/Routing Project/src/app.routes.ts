import { CanMatchFn, RedirectCommand, Router, Routes } from '@angular/router';
import { routes as usersRoutes } from './app/users/users.routes';
import { NoTaskComponent } from './app/tasks/no-task/no-task.component';
import {
  resolveTitle,
  resolveUserName,
  UserTasksComponent,
} from './app/users/user-tasks/user-tasks.component';
import { NotFoundComponent } from './app/not-found/not-found.component';
import { inject } from '@angular/core';

const dummyCanMatch: CanMatchFn = (route, segments) => {
  const router = inject(Router);
  const shouldGetAccess = Math.random();
  if (shouldGetAccess < 1) return true;
  return new RedirectCommand(router.parseUrl('/unauthorized'));
};

export const router: Routes = [
  {
    path: '',
    component: NoTaskComponent,
    title: 'No Tasks Component',
  },
  {
    path: 'users/:userId',
    component: UserTasksComponent,
    children: usersRoutes,
    canMatch: [dummyCanMatch],
    data: {
      message: 'Hello!',
    },
    resolve: {
      userName: resolveUserName,
    },
    title: resolveTitle,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
