import { CourseType } from "./CourseTypes";
import { UserType } from "./UserTypes";

export interface PaymentBase {
  courseId: string;
  userId: string;
  language: string;
  orderInfo: string;
  ipAddress: string;
}

export interface PaymentResponse {
  createdAt: string;
  id: string;
  vnpOrderInfo: string;
  orderType: string;
  amount: number;
  locate: string;
  ipAddress: string;
  paymentUrl: string;
  status: string;
  txnRef: string;
  timeOver: string;
  userId: string;
  courseId: string;
  instructorId: string;
}

export interface PaymentHistory {
  id: string;
  vnpOrderInfo: string;
  orderType: string;
  amount: number;
  locate: string;
  ipAddress: string;
  status: string;
  txnRef: string;
  timeOver: string;
  userId: string;
  courseId: string;
  instructorId: string;
}

export interface PurchasedDetail extends PaymentHistory {
  course: CourseType;
  user: UserType;
}

export interface RevenueForTheMonthType {
  month: string;
  revenue: number;
}
