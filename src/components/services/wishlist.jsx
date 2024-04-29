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
