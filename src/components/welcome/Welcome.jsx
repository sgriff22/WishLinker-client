import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Welcome = () => {
  const [showAbout, setShowAbout] = useState(false);

  const navigate = useNavigate();

  const scrollToAbout = () => {
    setShowAbout(true);
    setTimeout(() => {
      const aboutSection = document.getElementById("about-section");
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }, 10);
  };

  const scrollToWelcome = () => {
    setShowAbout(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className="bg-cover bg-center h-screen -ml-24 -mr-24 -mb-20 pt-20"
      style={{ backgroundImage: "url(/media/images/background.jpg)" }}
    >
      <div className="flex justify-center">
        <div className="bg-white rounded-xl mt-20 w-1/2 pt-10 pb-5 flex flex-col items-center justify-between">
          <h1 className="welcome-header w-full text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
            Welcome to
          </h1>
          <img
            className="w-3/4"
            src="public/media/images/Wish_logo.png"
            alt="WishLinker logo"
          />
          <div className="flex justify-center mb-5">
            <div className="flex flex-wrap justify-center">
              <h1 className="text-sm w-full rose">New Here?</h1>
              <button
                onClick={() => {
                  navigate("/register");
                }}
              >
                Register
              </button>
            </div>
          </div>
          <div className="mb-2">
            <p className="-mb-4">About Us</p>
            <i
              onClick={scrollToAbout}
              className="fa-solid fa-caret-down rose text-5xl"
            ></i>
          </div>
        </div>
      </div>
      {showAbout && (
        <div
          id="about-section"
          className="bg-white h-screen mt-48 pt-24 flex justify-center pl-36 pr-36"
        >
          <div className="mt-4 ml-10 w-3/4">
            <i
              className="fa-solid fa-caret-up rose text-5xl -mt-5"
              onClick={scrollToWelcome}
            ></i>
            <p className="-mt-5 mb-4">Back to Welcome</p>

            <h2 className="mb-2">About WishLinker</h2>
            <p className="text-left mb-2" style={{ textIndent: "2rem" }}>
              At WishLinker, we believe in making gift-giving a joyful and
              effortless experience for everyone. Our app is designed to
              simplify the process of sharing wishlists with friends and family,
              making it easier than ever to find the perfect gifts for your
              loved ones.
            </p>
            <p className="text-left mb-2" style={{ textIndent: "2rem" }}>
              With WishLinker, you can create personalized wishlists filled with
              items you love, whether it is a cherished book, the latest gadget,
              or a dream vacation destination. Share your wishlist with friends
              and family, and let them know exactly what you are wishing for.
            </p>
            <p className="text-left mb-2" style={{ textIndent: "2rem" }}>
              But WishLinker is more than just a wishlist app. It is a platform
              for sharing moments of joy and connection with the people who
              matter most to you. Whether it is a birthday, holiday, or special
              occasion, WishLinker helps you celebrate with meaningful gifts
              that bring smiles to faces and warmth to hearts.
            </p>
            <p className="text-left" style={{ textIndent: "2rem" }}>
              Join us on the journey to make gift-giving easy, thoughtful, and
              fun. Register today and start sharing your wishes with the ones
              you love.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
