import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService, Task } from './api.service';


@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements OnInit {

  private taskService = inject(ApiService);

  tasks: Task[] = [];

  // Form data
  taskForm = {
    title: '',
    description: '',
    completed: false
  };

  // Currently edited task ID
  editingTaskId: number | null = null;


  ngOnInit(): void {

    this.loadTasks();

  }


  // GET
  loadTasks(): void {

    this.taskService.getTasks().subscribe({

      next: (response) => {
        this.tasks = response;
      },

      error: (error) => {
        console.error(error);
      }

    });

  }


  // POST or PATCH
  saveTask(): void {

    if (!this.taskForm.title.trim()) {
      return;
    }

    if (this.editingTaskId !== null) {

      this.taskService.updateTask(
        this.editingTaskId,
        this.taskForm
      ).subscribe({

        next: (updatedTask) => {

          this.tasks = this.tasks.map(task =>
            task.id === updatedTask.id
              ? updatedTask
              : task
          );

          this.resetForm();

        },

        error: (error) => {
          console.error(error);
        }

      });

    } else {

      this.taskService.createTask(
        this.taskForm
      ).subscribe({

        next: (newTask) => {

          this.tasks = [...this.tasks, newTask];

          this.resetForm();

        },

        error: (error) => {
          console.error(error);
        }

      });

    }

  }


  // Prepare form for editing
  editTask(task: Task): void {

    this.editingTaskId = task.id;

    this.taskForm = {
      title: task.title,
      description: task.description,
      completed: task.completed
    };

  }


  // PATCH: Change completion status
  toggleTask(task: Task): void {

    this.taskService.updateTask(
      task.id,
      { completed: !task.completed }
    ).subscribe({

      next: (updatedTask) => {

        this.tasks = this.tasks.map(item =>
          item.id === updatedTask.id
            ? updatedTask
            : item
        );

      },

      error: (error) => {
        console.error(error);
      }

    });

  }


  // DELETE
  deleteTask(id: number): void {

    this.taskService.deleteTask(id).subscribe({

      next: () => {

        this.tasks = this.tasks.filter(
          task => task.id !== id
        );

      },

      error: (error) => {
        console.error(error);
      }

    });

  }

  // Reset form
  resetForm(): void {

    this.editingTaskId = null;

    this.taskForm = {
      title: '',
      description: '',
      completed: false
    };

  }

}