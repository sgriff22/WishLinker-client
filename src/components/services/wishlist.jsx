import { getToken } from "../../utils";
import { fetchWithResponse, fetchWithoutResponse } from "./fetcher";

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

export function deleteWishlist(listId) {
  return fetchWithoutResponse(`wishlists/${listId}`, {
    method: "DELETE",
    headers: {
      Authorization: getToken(),
    },
  });
}

export function updateWishlist(id, list) {
  return fetchWithoutResponse(`wishlists/${id}`, {
    method: "PUT",
    headers: {
      Authorization: getToken(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(list),
  });
}

export function getFriendsRecentWishlists() {
  return fetchWithResponse("wishlists/friends_recent_wishlists", {
    headers: {
      Authorization: getToken(),
    },
  });
}
