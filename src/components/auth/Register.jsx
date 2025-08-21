import { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { apiUrl } from "../../utils";
import { getCurrentUserProfile } from "../services/profile";
import AppContext from "../../context/AppContext";

export const Register = () => {
  const [username, setUsername] = useState("admina@straytor.com");
  const [password, setPassword] = useState("straytor");
  const [firstName, setFirstName] = useState("Admina");
  const [lastName, setLastName] = useState("Straytor");
  const existDialog = useRef();
  const navigate = useNavigate();

  const { setProfile } = useContext(AppContext);

  const handleRegister = (e) => {
    e.preventDefault();
    fetch(`${apiUrl}/register`, {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
        first_name: firstName,
        last_name: lastName,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((authInfo) => {
        if (authInfo && authInfo.token) {
          localStorage.setItem("wish_token", JSON.stringify(authInfo));
          getCurrentUserProfile().then((res) => {
            setProfile(res);
            navigate("/home");
          });
        } else {
          existDialog.current.showModal();
        }
      });
  };

  return (
    <main>
      <dialog className="w-52 rounded-xl py-5 px-2" ref={existDialog}>
        <div className="text-lg">User already exists</div>
        <button onClick={() => existDialog.current.close()}>Close</button>
      </dialog>

      <section>
        <form
          className="form--login border shadow-md bg-white rounded-lg"
          onSubmit={handleRegister}
        >
          <h1 className="text-center mt-7 text-2xl sm:text-4xl md:text-5xl">WishLinker</h1>
          <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl mb-2 text-center">Register new account</h2>
          <div className="w-3/4 mx-auto">
            <fieldset className="mb-4 text-lg sm:text-2xl">
              <label htmlFor="firstName"> First name </label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(evt) => setFirstName(evt.target.value)}
                className="form-control"
                placeholder=""
                required
                autoFocus
              />
            </fieldset>
            <fieldset className="mb-4 text-lg sm:text-2xl">
              <label htmlFor="lastName"> Last name </label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(evt) => setLastName(evt.target.value)}
                className="form-control"
                placeholder=""
                required
                autoFocus
              />
            </fieldset>
            <fieldset className="mb-4 text-lg sm:text-2xl">
              <label htmlFor="inputUsername"> Username </label>
              <input
                type="username"
                id="inputUsername"
                value={username}
                onChange={(evt) => setUsername(evt.target.value)}
                className="form-control"
                placeholder="Username"
                required
                autoFocus
              />
            </fieldset>
            <fieldset className="mb-4 text-lg sm:text-2xl">
              <label htmlFor="inputPassword"> Password </label>
              <input
                type="password"
                id="inputPassword"
                value={password}
                onChange={(evt) => setPassword(evt.target.value)}
                className="form-control"
                placeholder="Password"
              />
            </fieldset>
            <fieldset className="text-right">
              <button>Register</button>
            </fieldset>
          </div>
          <div className="loginLinks">
            <section className="link--register">
              <Link className="text-sm sm:text-lg underline over:text-red-800" to="/login">
                Already have an account?
              </Link>
            </section>
          </div>
        </form>
      </section>
    </main>
  );
};
