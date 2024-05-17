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
  
    const year = date.getUTCFullYear();  // Use getUTCFullYear to avoid local time zone issues
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");  // Use getUTCMonth
    const day = String(date.getUTCDate()).padStart(2, "0");  // Use getUTCDate
  
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
    <div className="flex justify-center items-center mb-8">
      <form className="w-full bg-white shadow-md p-10 rounded-lg  max-w-2xl text-left">
        <h1 className="text-center -mt-2">Edit Wishlist</h1>
        <fieldset className="mt-2 text-lg flex flex-wrap justify-center">
          <label htmlFor="title" className="pink font-semibold w-full ml-5">
            Title:
          </label>
          <input
            id="title"
            type="text"
            value={title}
            className="form-control"
            onChange={(e) => setTitle(e.target.value)}
          />
        </fieldset>
        <fieldset className="mt-3 text-lg flex flex-wrap justify-center">
          <label
            htmlFor="description"
            className="pink font-semibold w-full ml-5"
          >
            Description:
          </label>
          <textarea
            id="description"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            className="form-control block h-20"
          />
        </fieldset>
        <div className="flex justify-center">
          <fieldset className="mt-2 text-lg mr-10">
            <label htmlFor="eventDate" className="pink font-semibold flex mt-3">
              Event Date (if applicable):
            </label>
            <input
              id="eventDate"
              type="date"
              onChange={(e) => setEventDate(e.target.value)}
              value={eventDate}
              className="form-control w-56"
            />
          </fieldset>
          <fieldset className="mt-4 text-lg">
            <div className="flex">
              <div className="mr-5 text-center">
                <h3 className="pink">Private</h3>
                <input
                  id="yesPrivate"
                  type="radio"
                  name="private"
                  value="true"
                  checked={isPrivate}
                  onChange={() => setIsPrivate(true)}
                />
              </div>
              <div className="text-center">
                <h3 className="pink">Public</h3>
                <input
                  id="noPrivate"
                  type="radio"
                  name="private"
                  value="false"
                  checked={!isPrivate}
                  onChange={() => setIsPrivate(false)}
                />
              </div>
            </div>
          </fieldset>
        </div>
        <div className="ml-5">
          <p className="pink text-left font-semibold mt-5">
            Do You Want to be Surprised?
          </p>
          <fieldset className="mt-2 text-lg">
            <div className="flex items-center">
              <div className="mr-8">
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
                  Yes, I want to be surprised <br /> do not hide purchased items
                </label>
              </div>
              <div>
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
                  No, spoil my surprises and <br /> hide items once purchased
                </label>
              </div>
            </div>
          </fieldset>

          <p className="pink text-left font-semibold mt-5">
            Enter Mailing Address (optional)
          </p>
          <div className="flex flex-wrap">
            <fieldset className="text-lg  w-full">
              <label htmlFor="street">Street:</label>
              <input
                id="street"
                type="text"
                name="street"
                value={address.street}
                onChange={handleAddressChange}
                className="form-control w-4/5"
              />
            </fieldset>

            <fieldset className="mt-1 text-lg w-full">
              <label htmlFor="addressLine2">Address Line 2:</label>
              <input
                id="addressLine2"
                type="text"
                name="addressLine2"
                value={address.addressLine2}
                onChange={handleAddressChange}
                className="form-control w-4/5 mr-10"
              />
            </fieldset>

            <fieldset className="mt-1 text-lg w-1/3 mr-4">
              <label htmlFor="city">City:</label>
              <input
                id="city"
                type="text"
                name="city"
                value={address.city}
                onChange={handleAddressChange}
                className="form-control w-full"
              />
            </fieldset>

            <fieldset className="mt-1 text-lg w-1/4 mr-4">
              <label htmlFor="state">State:</label>
              <input
                id="state"
                type="text"
                name="state"
                value={address.state}
                onChange={handleAddressChange}
                className="form-control w-full"
              />
            </fieldset>

            <fieldset className="mt-1 text-lg w-1/4">
              <label htmlFor="zip">Zip:</label>
              <input
                id="zip"
                type="text"
                name="zip"
                value={address.zip}
                onChange={handleAddressChange}
                className="form-control w-2/3"
              />
            </fieldset>
          </div>
        </div>

        <fieldset className="mt-5 flex justify-end">
          <button type="submit" onClick={handleSubmit} className="form-button">
            Submit
          </button>
        </fieldset>
      </form>
    </div>
  );
};
