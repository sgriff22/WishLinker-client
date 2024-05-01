import PropTypes from "prop-types";

export const EditTooltip = ({ tooltipText }) => {
  return (
    <span className="group relative">
      <div className="absolute bottom-[calc(100%+0.5rem)] left-[66%] -translate-x-[50%] hidden group-hover:block w-auto">
        <div className="bottom-full right-0 rounded bg-black px-4 py-1 text-xs text-white whitespace-nowrap">
          {tooltipText}
          <svg
            className="absolute left-0 top-full h-2 w-full text-black"
            x="0px"
            y="0px"
            viewBox="0 0 255 255"
            xmlSpace="preserve"
          >
            <polygon className="fill-current" points="0,0 127.5,127.5 255,0" />
          </svg>
        </div>
      </div>
      <span>
        <i className="fa-solid fa-pen-to-square hover:text-gray-400 cursor-pointer ml-4"></i>
      </span>
    </span>
  );
};

EditTooltip.propTypes = {
  tooltipText: PropTypes.string.isRequired,
};
