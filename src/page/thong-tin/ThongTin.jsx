import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "../../components/form/FormInput";
import FormTextarea from "../../components/form/FormTextarea";
import { CommonLoadingModal } from "../../components/model/LoadingModel";
import { useEffect, useState } from "react";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { createFormData } from "../../helpers/creatFormData";
import { useDispatch } from "react-redux";
import { showMessageError, showMessageSuccesss } from "../../feature/homeSlice";
import {
  useInformation,
  useInformationUpdate,
} from "../../useQuery/useInformation";
import { profileSchema } from "./profile.schema";

const ThongTin = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(profileSchema),
    mode: "onSubmit",
  });

  const [file, setFile] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fileOld, setFileOld] = useState();
  const handleDelete = (index) => {
    const updatedImages = file.filter((img, i) => i !== index);
    setFile(updatedImages);
  };
  const { mutate, status } = useInformationUpdate();
  const { data, isLoading: isloadingProfile } = useInformation();
  useEffect(() => {
    if (status === "pending") {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [status]);
  useEffect(() => {
    if (data) {
      setValue("name", data?.[0]?.name || "");
      setValue("description", data?.[0]?.description || "");
      setValue("address", data?.[0]?.address || "");
      setValue("sub_address", data?.[0]?.sub_address || "");
      setValue("coordinates_address", data?.[0]?.coordinates_address || "");
      setValue("phone", data?.[0]?.phone || "");
      setValue("sub_phone", data?.[0]?.sub_phone || "");
      setValue("mail", data?.[0]?.mail || "");
      setValue("sub_mail", data?.[0]?.sub_mail || "");
      setValue("tax_code", data?.[0]?.tax_code || "");
      setValue("facebook", data?.[0]?.facebook || "");
      setValue("message", data?.[0]?.message || "");
      setFileOld(data?.[0]?.image || "");
    }
  }, [data]);
  return (
    <>
      <div className="text-[20px] font-bold mb-4">Màn hình thông tin </div>
      <button
        type="submit"
        onClick={handleSubmit(
          (dataForm) => {
            if (file.length > 0) {
              const result = createFormData({
                ...dataForm,
                image: file[0],
                imageName: data[0]?.imageName,
              });
              mutate(result, {
                onSuccess: () => {
                  dispatch(showMessageSuccesss("Tạo thành công!"));
                },
                onError: () => {
                  dispatch(showMessageError("Tạo thất bại!"));
                },
              });
              reset();
            }
          },
          (err) => {
            console.log(err);
          }
        )}
        className="mb-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 text-center "
      >
        Lưu thông tin
      </button>
      <div className="flex gap-4">
        <div className="w-1/3">
          <FormInput
            id={"name"}
            label={"Tên"}
            placeholder={"Nhập tên"}
            register={register("name")}
            error={errors?.name}
          />
          <FormInput
            id={"address"}
            label={"Địa chỉ"}
            placeholder={"Nhập địa chỉ"}
            register={register("address")}
            error={errors?.address}
          />
          <FormInput
            id={"sub_address"}
            label={"Địa chỉ phụ"}
            placeholder={"Nhập địa chỉ phụ"}
            register={register("sub_address")}
            error={errors?.sub_address}
          />
          <FormInput
            id={"coordinates_address"}
            label={"Địa chỉ trên google"}
            placeholder={"Nhập địa chỉ trên google"}
            register={register("coordinates_address")}
            error={errors?.coordinates_address}
          />
          <FormInput
            id={"phone"}
            label={"Số điện thoại"}
            placeholder={"Nhập số điện thoại"}
            register={register("phone")}
            error={errors?.phone}
          />
          <FormInput
            id={"sub_phone"}
            label={"Số điện thoại phụ"}
            placeholder={"Nhập số điện thoại phụ"}
            register={register("sub_phone")}
            error={errors?.sub_phone}
          />
          <FormTextarea
            id={"description"}
            label={"Mô tả"}
            rows={12}
            placeholder={"Nhập mô tả"}
            register={register("description")}
            error={errors?.description}
          />
        </div>
        {/* =========== */}
        <div className="w-1/3 ">
          <FormInput
            id={"mail"}
            label={"Mail"}
            placeholder={"Nhập eMail"}
            register={register("mail")}
            error={errors?.mail}
          />
          <FormInput
            id={"sub_mail"}
            label={"Mail phụ"}
            placeholder={"Nhập eMail phụ"}
            register={register("sub_mail")}
            error={errors?.sub_mail}
          />
          <FormInput
            id={"tax_code"}
            label={"Thông tin thuế"}
            placeholder={"Nhập thông tin thuế"}
            register={register("tax_code")}
            error={errors?.tax_code}
          />
          <FormInput
            id={"facebook"}
            label={"Link Facebook"}
            placeholder={"Nhập link Facebook"}
            register={register("facebook")}
            error={errors?.facebook}
          />
          <FormInput
            id={"message"}
            label={"Link Message"}
            placeholder={"Nhập link Message"}
            register={register("message")}
            error={errors?.message}
          />
        </div>
        <div className="w-1/3 ">
          <div className="h-[120px]  border-[2px]  flex justify-center items-center border-dashed">
            <label htmlFor="file-upload" className="flex items-center">
              {" "}
              <UploadFileIcon />
              Thêm ảnh logo
            </label>
          </div>
          {/* {!file.length > 0 && (
            <p className={`text-red-300 mt-3`}>{"Vui lòng chọn ảnh"}</p>
          )} */}
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
          <div className="mt-4">
            {file.map((image, index) => (
              <div key={index}>
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Image ${index}`}
                  className="max-w-[200px] mb-2"
                />
                <button
                  onClick={() => handleDelete(index)}
                  type="submit"
                  className=" p-2 mb-4 text-white bg-red-700 hover:bg-red-800 focus:ring-4 font-medium rounded-lg text-sm text-center "
                >
                  Xóa
                </button>
              </div>
            ))}
            {fileOld?.length > 0 && file.length === 0 && (
              <div>
                <img
                  src={fileOld}
                  alt={`Image`}
                  className="max-w-[200px] mb-2"
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <CommonLoadingModal isLoadingModalOpen={isLoading || isloadingProfile} />
    </>
  );
};

export default ThongTin;
