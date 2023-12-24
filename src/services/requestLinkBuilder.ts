import { MAX_RESULT_COUNT } from "./api-client";

export interface RequestObj {
  filter: string;
  search: string;
  page: number;
}

export const requestLinkBuilder = (requestObj: RequestObj) => {
  const search = requestObj.search ? `&query=${requestObj.search}` : "";
  const page =
    requestObj.page > 0 ? `&offset=${requestObj.page * MAX_RESULT_COUNT}` : "";
  const filter = requestObj.filter;

  return page + filter + search;
};
