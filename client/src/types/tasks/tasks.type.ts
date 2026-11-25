export type tasksType = {
  id:string
  title: string;
  color: string;
};

export type updateTaskPlayload = Omit<tasksAPI_type, 'id' | 'task_type'> & { task_type?:string;};

export interface tasksAPI_type {
  id?: string;
  task_name?: string;
  description?: string;
  priority?: string;
  // created_by: string;
  assignee_to?: string;
  task_type?: tasksType;
  status?: string;
}
