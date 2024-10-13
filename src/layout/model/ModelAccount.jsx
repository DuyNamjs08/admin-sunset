/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";

const ModelAccount = ({ setActive, active }) => {
  const navigate = useNavigate();
  const handLogout = async () => {
    await localStorage.clear();
    await navigate("/login");
  };
  return (
    <div className="h-[200px] w-[180px] bg-white text-black absolute z-50 top-12 right-[-30px] rounded-md shadow-md divide-y-2 divide-dotted transition-all">
      <div className="p-2">
        <div className="text-[14px] font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
          {localStorage.getItem("mail")}
        </div>
        {/* <div className="text-[12px] text-gray-400">demo@minimals.cc</div> */}
      </div>
      {/* link */}
      <div className="p-2">
        <div
          onClick={() => {
            setActive(!active);
            navigate("/tai-khoan");
          }}
          className="text-[14px] font-semibold cursor-pointer py-2 hover:bg-gray-100 rounded-sm transition-all"
        >
          <p className="ml-2"> Thông tin</p>
        </div>
        <div className="text-[14px] font-semibold cursor-pointer py-2 hover:bg-gray-100 rounded-sm transition-all">
          <p className="ml-2"> Cài đặt</p>
        </div>
      </div>
      {/* logout */}
      <div className="p-2">
        <div
          onClick={() => {
            handLogout();
          }}
          className="text-[14px] font-semibold cursor-pointer py-2 hover:bg-gray-100 rounded-sm transition-all"
        >
          <p className="ml-2 text-red-800">Đăng xuất</p>
        </div>
      </div>
    </div>
  );
};

export default ModelAccount;
