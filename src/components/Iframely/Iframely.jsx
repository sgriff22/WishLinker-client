import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const API_KEY = "79e59d39736814e4f41eb57b0841407d";

const Iframely = ({ url }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://cdn.iframe.ly/api/iframely?url=${encodeURIComponent(
            url
          )}&key=${API_KEY}&iframe=1&omit_script=1`
        );
        const data = await response.json();

        if (
          data.links &&
          data.links.thumbnail &&
          data.links.thumbnail.length > 0
        ) {
          const mainImage = data.links.thumbnail.find(
            (image) => !image.media && !image.rel.includes("logo")
          );

          setImageUrl(
            mainImage ? mainImage.href : data.links.thumbnail[0].href
          );
          setIsLoading(false);
        } else {
          setError({ code: 404, message: "Thumbnail image not found" });
          setIsLoading(false);
        }
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    if (url) {
      fetchData();
    } else {
      setError({ code: 400, message: "Provide a URL for the element" });
      setIsLoading(false);
    }
  }, [url]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div className="p-3">
        <img
          src="/media/images/not_image.png"
          alt="Placeholder"
          className="h-32 w-full object-contain object-center rounded-lg bg-white"
        />
      </div>
    );
  }

  return (
    <div className="p-3">
      {imageUrl && (
        <img
          src={imageUrl}
          alt="Thumbnail"
          className="h-32 w-full object-contain object-bottom bg-white rounded-lg shadow-lg"
        />
      )}
    </div>
  );
};

Iframely.propTypes = {
  url: PropTypes.string,
};

export default Iframely;
