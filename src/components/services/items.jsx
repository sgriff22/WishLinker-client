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

export function getItemById(itemId) {
  return fetchWithResponse(`wishlist_items/${itemId}`, {
    headers: {
      Authorization: getToken(),
    },
  });
}

export function editItem(id, item) {
  return fetchWithoutResponse(`wishlist_items/${id}`, {
    method: "PUT",
    headers: {
      Authorization: getToken(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });
}
