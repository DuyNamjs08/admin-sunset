import { FaAngleRight } from "react-icons/fa";

// eslint-disable-next-line react/prop-types
const ButtonLinkCmp = ({ text }) => {
  return (
    <div className="flex  items-center gap-[2px] text-[#0172bc] cursor-pointer">
      {text} <FaAngleRight />
    </div>
  );
};

export default ButtonLinkCmp;
