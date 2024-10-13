// eslint-disable-next-line react/prop-types
const BannerHerro = ({ img }) => {
  return (
    <div className="h-[40vh]">
      <img className="h-[100%] w-full object-cover" src={img} alt="" />
    </div>
  );
};

export default BannerHerro;
