import { Component, computed, input, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Task, TASk_STATUS_OPTIONS, TaskStatus } from '../../task.model';
import { TasksService } from '../../tasks.service';
import { TasksServiceToken } from '../../../../main';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css',
})
export class TaskItemComponent {
  task = input.required<Task>();
  taskService = inject(TasksServiceToken);
  taskStatusOptions = inject(TASk_STATUS_OPTIONS);
  taskStatus = computed(() => {
    switch (this.task().status) {
      case 'OPEN':
        return 'Open';
      case 'IN_PROGRESS':
        return 'Working on it';
      case 'DONE':
        return 'Completed';
      default:
        return 'Open';
    }
  });

  onChangeTaskStatus(taskId: string, status: string) {
    let newStatus: TaskStatus = 'OPEN';

    switch (status) {
      case 'open':
        newStatus = 'OPEN';
        break;
      case 'in-progress':
        newStatus = 'IN_PROGRESS';
        break;
      case 'done':
        newStatus = 'DONE';
        break;
      default:
        break;
    }

    this.taskService.updateTaskStatus(taskId, newStatus);
  }
}
