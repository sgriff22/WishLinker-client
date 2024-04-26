export const apiUrl = "http://localhost:8000";

//Function to get Token
export const getToken = () => {
  if (localStorage.getItem("wish_token")) {
    const token = JSON.parse(localStorage.getItem("wish_token")).token;
    return `Token ${token}`;
  } else {
    return null;
  }
};

//Format date
export const formatDate = (dateString) => {
  const creationDate = new Date(dateString);
  return creationDate.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
