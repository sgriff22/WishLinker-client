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
    <div className="flex justify-center items-center mt-8">
      <form className="w-full bg-white  shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 max-w-2xl">
        <h1 className="text-center">New Item</h1>
        <fieldset className="mt-2 text-lg">
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            value={name}
            className="form-control"
            autoComplete="name"
            maxLength={50}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </fieldset>
        <fieldset className="mt-2 text-lg">
          <label htmlFor="quantity">Quantity:</label>
          <input
            id="quantity"
            type="number"
            value={quantity === 0 ? '' : quantity}
            className="form-control"
            onChange={(e) => {
              const value = parseInt(e.target.value);
              setQuantity(isNaN(value) ? 0 : value);
            }}
          />
        </fieldset>
        <fieldset className="mt-2 text-lg">
          <label htmlFor="url">Website Url:</label>
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
        <fieldset className="mt-2 text-lg">
          <label htmlFor="priority">Priority Level:</label>
          <select
            className="w-55 text-lg p-1"
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

        <fieldset className="mt-2 text-lg">
          <label htmlFor="note">Note:</label>
          <textarea
            id="note"
            type="text"
            value={note}
            className="form-control block  h-20"
            maxLength={50}
            onChange={(e) => {
              setNote(e.target.value);
            }}
          />
        </fieldset>

        <fieldset className="mt-2 ml-80">
          <button onClick={handleSubmit}>Submit</button>
        </fieldset>
      </form>
    </div>
  );
};
