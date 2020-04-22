export interface TableListItem {
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

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface TableListData {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
}

export interface TableListParams {
  sorter?: string;
  status?: string;
  name?: string;
  desc?: string;
  key?: number;
  pageSize?: number;
  currentPage?: number;
}
