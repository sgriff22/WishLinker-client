import PropTypes from "prop-types";

export const PurchasedTooltip = ({ tooltipText, handlePurchase }) => {
  return (
    <span className="group relative ml-72">
      <div className="absolute bottom-[calc(100%+0.5rem)] left-[50%] -translate-x-[50%] hidden group-hover:block w-auto mb-1">
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
        <i
          onClick={handlePurchase}
          className="fa-solid fa-money-check-dollar text-black text-3xl mr-1"
        ></i>
      </span>
    </span>
  );
};

PurchasedTooltip.propTypes = {
  tooltipText: PropTypes.string.isRequired,
  handlePurchase: PropTypes.func,
};
