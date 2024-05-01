import { getToken } from "../../utils";
import { fetchWithResponse } from "./fetcher";

export function getWishlists() {
  return fetchWithResponse("wishlists", {
    headers: {
      Authorization: getToken(),
    },
  });
}

export function getFilteredWishlists(searchQuery) {
  const queryString = searchQuery ? `?q=${searchQuery}` : "";
  return fetchWithResponse(`wishlists${queryString}`, {
    headers: {
      Authorization: getToken(),
    },
  });
}

export function getWishlistById(id) {
  return fetchWithResponse(`wishlists/${id}`, {
    headers: {
      Authorization: getToken(),
    },
  });
}

export function getFilteredItems(listId, searchQuery, priorityName) {
  let queryString = "";

  // Construct the query string based on provided parameters
  if (searchQuery && priorityName) {
    queryString = `?q=${searchQuery}&priority_level=${priorityName}`;
  } else if (searchQuery) {
    queryString = `?q=${searchQuery}`;
  } else if (priorityName) {
    queryString = `?priority_level=${priorityName}`;
  }

  return fetchWithResponse(`wishlists/${listId}${queryString}`, {
    headers: {
      Authorization: getToken(),
    },
  });
}

export function createWishlist(list) {
  return fetchWithResponse("wishlists", {
    method: "POST",
    headers: {
      Authorization: getToken(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(list),
  });
}
