import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getWishlistById, updateWishlist } from "../services/wishlist";

export const EditWishlist = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [spoil, setSpoil] = useState(false);
  const [address, setAddress] = useState({
    street: "",
    addressLine2: "",
    city: "",
    state: "",
    zip: "",
  });

  const { listId } = useParams();

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    getWishlistById(listId).then((res) => {
      setTitle(res.title);
      setDescription(res.description);
      const date = formatDate(res.date_of_event);
      setEventDate(date);
      setIsPrivate(res.private);
      setSpoil(res.spoil_surprises);

      if (res.address) {
        const addressParts = res.address.split(", ");
        const addressLength = addressParts.length;

        let street, addressLine2, city, state, zip;

        if (addressLength === 4) {
          // Address format: "456 Elm Street, Apt 123, New York, NY 10001"
          street = addressParts[0];
          addressLine2 = addressParts[1];
          city = addressParts[2];
          state = addressParts[3].split(" ")[0];
          zip = addressParts[3].split(" ")[1];
        } else if (addressLength === 3) {
          // Address format: "456 Elm Street, New York, NY 10001"
          street = addressParts[0];
          addressLine2 = "";
          city = addressParts[1];
          state = addressParts[2].split(" ")[0];
          zip = addressParts[2].split(" ")[1];
        }

        setAddress({
          street: street || "",
          addressLine2: addressLine2 || "",
          city: city || "",
          state: state || "",
          zip: zip || "",
        });
      } else {
        // If res.address is null or undefined, reset the address state
        setAddress({
          street: "",
          addressLine2: "",
          city: "",
          state: "",
          zip: "",
        });
      }
    });
  }, [listId]);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if eventDate is provided before converting to ISO string
    const isDate = eventDate ? new Date(eventDate).toISOString() : null;

    const addressString = `${address.street}, ${address.addressLine2}, ${address.city}, ${address.state} ${address.zip}`;

    const editedWishlist = {
      title: title,
      description: description,
      date_of_event: isDate,
      private: isPrivate,
      spoil_surprises: spoil,
      address: addressString,
    };

    updateWishlist(listId, editedWishlist).then(() => {
      navigate(`/wishlist/${listId}`);
    });
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  return (
    <div className="flex justify-center items-center mt-8">
      <form className="w-full bg-gray-100 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 max-w-2xl">
        <h1 className="text-center">Edit Wishlist</h1>
        <fieldset className="mt-2 text-lg">
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            type="text"
            value={title}
            className="form-control"
            onChange={(e) => setTitle(e.target.value)}
          />
        </fieldset>
        <fieldset className="mt-2 text-lg">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            className="form-control"
            rows="4"
            cols="50"
          />
        </fieldset>
        <fieldset className="mt-2 text-lg">
          <label htmlFor="eventDate">Event Date (if applicable):</label>
          <input
            id="eventDate"
            type="date"
            onChange={(e) => setEventDate(e.target.value)}
            value={eventDate}
            className="form-control"
          />
        </fieldset>
        <fieldset className="mt-2 text-lg">
          <div className="flex items-center">
            <div className="mr-8">
              <h3 className="mb-2">Private</h3>
              <input
                id="yesPrivate"
                type="radio"
                name="private"
                value="true"
                checked={isPrivate}
                onChange={() => setIsPrivate(true)}
                className="mr-2"
              />
            </div>
            <div>
              <h3 className="mb-2">Public</h3>
              <input
                id="noPrivate"
                type="radio"
                name="private"
                value="false"
                checked={!isPrivate}
                onChange={() => setIsPrivate(false)}
                className="mr-2"
              />
            </div>
          </div>
        </fieldset>
        <p>Do You Want to be Surprised?</p>
        <fieldset className="mt-2 text-lg">
          <div className="flex items-center">
            <div className="mr-8">
              <input
                id="yesSpoil"
                type="radio"
                name="spoil"
                value="true"
                checked={spoil}
                onChange={() => setSpoil(true)}
                className="mr-2"
              />
              <label htmlFor="yesSpoil">
                Yes, do not hide <br /> purchased items
              </label>
            </div>
            <div>
              <input
                id="noSpoil"
                type="radio"
                name="spoil"
                value="false"
                checked={!spoil}
                onChange={() => setSpoil(false)}
                className="mr-2"
              />
              <label htmlFor="noSpoil">
                No, hide items <br /> once purchased
              </label>
            </div>
          </div>
        </fieldset>

        <p>Enter Mailing Address (optional)</p>
        <fieldset className="mt-2 text-lg">
          <label htmlFor="street">Street:</label>
          <input
            id="street"
            type="text"
            name="street"
            value={address.street}
            onChange={handleAddressChange}
            className="form-input"
          />
        </fieldset>

        <fieldset className="mt-2 text-lg">
          <label htmlFor="addressLine2">Address Line 2:</label>
          <input
            id="addressLine2"
            type="text"
            name="addressLine2"
            value={address.addressLine2}
            onChange={handleAddressChange}
            className="form-input"
          />
        </fieldset>

        <fieldset className="mt-2 text-lg">
          <label htmlFor="city">City:</label>
          <input
            id="city"
            type="text"
            name="city"
            value={address.city}
            onChange={handleAddressChange}
            className="form-input"
          />
        </fieldset>

        <fieldset className="mt-2 text-lg">
          <label htmlFor="state">State:</label>
          <input
            id="state"
            type="text"
            name="state"
            value={address.state}
            onChange={handleAddressChange}
            className="form-input"
          />
        </fieldset>

        <fieldset className="mt-2 text-lg">
          <label htmlFor="zip">Zip:</label>
          <input
            id="zip"
            type="text"
            name="zip"
            value={address.zip}
            onChange={handleAddressChange}
            className="form-input"
          />
        </fieldset>

        <fieldset className="mt-2 ml-80">
          <button type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </fieldset>
      </form>
    </div>
  );
};
