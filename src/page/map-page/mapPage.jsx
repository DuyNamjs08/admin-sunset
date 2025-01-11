import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { ChartCmp } from "../../components/chart/Chart";
import { useUserMonth } from "../../useQuery/useUser";
import { CommonLoadingModal } from "../../components/model/LoadingModel";
import { calcTotalCount } from "../../helpers/totalCount";
import { compareProgress } from "../../helpers/compareProgress";
import { useOrderMonth } from "../../useQuery/useOrder";
import { useTransactionMonth } from "../../useQuery/useTransaction";

const MapPage = () => {
  const { data, isLoading } = useUserMonth();
  const { data: dataOrder, isLoading: isLoadingOrder } = useOrderMonth();
  const { data: dataTransaction, isLoading: isLoadingTransaction } =
    useTransactionMonth();
  // console.log(dataOrder, dataTransaction);
  console.log(data);
  return (
    <>
      <div className="text-[28px] font-bold my-5">Trang chủ </div>
      <div className="flex items-center gap-8">
        <div className="w-1/3 shadow-md flex items-center p-12 justify-between rounded-md">
          <div>
            <p className="mb-4 text-[24px] font-semibold text-[#12372A]">
              Tổng số người dùng
            </p>
            <div className="flex items-center gap-4">
              <EmojiEmotionsIcon className="text-[#007F73]" />
              <span className="text-[#007F73]">
                {data ? compareProgress(data) : 0} %
              </span>
            </div>
          </div>
          <div className="text-[24px] font-semibold ">
            {data ? calcTotalCount(data, "count") : 0}
          </div>
        </div>
        <div className="w-1/3 shadow-md flex items-center p-12 justify-between rounded-md">
          <div>
            <p className="mb-4 text-[24px] font-semibold text-[#211C6A]">
              Tổng số đơn hàng
            </p>
            <div className="flex items-center gap-4">
              <KeyboardDoubleArrowUpIcon className="text-[#124076]" />
              <span className="text-[#124076]">
                {" "}
                {dataOrder ? compareProgress(dataOrder) : 0} %
              </span>
            </div>
          </div>
          <div className="text-[24px] font-semibold ">
            {" "}
            {dataOrder && dataOrder.length > 0
              ? calcTotalCount(dataOrder, "count")
              : 0}
          </div>
        </div>
        <div className="w-1/3 shadow-md flex items-center p-12 justify-between rounded-md">
          <div>
            <p className="mb-4 text-[24px] font-semibold text-[#E8751A]">
              Tổng số giao dịch
            </p>
            <div className="flex items-center gap-4">
              <KeyboardDoubleArrowDownIcon className="text-[#FFC374]" />
              <span className="text-[#FFC374]">
                {" "}
                {dataTransaction ? compareProgress(dataTransaction) : 0} %
              </span>
            </div>
          </div>
          <div className="text-[24px] font-semibold ">
            {dataTransaction ? calcTotalCount(dataTransaction, "count") : 0}
          </div>
        </div>
      </div>
      <div className="my-4">
        <ChartCmp
          dataUser={data}
          dataOrder={dataOrder}
          dataTransaction={dataTransaction}
        />
      </div>
      <CommonLoadingModal
        isLoadingModalOpen={isLoading || isLoadingOrder || isLoadingTransaction}
      />
    </>
  );
};

export default MapPage;
