export interface NotificationType {
  createdAt: string;
  id: string;
  senderId: string;
  objectableId: string;
  type: string;
  content: string;
  receiverId: string;
  read: boolean;
}
