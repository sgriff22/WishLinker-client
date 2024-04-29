import { getToken } from "../../utils";
import { fetchWithResponse } from "./fetcher";

export function getPriorities() {
  return fetchWithResponse("priorities", {
    headers: {
      Authorization: getToken(),
    },
  });
}
