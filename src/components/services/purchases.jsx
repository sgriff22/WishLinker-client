import { getToken } from "../../utils";
import { fetchWithResponse, fetchWithoutResponse } from "./fetcher";

export function createPurchase(purchase) {
  return fetchWithResponse("purchases", {
    method: "POST",
    headers: {
      Authorization: getToken(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(purchase),
  });
}

export function getPurchases() {
  return fetchWithResponse(`purchases`, {
    headers: {
      Authorization: getToken(),
    },
  });
}

export function deletePurchase(purchaseId) {
  return fetchWithoutResponse(`purchases/${purchaseId}`, {
    method: "DELETE",
    headers: {
      Authorization: getToken(),
    },
  });
}
