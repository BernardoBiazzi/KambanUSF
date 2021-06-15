import { Task } from './task.model';

export interface TaskList {
  title: string,
  borderColor: string,
  status: string,
  tasks: Task[]
}
