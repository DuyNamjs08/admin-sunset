import { CommonLoadingModal } from "../../components/model/LoadingModel";
import { useUserId } from "../../useQuery/useUser";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import EmailIcon from "@mui/icons-material/Email";
import WorkIcon from "@mui/icons-material/Work";
import PersonIcon from "@mui/icons-material/Person";
import { useLocation } from "react-router-dom";

const AccountDetails = () => {
  const location = useLocation();
  const { data, isLoading } = useUserId(location.pathname.split("/")[2] ?? "");
  return (
    <>
      <div className="text-[28px] font-bold  my-4">
        Màn hình tài khoản chi tiết
      </div>
      <div className="flex gap-8">
        <div className="w-1/3">
          <div className=" shadow-md flex gap-8 p-4 rounded-md">
            <img
              src={data?.image}
              alt=""
              className="w-[128px] h-[128px] rounded-full"
            />
          </div>
          {/* thông tin */}
          <div className="shadow-md p-4 mt-4 rounded-md">
            <div className="font-semibold text-[24px]">Thông tin</div>
            <div className="font-semibold text-[18px] text-[#b7494a] my-2">
              {data?.name}
            </div>
            <div className="font-sans">{data?.description}</div>
            <div className="flex items-center gap-4 mt-4">
              <div>
                <PersonIcon className="text-[#344955]" />
              </div>
              <div className="font-semibold text-[#3a589d] ">
                {" "}
                {data?.phone}
              </div>
            </div>
            <div className="flex items-center gap-4 mt-4">
              <div>
                <AddLocationAltIcon className="text-[#db4432]" />
              </div>
              <div className="font-semibold text-[#3a589d] ">
                {" "}
                {data?.address}
              </div>
            </div>
            <div className="flex items-center gap-4 mt-4">
              <div>
                <EmailIcon className="text-[#dc8305]" />
              </div>
              <div className="font-semibold text-[#3a589d]"> {data?.mail}</div>
            </div>
            <div className="flex items-center gap-4 mt-4">
              <div>
                <WorkIcon className="text-[#006e61]" />
              </div>
              <div className="font-semibold text-[#3a589d]">
                {data?.profession}
              </div>
            </div>
          </div>
        </div>
        {/* phần đã order */}
        <div className="w-2/3">
          <div className="text-[22px] font-bold  my-4">
            Đơn hàng người dùng đã mua
          </div>
          <div></div>
        </div>
      </div>
      <CommonLoadingModal isLoadingModalOpen={isLoading} />
    </>
  );
};

export default AccountDetails;
