import { useEffect, useState } from "react";
import { getPriorities } from "../services/priority";
import { createItem } from "../services/items";
import { useNavigate, useParams } from "react-router-dom";

export const NewItem = () => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [url, setUrl] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");
  const [note, setNote] = useState("");
  const [priorities, setPriorities] = useState([]);

  const { listId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    getPriorities().then((res) => {
      setPriorities(res);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const item = {
      wishlist: listId,
      name: name,
      quantity: quantity,
      website_url: url,
      note: note,
      priority: selectedPriority,
    };

    createItem(item).then(() => {
      navigate(`/wishlist/${listId}`);
    });
  };

  return (
    <div className="flex justify-center mt-8">
      <form className="w-full bg-white  shadow-md rounded-lg p-10 max-w-2xl">
        <h1 className="text-center -mt-2">New Item</h1>
        <div className="flex justify-between pl-5">
          <fieldset className="mt-2 text-lg w-4/5 text-left">
            <div className="flex flex-col items-center">
              <label htmlFor="name" className="pink font-semibold w-full">
                Name:
              </label>
              <input
                id="name"
                type="text"
                value={name}
                className="form-control w-full"
                autoComplete="name"
                maxLength={50}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
          </fieldset>
          <fieldset className="mt-2 ml-2 text-lg w-1/4 text-left">
            <div className="flex flex-col items-center">
              <label
                htmlFor="quantity"
                className="pink font-semibold w-full ml-12"
              >
                Quantity:
              </label>
              <input
                id="quantity"
                type="number"
                value={quantity === 0 ? "" : quantity}
                className="form-control w-24"
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  setQuantity(isNaN(value) ? 0 : value);
                }}
              />
            </div>
          </fieldset>
        </div>
        <div className="flex items-center">
          <fieldset className="mt-2 text-lg ml-5 text-left w-2/3">
            <label htmlFor="url" className="pink font-semibold">
              Website Url:
            </label>
            <input
              id="url"
              type="text"
              value={url}
              className="form-control"
              onChange={(e) => {
                setUrl(e.target.value);
              }}
            />
          </fieldset>
          <fieldset className="mt-2 ml-3 text-lg w-1/4 text-left">
            <label htmlFor="priority" className="pink font-semibold">
              Priority Level:
            </label>
            <select
              className="form-control w-full"
              value={selectedPriority}
              id="priority"
              onChange={(e) => {
                setSelectedPriority(parseInt(e.target.value));
              }}
            >
              <option value="">Choose level</option>
              {priorities.map((priority) => (
                <option key={priority.id} value={priority.id}>
                  {priority.name}
                </option>
              ))}
            </select>
          </fieldset>
        </div>

        <fieldset className="mt-2 text-lg ml-5 w-full text-left">
          <label htmlFor="note" className="pink font-semibold">
            Note:
          </label>
          <textarea
            id="note"
            type="text"
            value={note}
            className="form-control block h-20"
            maxLength={50}
            onChange={(e) => {
              setNote(e.target.value);
            }}
          />
        </fieldset>

        <fieldset className="mt-8 flex justify-end">
          <button onClick={handleSubmit} className="form-button">
            Submit
          </button>
        </fieldset>
      </form>
    </div>
  );
};
