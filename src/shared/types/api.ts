export enum StatusCode {
  OK = 200,
  SERVER_ERROR = 500,
  VALIDATION_ERROR = 422,
  UNAUTHORIZED = 401,
  SCRF_MISMATCH = 419,
}

export type ResponseMeta = {
  page: {
    current: number;
    total: number;
  }
  limit: number;
  total: number;
}

export type SuccessApiResponse<Data> = {
  success: true;
  data: Data;
}

export type SuccessApiResponseWithMeta<Data> = SuccessApiResponse<Data> & {
  meta: ResponseMeta;
}

export type ValidationError = {
  status: StatusCode.VALIDATION_ERROR;
  data: {
    errors: {
      [key: string]: string[];
    };
  }
}

export type CredentialsError = {
  status: StatusCode.VALIDATION_ERROR;
  data: {
    errors: {
      [key: string]: string[];
    };
    success: false;
  }
}
