import { MAX_RESULT_COUNT } from "../hooks/useRecipes";

export interface RequestObj {
  filter: string | null;
  search: string | null;
  page: number;
}

export const requestLinkBuilder = (requestObj: RequestObj) => {
  const filter = requestObj.filter || "";
  const query = requestObj.search ? `&query=${requestObj.search}` : "";
  const page =
    requestObj.page !== 0
      ? `&offset=${requestObj.page * MAX_RESULT_COUNT}`
      : "";

  return filter + query + page;
};
