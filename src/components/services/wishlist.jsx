import { getToken } from "../../utils";
import { fetchWithResponse } from "./fetcher";

export function getWishlists() {
  return fetchWithResponse("wishlists", {
    headers: {
      Authorization: getToken(),
    },
  });
}
