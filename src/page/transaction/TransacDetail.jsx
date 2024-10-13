import { useLocation, useNavigate } from "react-router-dom";
import { CommonLoadingModal } from "../../components/model/LoadingModel";
import {
  useTransactionId,
  useTransactionUpdate,
} from "../../useQuery/useTransaction";
import { useOrderId } from "../../useQuery/useOrder";
import { showMessageError, showMessageSuccesss } from "../../feature/homeSlice";
import { addDot } from "../../helpers/changeNumber";
import FormSelectBox from "../../components/form/FormSelectBox";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { orderSchema } from "../orderPage/orderSchema";
import { useEffect, useState } from "react";
import { handleRenderStatus } from "../orderPage/orderTable";

const orderData = [
  { label: "Đang chờ xác nhận", value: "pending" },
  { label: "Đang giao", value: "completed" },
  { label: "Đã hủy", value: "cancelled" },
];
const transactionData = [
  { label: "Đang chờ xử lý giao dịch", value: "pending" },
  { label: "Đã hoàn thành giao dịch", value: "completed" },
  { label: "Đã hủy giao dịch", value: "cancelled" },
];
const TransacDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    // formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(orderSchema),
    mode: "onSubmit",
  });
  const {
    data: dataTransactionId,
    isLoading: isloaddingTransaction,
    refetch: refreshTransaction,
  } = useTransactionId(location.pathname.split("/")[2] ?? "");
  const [isLoadingMethod, setIsLoadingMethod] = useState(false);
  const { data, refetch, isLoading } = useOrderId(
    location.search.split("=")[1]
  );
  const { mutate, status } = useTransactionUpdate();
  useEffect(() => {
    if (dataTransactionId) {
      setValue("status", dataTransactionId.status);
    }
  }, [dataTransactionId]);
  useEffect(() => {
    if (status === "pending") {
      setIsLoadingMethod(true);
    } else {
      setIsLoadingMethod(false);
    }
  }, [status]);
  return (
    <>
      <div className="text-[28px] font-bold  my-4">
        Màn hình chi tiết giao dịch
      </div>
      <div className="flex gap-8">
        {/* thông tin */}
        <div className="shadow-md p-4 mt-4 rounded-md">
          <div className="font-semibold text-[24px]">Thông tin người đặt</div>
          <div className="font-semibold text-[18px] text-[#b7494a] my-2">
            {dataTransactionId?.name}
          </div>
          <div className="font-sans">{dataTransactionId?.description}</div>
        </div>
      </div>
      <div className="block md:flex gap-5">
        <div className="md:w-1/2 flex flex-col gap-4">
          {data?.products
            ? data?.products.map((item) => (
                <div key={item._id} className="flex gap-4 shadow-md">
                  <div className="w-1/3">
                    <img
                      className="h-[120px] w-[100%] object-contain"
                      src={item.image ? item.image.split(",")[0] : ""}
                      alt=""
                    />
                  </div>
                  <div className="w-1/3 flex  flex-col gap-2">
                    <div className="text-[18px] font-semibold">
                      {item.productName}
                    </div>
                    <div className="text-[14px] text-gray-500 flex items-center gap-2">
                      <div>Giá</div>
                      <div>
                        {" "}
                        {addDot(item.price)} <span>vnđ</span>
                      </div>
                    </div>
                  </div>
                  <div className="w-1/3 flex items-center justify-center gap-2">
                    <div className="flex items-center">
                      <span className="font-medium mr-2">số lượng:</span>{" "}
                      <span className="font-semibold text-[18px] text-green-700">
                        {item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            : ""}
        </div>
        {/* phần 2  */}
        <div className="md:w-1/2 flex flex-col gap-4 shadow-sms">
          <div className="font-semibold text-[20px]">Thông tin đơn hàng </div>
          <div className="flex items-center gap-4 mt-3">
            <div className="font-semibold">Tên người đặt:</div>
            <div>{data?.customer_name}</div>
          </div>
          <div className="flex items-center gap-4 mt-3">
            <div className="font-semibold">Số điện thoại:</div>
            <div>{data?.shipping_address?.phone}</div>
          </div>
          <div className="flex items-center gap-4 mt-3">
            <div className="font-semibold">Địa chỉ:</div>
            <div>
              {data?.shipping_address?.address_line1} -{" "}
              {data?.shipping_address?.address_line2} -{" "}
              {data?.shipping_address?.city} -{data?.shipping_address?.state} -
              {data?.shipping_address?.country}
            </div>
          </div>
          <div className="flex items-center mt-3">
            <div>Tổng tiền : </div>
            <div className="ml-2 font-semibold text-[18px]">
              {addDot(data?.total_price)} <span>vnđ</span>
            </div>
          </div>
          <div className="flex items-center mt-3">
            <div>Trạng thái đơn hàng: </div>
            <div
              className={`ml-2 font-normal text-[18px] ${handleRenderStatus(
                data?.status
              )}`}
            >
              {data?.status
                ? orderData.find((cb) => cb.value === data?.status).label
                : ""}
            </div>
          </div>
          <div className="flex items-center mt-3">
            <div>Trạng thái giao dịch: </div>
            <div
              className={`ml-2 font-normal text-[18px] ${handleRenderStatus(
                dataTransactionId?.status
              )}`}
            >
              {dataTransactionId?.status
                ? transactionData.find(
                    (cb) => cb.value === dataTransactionId?.status
                  ).label
                : ""}
            </div>
          </div>
          <FormSelectBox
            data={transactionData}
            label={"Đổi trạng thái giao dịch"}
            id={"status"}
            register={register("status")}
          />
          {/*  giao dịch  */}
          <div className="flex gap-2">
            <button
              onClick={handleSubmit((dataForm) => {
                if (dataTransactionId) {
                  mutate(
                    { ...dataTransactionId, status: dataForm.status },
                    {
                      onSuccess: () => {
                        dispatch(
                          showMessageSuccesss("Đổi trạng thái thành công!")
                        );
                        refreshTransaction();
                        refetch();
                        reset();
                      },
                      onError: () => {
                        dispatch(showMessageError("Đổi trạng thái thất bại!"));
                      },
                    }
                  );
                }
              })}
              type="submit"
              className="text-white bg-green-700 hover:bg-green-800   font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-6"
            >
              Lưu
            </button>
            <button
              onClick={() => navigate("/giao-dich")}
              type="submit"
              className="text-white bg-yellow-500 hover:bg-yellow-600   font-medium rounded-lg text-sm px-5 py-2.5 text-center  ml-5 mt-6"
            >
              Quay lại
            </button>
          </div>
        </div>
      </div>
      <CommonLoadingModal
        isLoadingModalOpen={
          isLoading || isLoadingMethod || isloaddingTransaction
        }
      />
    </>
  );
};

export default TransacDetail;
