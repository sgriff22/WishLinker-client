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
    <>
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat -z-10"
        style={{ backgroundImage: "url(/media/images/background.jpg)" }}
      />
      <div className="relative z-10">
        {!showAbout && (
          <div className="flex justify-center">
            <div className="bg-white shadow-xl rounded-xl p-4 mt-14 pt-10 pb-5 flex flex-col items-center justify-between">
              <h1 className="welcome-header">Welcome to</h1>
              <img
                className="w-3/4 rounded-xl shadow-xl"
                src="public/media/images/Wish_logo.png"
                alt="WishLinker logo"
              />
              <div className="flex justify-center m-2">
                <div className="flex flex-wrap justify-center">
                  <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl w-full mt-4">
                    New Here?
                  </p>
                  <button
                    className="bg-rose text-white w-1/2 sm:w-3/4 md:w-4/5 lg:w-5/6 xl:w-full rounded"
                    onClick={() => {
                      navigate("/register");
                    }}
                  >
                    Register
                  </button>
                </div>
              </div>
              <div className="mb-2">
                <p className="-mb-4 mt-5 text-sm sm:text-xl md:text-2xl lg:text-3xl w-full">
                  About Us
                </p>
                <i
                  onClick={scrollToAbout}
                  className="fa-solid fa-caret-down rose text-4xl lg:text-5xl"
                ></i>
              </div>
            </div>
          </div>
        )}
        {showAbout && (
          <div id="about-section" className="flex justify-center items-center">
            <div className="bg-white mt-14 p-6 sm:p-16 rounded-xl shadow-xl md:w-3/4 lg:w-5/6">
              <i
                className="fa-solid fa-caret-up rose text-4xl lg:text-5xl mb-4"
                onClick={scrollToWelcome}
              ></i>
              <p className="-mt-5 mb-5 text-sm sm:text-xl md:text-2xl lg:text-3xl">
                Back to Welcome
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-5">
                About WishLinker
              </h2>
              <div
                className="text-base sm:text-lg md:text-xl lg:text-3xl"
                style={{ textIndent: "2rem" }}
              >
                <p className="text-left mb-4">
                  At WishLinker, we believe in making gift-giving a joyful and
                  effortless experience for everyone. Our app is designed to
                  simplify the process of sharing wishlists with friends and
                  family, making it easier than ever to find the perfect gifts
                  for your loved ones.
                </p>
                <p className="text-left mb-4">
                  With WishLinker, you can create personalized wishlists filled
                  with items you love, whether it is a cherished book, the
                  latest gadget, or a dream vacation destination. Share your
                  wishlist with friends and family, and let them know exactly
                  what you are wishing for.
                </p>
                <p className="text-left mb-4">
                  But WishLinker is more than just a wishlist app. It is a
                  platform for sharing moments of joy and connection with the
                  people who matter most to you. Whether it is a birthday,
                  holiday, or special occasion, WishLinker helps you celebrate
                  with meaningful gifts that bring smiles to faces and warmth to
                  hearts.
                </p>
                <p className="text-left">
                  Join us on the journey to make gift-giving easy, thoughtful,
                  and fun. Register today and start sharing your wishes with the
                  ones you love.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
