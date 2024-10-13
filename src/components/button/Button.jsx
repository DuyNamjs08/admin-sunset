// eslint-disable-next-line react/prop-types
const Button = ({ text, className, disable, onclick }) => {
  return (
    <>
      <button
        onClick={onclick}
        type="button"
        disabled={disable}
        className={`text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm px-2.5 py-[8px] me-2 mb-2 ${className} ${
          disable ? "disabled:opacity-25" : ""
        } `}
      >
        {text}
      </button>
    </>
  );
};

export default Button;
