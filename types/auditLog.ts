export type AuditLog = {
    id: string;
    timestamp: string;
    eventType: "CREATE" | "UPDATE" | "DELETE" | "READ" | "LOGIN" | "LOGOUT";
    userId: string;
    userName: string;
    resource: "document" | "user" | "settings" | "report" | "dashboard";
    details: string;
    ipAddress: string;
    userAgent: string;
}

export interface AuditLogFiltersT {
  eventType: string;
  userName: string;
  resource: string;
  startDate: string;
  endDate: string;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}

export interface ResultsInfoProps {
  currentItems: number;
  totalItems: number;
}

export interface AuditLogFiltersProps {
  filters: AuditLogFiltersT;
  onFilterChange: (filters: AuditLogFiltersT) => void;
  onClearFilters: () => void;
}

export interface AuditLogTableProps {
  logs: AuditLog[];
}
