import { useForm } from "react-hook-form";
import FormInput from "../../components/form/FormInput";
import FormTextarea from "../../components/form/FormTextarea";
import { contactSchema } from "./contactSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useEffect, useState } from "react";
import { useContact, useContactUpdate } from "../../useQuery/useContact";
import { CommonLoadingModal } from "../../components/model/LoadingModel";
import { createFormData } from "../../helpers/creatFormData";
import { showMessageError, showMessageSuccesss } from "../../feature/homeSlice";
import { useDispatch } from "react-redux";

const ContactPage = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(contactSchema),
    mode: "onSubmit",
  });

  const { data, refetch, isLoading } = useContact();
  const { mutate, status } = useContactUpdate();
  const [isLoadingMethod, setIsLoadingMethod] = useState(false);
  const [file, setFile] = useState("");
  useEffect(() => {
    if (data) {
      setValue("title", data[0]?.title);
      setValue("textTitle", data[0]?.textTitle);
      setValue("subTitle", data[0]?.subTitle);
      setValue("textSubTitle", data[0]?.textSubTitle);
      setValue("address", data[0]?.address);
      setValue("phone", data[0]?.phone);
      setValue("location", data[0]?.location);
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
      <div className="text-[28px] font-bold my-5">Màn hình liên hệ </div>
      <div className="flex gap-8">
        <div className="w-1/2">
          <FormInput
            id={"title"}
            label={"Tên cột 1"}
            placeholder={"Nhập tên cột 1"}
            register={register("title")}
            error={errors?.title}
          />
          <FormTextarea
            id={"textTitle"}
            label={"Mô tả"}
            rows={6}
            placeholder={"Nhập mô tả"}
            register={register("textTitle")}
            error={errors?.textTitle}
          />
          <FormInput
            id={"address"}
            label={"Địa chỉ"}
            placeholder={"Nhập địa chỉ"}
            register={register("address")}
            error={errors?.address}
          />
          <FormInput
            id={"phone"}
            label={"Số điện thoại"}
            placeholder={"Nhập số điện thoại"}
            register={register("phone")}
            error={errors?.phone}
          />
          <FormInput
            id={"location"}
            label={"Vị trí"}
            placeholder={"Nhập vị trí"}
            register={register("location")}
            error={errors?.location}
          />
          <button
            onClick={handleSubmit((dataForm) => {
              const result = createFormData({
                ...dataForm,
                image: file[0],
                imageName: data[0]?.imageName,
              });
              mutate(result, {
                onSuccess: () => {
                  dispatch(showMessageSuccesss("Chỉnh sửa thành công!"));
                  refetch();
                  setFile("");
                },
                onError: () => {
                  dispatch(showMessageError("Chỉnh sửa thất bại!"));
                },
              });
              reset();
            })}
            className="text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-8"
          >
            Lưu
          </button>
        </div>
        <div className="w-1/2">
          <FormInput
            id={"subTitle"}
            label={"Tên cột 2"}
            placeholder={"Nhập tên cột 2"}
            register={register("subTitle")}
            error={errors?.subTitle}
          />
          <FormTextarea
            id={"textSubTitle"}
            label={"Mô tả"}
            rows={6}
            placeholder={"Nhập mô tả"}
            register={register("textSubTitle")}
            error={errors?.textSubTitle}
          />
          <div className="h-[120px] w-full border-[2px] mt-8  flex justify-center items-center border-dashed">
            <label htmlFor="file-upload" className="flex items-center">
              <UploadFileIcon />
              Thêm ảnh
            </label>
          </div>
          {!file ? (
            <img
              src={data ? data[0]?.image : ""}
              alt=""
              className="w-[100%] h-[300px] mt-4 object-contain"
            />
          ) : (
            <img
              src={URL.createObjectURL(file[0])}
              alt=""
              className="w-[100%] h-[300px] mt-4 object-contain"
            />
          )}
          <input
            onChange={(e) => {
              setFile(Array.from(e.target.files));
            }}
            id="file-upload"
            type="file"
            name="file-upload"
            accept="image/*"
            className="hidden"
          />
        </div>
      </div>
      <CommonLoadingModal isLoadingModalOpen={isLoading || isLoadingMethod} />
    </>
  );
};

export default ContactPage;
