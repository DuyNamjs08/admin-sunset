import { sideBarData } from "../constant";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import logoMain from "../assets/hd.png";

const Sidebar = () => {
  const location = useLocation();
  return (
    <div
      className="bg-[#1B3C73] text-white 
           fixed top-0 left-0 w-[200px] z-[100] h-[100vh] "
    >
      <div className="h-[81px]  border-b-[1px] border-r-[1px] border-[grey] flex justify-center items-center">
        <img
          src={logoMain}
          alt=""
          className="object-cover h-[81px] w-[200px]"
        />
      </div>
      <ul>
        {sideBarData.map((item) => {
          return (
            <li key={item.id} className="flex mt-2 px-4 cursor-pointer">
              <div
                className={`hover:bg-[#ccc] p-2 hover:rounded-[8px] transition-all w-full hover:text-black ${
                  location.pathname === item.path
                    ? "bg-[#ccc] text-black rounded-[8px]"
                    : ""
                }`}
              >
                <Link
                  className="flex gap-2 cursor-pointer items-center"
                  to={item.path}
                >
                  {<item.icon />}
                  <span>{item.title}</span>
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
