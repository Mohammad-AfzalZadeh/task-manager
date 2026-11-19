import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.development';
export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  created_at: string;
}
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  http = inject(HttpClient)
  private apiUrl = `${environment.apiUrl}tasks/`;

  getTasks(id?: string): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}${id ?? ''}`)
  }

  createTask(data: Partial<Task>): Observable<Task> {
    return this.http.post<Task>(
      this.apiUrl,
      data
    );
  }

  updateTask(
    id: number,
    data: Partial<Task>
  ): Observable<Task> {
    return this.http.patch<Task>(
      `${this.apiUrl}${id}/`,
      data
    );
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}${id}/`
    );

  }
}
