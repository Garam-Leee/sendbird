// key of 로 고쳐야합니다.
type ColorType = 'primary' | 'disabled' | 'inactive';

interface ITableDataClickEventParameter {
  id: string;
}

interface IPaginationData {
  currentPage: number;
  totalPages: number;
}

type SetPaginationType = (data: IPaginationData) => void;

interface IPagination extends IPaginationData {
  onPageChange: (page: number) => void;
  setPagination: SetPaginationType;
}

interface ILabel {
  label?: React.ReactNode;
  width?: string | number;
  labelAlign?: 'left' | 'center' | 'right';
}

interface IRadioItem extends ILabel {
  name: string;
  value: string;
  checked?: boolean;
}

interface IOption {
  value: string;
  label: string;
}
