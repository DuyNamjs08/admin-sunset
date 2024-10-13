// eslint-disable-next-line react/prop-types
const CardSmallCmp = ({ img, title, classtext = "" }) => {
  return (
    <>
      <div className="flex flex-col justify-center">
        <img className={`w-[120px] h-[120px] object-cover`} src={img} alt="" />
        <div
          className={`text-center mt-4 text-[14px]  md:text-[16px] text-gray-600 ${classtext}`}
        >
          {title}
        </div>
      </div>
    </>
  );
};

export default CardSmallCmp;
