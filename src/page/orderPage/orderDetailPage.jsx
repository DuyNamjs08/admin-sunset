import { zodResolver } from "@hookform/resolvers/zod";
import FormSelectBox from "../../components/form/FormSelectBox";
import { addDot } from "../../helpers/changeNumber";
import { useOrderId, useOrderUpdate } from "../../useQuery/useOrder";
import { orderSchema } from "./orderSchema";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { CommonLoadingModal } from "../../components/model/LoadingModel";
import { useDispatch } from "react-redux";
import { showMessageError, showMessageSuccesss } from "../../feature/homeSlice";
const orderData = [
  { label: "Đang chờ xác nhận", value: "pending" },
  { label: "Đang giao", value: "completed" },
  { label: "Đã hủy", value: "cancelled" },
];

const OrderDetailPage = () => {
  const dispatch = useDispatch();
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
  const [isLoadingMethod, setIsLoadingMethod] = useState(false);
  const { data, refetch, isLoading } = useOrderId(
    location.pathname.split("/")[2]
  );
  const { mutate } = useOrderUpdate();
  useEffect(() => {
    if (data) {
      setValue("status", data.status);
    }
  }, [data]);
  useEffect(() => {
    if (status === "pending") {
      setIsLoadingMethod(true);
    } else {
      setIsLoadingMethod(false);
    }
  }, [status]);
  return (
    <>
      <div className="text-xl font-semibold mb-3">
        Màn hình đơn hàng chi tiết
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
            <div>Trạng thái: </div>
            <div className="ml-2 font-normal text-[18px] text-red-600">
              {data?.status
                ? orderData.find((cb) => cb.value === data?.status).label
                : ""}
            </div>
          </div>
          <FormSelectBox
            data={orderData}
            label={"Đổi trạng thái đơn hàng"}
            id={"status"}
            register={register("status")}
          />
          {/*  giao dịch  */}
          <div className="flex gap-2">
            <button
              onClick={handleSubmit((dataForm) => {
                if (data) {
                  mutate(
                    { ...data, status: dataForm.status },
                    {
                      onSuccess: () => {
                        dispatch(showMessageSuccesss("Chỉnh sửa thành công!"));
                        refetch();
                      },
                      onError: () => {
                        dispatch(showMessageError("Chỉnh sửa thất bại!"));
                      },
                    }
                  );
                  reset();
                }
              })}
              type="submit"
              className="text-white bg-green-700 hover:bg-green-800   font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-6"
            >
              Lưu
            </button>
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800   font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-6"
            >
              Tiến hành giao dịch
            </button>
            <button
              type="submit"
              className="text-white bg-red-700 hover:bg-red-800   font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-6"
            >
              Hủy đơn hàng
            </button>
          </div>
        </div>
      </div>
      <CommonLoadingModal isLoadingModalOpen={isLoadingMethod || isLoading} />
    </>
  );
};

export default OrderDetailPage;
