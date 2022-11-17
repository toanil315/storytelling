export interface NotificationType {
  createdAt: number;
  id: string;
  senderId: string;
  objectableId: string;
  type: string;
  content: string;
  receiverId: string;
  read: boolean;
}
