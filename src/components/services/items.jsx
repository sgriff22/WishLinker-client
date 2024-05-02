import { getToken } from "../../utils";
import { fetchWithResponse, fetchWithoutResponse } from "./fetcher";

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

export function deleteItem(itemId) {
  return fetchWithoutResponse(`wishlist_items/${itemId}`, {
    method: "DELETE",
    headers: {
      Authorization: getToken(),
    },
  });
}
