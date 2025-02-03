export interface TodoItem {
  _id: string;
  title: string;
  dueDate: Date;
  description: string;
  isCompleted: boolean;
}
export interface ModityTodoItem extends Partial<TodoItem> {
  title: string;
  dueDate: Date;
  description: string;
  isCompleted: boolean;
}
