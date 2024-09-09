export interface UserInterface {
  userId?: string;
  name: string;
  email: string;
  password: string;
  tasks: number | null;
  completedTasks: number | null;
  createdAt?: Date;
  updatedAt?: Date;
}
