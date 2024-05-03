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
      <form className="w-full bg-gray-100  shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 max-w-2xl">
        <h1 className="text-center">Edit Item</h1>
        <fieldset className="mt-2 text-lg">
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            value={item.name}
            name="name"
            className="form-control"
            autoComplete="name"
            onChange={handleChange}
          />
        </fieldset>
        <fieldset className="mt-2 text-lg">
          <label htmlFor="quantity">Quantity:</label>
          <input
            id="quantity"
            type="number"
            value={item.quantity === 0 ? "" : item.quantity}
            name="quantity"
            className="form-control"
            onChange={handleChange}
          />
        </fieldset>
        <fieldset className="mt-2 text-lg">
          <label htmlFor="url">Website Url:</label>
          <input
            id="url"
            type="text"
            value={item.website_url}
            name="website_url"
            className="form-control"
            onChange={handleChange}
          />
        </fieldset>
        <fieldset className="mt-2 text-lg">
          <label htmlFor="priority">Priority Level:</label>
          <select
            className="w-55 text-lg p-1"
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

        <fieldset className="mt-2 text-lg">
          <label htmlFor="note">Note:</label>
          <textarea
            id="note"
            type="text"
            value={item.note}
            name="note"
            className="form-control block  h-20"
            onChange={handleChange}
          />
        </fieldset>

        <fieldset className="mt-2 ml-80">
          <button onClick={handleSubmit}>Submit</button>
        </fieldset>
      </form>
    </div>
  );
};
