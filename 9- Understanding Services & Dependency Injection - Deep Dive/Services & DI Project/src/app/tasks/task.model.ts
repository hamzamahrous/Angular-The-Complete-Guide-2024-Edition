import { InjectionToken, Provider } from '@angular/core';

export type TaskStatus = 'OPEN' | 'IN_PROGRESS' | 'DONE';

type TaskStatusOptions = {
  value: 'open' | 'in-progress' | 'done';
  taskStatus: TaskStatus;
  text: string;
}[];

export const TASk_STATUS_OPTIONS = new InjectionToken<TaskStatusOptions>(
  'task-status-options'
);

export const taskStatusOptions: TaskStatusOptions = [
  {
    value: 'open',
    taskStatus: 'OPEN',
    text: 'Open',
  },
  {
    value: 'in-progress',
    taskStatus: 'IN_PROGRESS',
    text: 'In-Progress',
  },
  {
    value: 'done',
    taskStatus: 'DONE',
    text: 'Completed',
  },
];

export const taskStatusOptionsProvider: Provider = {
  provide: TASk_STATUS_OPTIONS,
  useValue: taskStatusOptions,
};

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}
