/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import { deletePurchase, getPurchases } from "../services/purchases";
import { formatDate } from "../../utils";
import { Link } from "react-router-dom";

export const Purchases = () => {
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    getPurchases().then((res) => {
      setPurchases(res);
    });
  }, []);

  const handleCancel = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this purchase?"
    );

    if (confirmed) {
      deletePurchase(id).then(() => {
        getPurchases().then((res) => {
          setPurchases(res);
          window.alert("Purchase canceled");
        });
      });
    }
  };

  return (
    <div className="flex flex-wrap justify-center">
      <h1 className="w-full font-semibold mb-6">My Purchases</h1>
      {purchases.length === 0 ? (
        <h2>No purchases to show yet</h2>
      ) : (
        <div className="flex flex-wrap justify-center">
          {purchases.map((p) => (
            <div
              key={p.id}
              className="py-4 px-6 m-5 bg-white shadow-md rounded-lg text-lg text-left"
            >
              <Link to={p.wishlist_item.website_url} target="_blank">
                <p className="text-xl font-semibold mb-2 overflow-hidden w-56">
                  {p.wishlist_item.name}
                </p>
              </Link>
              <div className="flex items-center mb-2">
                <p className="mr-2 rose font-semibold">Quantity:</p>
                <span className="flex w-full justify-between">
                  <p>{p.quantity}</p>
                  <button
                    className="form-button text-sm"
                    onClick={() => {
                      handleCancel(p.id);
                    }}
                  >
                    Cancel
                  </button>
                </span>
              </div>
              <div className="flex items-center mb-2">
                <p className="mr-2 rose font-semibold">On:</p>
                <p>{formatDate(p.purchase_date)}</p>
              </div>
              <div className="flex items-center mb-2">
                <p className="mr-2 rose font-semibold">For:</p>
                <p>
                  {p.wishlist_item.wishlist.user.first_name}{" "}
                  {p.wishlist_item.wishlist.user.last_name}
                </p>
              </div>
              <div className="flex items-center mb-2">
                <p className="mr-2 rose font-semibold">From: </p>
                <Link to={`/wishlist/${p.wishlist_item.wishlist.id}`}>
                  <p>{p.wishlist_item.wishlist.title}</p>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
