export interface GeneralOption {
  label: string;
  value: string;
}

export interface ApiResponse<T> {
  ok: boolean;
  data: T;
}

export interface InvalidResponse {
  ok: boolean;
  err_code: string;
  err_msg: string;
}

export interface IPagination {
  items: number;
  total_items: number;
  current_page: number;
  last_page: number;
}

export interface IPathParam {
  params: {
    category?: string;
    id?: string;
  };
}
