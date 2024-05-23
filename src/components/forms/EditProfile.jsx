import { useContext, useEffect, useState } from "react";
import { getCurrentUserProfile, updateProfile } from "../services/profile";
import { useNavigate } from "react-router-dom";
import AppContext from "../../context/AppContext";

export const EditProfile = () => {
  const [editProfile, setEditProfile] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const [address, setAddress] = useState({
    street: "",
    addressLine2: "",
    city: "",
    state: "",
    zip: "",
  });

  const { setProfile } = useContext(AppContext);

  useEffect(() => {
    getCurrentUserProfile().then((res) => {
      setEditProfile(res.profile);
      setImagePreview(res.profile.image);
      if (res.profile.address) {
        const addressParts = res.profile.address.split(", ");
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
  }, []);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
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
      setEditProfile((prevProfile) => ({
        ...prevProfile,
        image: base64ImageString,
      }));
      setImagePreview(URL.createObjectURL(file));
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const addressString = getAddressString();

    const newProfile = {
      bio: editProfile.bio,
      birthday: editProfile.birthday,
      address: addressString,
      image: editProfile.image,
    };

    updateProfile(newProfile, editProfile.id)
      .then(() => {
        return getCurrentUserProfile();
      })
      .then((res) => {
        setProfile(res);
        navigate(`/profile`);
      });
  };

  if (!editProfile || !editProfile.user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center mb-8">
      <form className="w-full bg-white shadow-md p-10 rounded-lg  max-w-2xl text-left">
        <h1 className="text-center -mt-2">Edit Profile</h1>
        <fieldset className="mt-2 text-lg flex flex-wrap justify-center">
          <label htmlFor="bio" className="pink font-semibold w-full ml-5">
            Bio:
          </label>
          <textarea
            id="bio"
            type="text"
            name="bio"
            value={editProfile.bio}
            className="form-control h-20"
            onChange={handleChange}
          />
        </fieldset>

        <fieldset className="mt-2 text-lg mr-10 ml-5">
          <label htmlFor="birthday" className="pink font-semibold flex mt-3">
            Birthday:
          </label>
          <input
            id="birthday"
            type="date"
            name="birthday"
            onChange={handleChange}
            value={editProfile.birthday}
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
            name="image"
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
