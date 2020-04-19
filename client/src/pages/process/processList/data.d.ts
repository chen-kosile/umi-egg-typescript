export interface Member {
  avatar: string;
  name: string;
  id: string;
}

export interface BasicListItemDataType {
  id: number;
  userId: string;
  processType: number;
  leaveType: number;
  reason: string;
  startTime: string;
  endTime: string;
  status: number;
  createdAt: string;
  updatedAt: string;
  user: any;
}
