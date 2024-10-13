import { useForm } from "react-hook-form";
import FormTextarea from "../../components/form/FormTextarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { footerSchema } from "./footerSchema";
import FormInput from "../../components/form/FormInput";
import { CommonLoadingModal } from "../../components/model/LoadingModel";
import { useFooter, useFooterUpdate } from "../../useQuery/useFooter";
import { useEffect, useState } from "react";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { showMessageError, showMessageSuccesss } from "../../feature/homeSlice";
import { useDispatch } from "react-redux";

const Footer = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(footerSchema),
    mode: "onSubmit",
  });
  const [isLoadingMethod, setIsLoadingMethod] = useState(false);
  const { data, isLoading, refetch } = useFooter();
  const { mutate, status } = useFooterUpdate();
  useEffect(() => {
    if (data) {
      setValue("mail", data[0]?.mail || "");
      setValue("address", data[0]?.address || "");
      setValue("phone", data[0]?.phone || "");
      setValue("title_footer_col1", data[0]?.title_footer_col1 || "");
      setValue("footerCol1", data[0]?.footerCol1 || "");
      setValue("title_footer_col2", data[0]?.title_footer_col2 || "");
      setValue("footerCol2", data[0]?.footerCol2 || "");
      setValue("title_footer_col3", data[0]?.title_footer_col3 || "");
      setValue("footerCol3", data[0]?.footerCol3 || "");
      setValue("titleSubFooter", data[0]?.titleSubFooter || "");
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
      <div className="text-[28px] font-bold ml-5">Màn hình tạo chân trang </div>
      <div className="flex gap-4 p-4 ">
        <div className="w-1/3">
          <FormInput
            id={"title_footer_col1"}
            label={"Tên cột 1"}
            placeholder={"Nhập tên cột 1"}
            register={register("title_footer_col1")}
            error={errors?.title_footer_col1}
          />
          <FormTextarea
            id={"footerCol1"}
            label={"Mô tả"}
            rows={6}
            placeholder={"Nhập mô tả"}
            register={register("footerCol1")}
            error={errors?.footerCol1}
          />
        </div>
        <div className="w-1/3">
          {" "}
          <FormInput
            id={"title_footer_col2"}
            label={"Tên cột 2"}
            placeholder={"Nhập cột 2"}
            register={register("title_footer_col2")}
            error={errors?.title_footer_col2}
          />
          <FormTextarea
            id={"footerCol2"}
            label={"Mô tả"}
            rows={6}
            placeholder={"Nhập mô tả"}
            register={register("footerCol2")}
            error={errors?.footerCol2}
          />
        </div>
        <div className="w-1/3">
          <FormInput
            id={"title_footer_col3"}
            label={"Tên cột 3"}
            placeholder={"Nhập cột 3"}
            register={register("title_footer_col3")}
            error={errors?.title_footer_col3}
          />
          <FormTextarea
            id={"footerCol3"}
            label={"Mô tả"}
            rows={6}
            placeholder={"Nhập mô tả"}
            register={register("footerCol3")}
            error={errors?.footerCol3}
          />
        </div>
      </div>
      {/* sub chân trang */}
      <div className="p-4">
        <div className="flex gap-6">
          <div className="w-1/3">
            <FormInput
              id={"titleSubFooter"}
              label={"Tên chân trang phụ"}
              placeholder={"Nhập tên chân trang phụ"}
              register={register("titleSubFooter")}
              error={errors?.titleSubFooter}
            />

            <FormInput
              id={"address"}
              label={"Địa chỉ"}
              placeholder={"Nhập địa chỉ"}
              register={register("address")}
              error={errors?.address}
            />
          </div>
          <div className="flex w-[300px]">
            <div className="h-[120px] w-full border-[2px] mt-8  flex justify-center items-center border-dashed">
              <label htmlFor="file-upload" className="flex items-center">
                {" "}
                <UploadFileIcon />
                Thêm ảnh
              </label>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          <div className="w-[500px]">
            <FormInput
              id={"phone"}
              label={"Số điện thoại"}
              placeholder={"Nhập số điện thoại"}
              register={register("phone")}
              error={errors?.phone}
            />
          </div>
          <div className="w-[500px]">
            <FormInput
              id={"mail"}
              label={"Mail"}
              placeholder={"Nhập Mail"}
              register={register("mail")}
              error={errors?.mail}
            />
          </div>
        </div>
      </div>
      <button
        onClick={handleSubmit((data) => {
          mutate(data, {
            onSuccess: () => {
              dispatch(showMessageSuccesss("Chỉnh sửa thành công!"));
              refetch();
            },
            onError: () => {
              dispatch(showMessageError("Chỉnh sửa thất bại!"));
            },
          });
          reset();
        })}
        className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
      >
        Lưu chân trang
      </button>
      <CommonLoadingModal isLoadingModalOpen={isLoading || isLoadingMethod} />
    </>
  );
};

export default Footer;
