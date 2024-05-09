import { useEffect, useState } from "react";
import { getPriorities } from "../services/priority";
import { editItem, getItemById } from "../services/items";
import { useNavigate, useParams } from "react-router-dom";

export const EditItem = () => {
  const [item, setItem] = useState({});
  const [priorities, setPriorities] = useState([]);

  const { listId, itemId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    getItemById(itemId).then((res) => {
      setItem(res);
    });
  }, [itemId]);

  useEffect(() => {
    getPriorities().then((res) => {
      setPriorities(res);
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem((prevItem) => ({
      ...prevItem,
      [name]:
        name === "quantity" || name === "priority"
          ? parseInt(value) || 0
          : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const editedItem = {
      wishlist: listId,
      name: item.name,
      quantity: item.quantity,
      website_url: item.website_url,
      note: item.note,
      priority: item.priority,
    };

    editItem(item.id, editedItem).then(() => {
      navigate(`/wishlist/${listId}`);
    });
  };

  // Render the form only when the item state is populated
  if (!item.name) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center mt-8">
      <form className="w-full bg-white shadow-md rounded-lg p-10 max-w-2xl">
        <h1 className="text-center -mt-2">Edit Item</h1>
        <div className="flex justify-between pl-5">
          <fieldset className="mt-2 text-lg w-4/5 text-left">
            <div className="flex flex-col items-center">
              <label htmlFor="name" className="pink font-semibold w-full">
                Name:
              </label>
              <input
                id="name"
                type="text"
                value={item.name}
                name="name"
                className="form-control w-full"
                autoComplete="name"
                maxLength={50}
                onChange={handleChange}
              />
            </div>
          </fieldset>
          <fieldset className="mt-2 text-lg">
            <div className="flex flex-col items-center">
              <label
                htmlFor="quantity"
                className="pink font-semibold w-full text-left ml-12"
              >
                Quantity:
              </label>
              <input
                id="quantity"
                type="number"
                value={item.quantity === 0 ? "" : item.quantity}
                name="quantity"
                className="form-control w-24"
                onChange={handleChange}
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
              value={item.website_url}
              name="website_url"
              className="form-control"
              onChange={handleChange}
            />
          </fieldset>
          <fieldset className="mt-2 ml-3 text-lg w-1/4 text-left">
            <label htmlFor="priority" className="pink font-semibold">
              Priority Level:
            </label>
            <select
              className="form-control w-full"
              value={item.priority}
              name="priority"
              id="priority"
              onChange={handleChange}
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
            value={item.note}
            name="note"
            className="form-control block h-20"
            maxLength={100}
            onChange={handleChange}
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
