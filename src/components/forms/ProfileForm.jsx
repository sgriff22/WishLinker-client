import { useState } from "react";
import { createProfile } from "../services/profile";
import { useNavigate } from "react-router-dom";

export const ProfileForm = () => {
  const [bio, setBio] = useState("");
  const [birthday, setBirthday] = useState("");
  const [image, setImage] = useState("");
  const [address, setAddress] = useState({
    street: "",
    addressLine2: "",
    city: "",
    state: "",
    zip: "",
  });
  const [imagePreview, setImagePreview] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const addressString = getAddressString();

    const newProfile = {
      bio: bio,
      birthday: birthday,
      address: addressString,
      image: image,
    };

    createProfile(newProfile).then((res) => {
      navigate(`/profile/${res.user}`);
    });
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const getAddressString = () => {
    let addressString = "";

    // Check if any part of the address is entered
    if (
      address.street ||
      address.addressLine2 ||
      address.city ||
      address.state ||
      address.zip
    ) {
      // Add street if it exists
      if (address.street) {
        addressString += address.street + ", ";
      }

      // Add addressLine2 if it exists
      if (address.addressLine2) {
        addressString += address.addressLine2 + ", ";
      }

      // Add city, state, and zip
      addressString += address.city + ", " + address.state + " " + address.zip;
    } else {
      // If no part of the address is entered, set addressString to null
      addressString = null;
    }

    return addressString;
  };

  const getBase64 = (file, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(file);
  };

  const createProfileImageString = (event) => {
    const file = event.target.files[0];
    getBase64(file, (base64ImageString) => {
      setImage(base64ImageString);
      setImagePreview(URL.createObjectURL(file)); // Set image preview URL
    });
  };

  return (
    <div className="flex justify-center items-center mb-8">
      <form className="w-full bg-white shadow-md p-10 rounded-lg  max-w-2xl text-left">
        <h1 className="text-center -mt-2">Personalize Profile</h1>
        <fieldset className="mt-2 text-lg flex flex-wrap justify-center">
          <label htmlFor="bio" className="pink font-semibold w-full ml-5">
            Bio:
          </label>
          <textarea
            id="bio"
            type="text"
            value={bio}
            className="form-control h-20"
            onChange={(e) => {
              setBio(e.target.value);
            }}
          />
        </fieldset>

        <fieldset className="mt-2 text-lg mr-10 ml-5">
          <label htmlFor="birthday" className="pink font-semibold flex mt-3">
            Birthday:
          </label>
          <input
            id="birthday"
            type="date"
            onChange={(e) => {
              setBirthday(e.target.value);
            }}
            value={birthday}
            className="form-control w-56"
          />
        </fieldset>

        <p className="pink text-left font-semibold mt-5 ml-5">
          Enter Mailing Address (optional)
        </p>
        <div className="flex flex-wrap ml-5">
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

        <fieldset className="mt-2 text-lg ml-5">
          <label htmlFor="image" className="pink font-semibold">
            Profile Image:
          </label>
          <input
            id="image"
            type="file"
            onChange={createProfileImageString}
            className="form-control w-80 border-none -ml-3"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Profile Preview"
              className="mt-2 w-40 h-auto object-cover"
            />
          )}
        </fieldset>

        <fieldset className="mt-5 flex justify-end">
          <button type="submit" onClick={handleSubmit} className="form-button">
            Submit
          </button>
        </fieldset>
      </form>
    </div>
  );
};
