import { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { apiUrl } from "../../utils";
import { getCurrentUserProfile } from "../services/profile";
import AppContext from "../../context/AppContext";

export const Login = () => {
  const [username, setUsername] = useState("ryan@ryantanay.com");
  const [password, setPassword] = useState("tanay");
  const existDialog = useRef();
  const navigate = useNavigate();

  const { setProfile } = useContext(AppContext);

  const handleLogin = (e) => {
    e.preventDefault();
    fetch(`${apiUrl}/login`, {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((authInfo) => {
        if (authInfo.token) {
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
    <main className="container--login mt-20">
      <dialog className="dialog dialog--auth" ref={existDialog}>
        <div>User does not exist</div>
        <button
          className="button--close"
          onClick={() => existDialog.current.close()}
        >
          Close
        </button>
      </dialog>

      <section>
        <form
          className="form--login border shadow-md bg-white rounded-lg"
          onSubmit={handleLogin}
        >
          <h1 className="text-center mt-7">WishLinker</h1>
          <h2 className="text-xl mb-2 text-center">Please sign in</h2>
          <fieldset className="mb-4">
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
          <fieldset className="mb-4">
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
            <button>Sign in</button>
          </fieldset>
          <div className="loginLinks">
            <section className="link--register">
              <Link
                className="text-lg underline over:text-red-800"
                to="/register"
              >
                Not a member yet?
              </Link>
            </section>
          </div>
        </form>
      </section>
    </main>
  );
};
