export interface UserTask {
  id: number;
  title: string;
  description: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  creationDate: Date;
  completionDate?: Date;
}
