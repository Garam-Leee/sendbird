type DateUnitType = 'DAY' | 'MONTH' | 'YEAR';
type PeriodType = 'ALWAYS' | 'APPOINT' | 'RELATIVE';
type StatusType = 'ACTIVE' | 'INACTIVE';

interface IAPIPagination {
  page: number;
  size: number;
  totalCount: number;
  totalPages: number;
}

interface IFileAPIRequest {
  uploadFiles: FileList;
}
