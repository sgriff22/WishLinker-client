import { getToken } from "../../utils";
import { fetchWithResponse, fetchWithoutResponse } from "./fetcher";

export function acceptFriendRequest(requestId) {
  return fetchWithResponse(`friends/${requestId}`, {
    method: "PUT",
    headers: {
      Authorization: getToken(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ accepted: true }),
  });
}

export function unfriend(friendshipId) {
  return fetchWithoutResponse(`friends/${friendshipId}`, {
    method: "DELETE",
    headers: {
      Authorization: getToken(),
    },
  });
}

export function getFilteredFriends(searchQuery) {
  const queryString = `?q=${searchQuery}`;

  return fetchWithResponse(`profile${queryString}`, {
    headers: {
      Authorization: getToken(),
    },
  });
}

export function getUsers() {
  return fetchWithResponse("friends/get_all_users", {
    headers: {
      Authorization: getToken(),
    },
  });
}

export function getFilteredUsers(searchQuery) {
  const queryString = `?q=${searchQuery}`;

  return fetchWithResponse(`friends/get_all_users${queryString}`, {
    headers: {
      Authorization: getToken(),
    },
  });
}

export function addFriend(request) {
  return fetchWithResponse("friends", {
    method: "POST",
    headers: {
      Authorization: getToken(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user_id: request }),
  });
}
