import { Task } from "./task.model";

export interface TaskList {
  id: number,
  title: string,
  borderColor: string,
  tasks: Task[],
  info?: TaskListInfo
}

export interface TaskListInfo {
  img: string,
  text: string
}
