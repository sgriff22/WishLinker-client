import { getToken } from "../../utils";
import { fetchWithResponse } from "./fetcher";

export function createItem(item) {
  return fetchWithResponse("wishlist_items", {
    method: "POST",
    headers: {
      Authorization: getToken(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });
}
