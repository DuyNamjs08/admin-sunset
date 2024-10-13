import { useForm } from "react-hook-form";
import FormInput from "../../components/form/FormInput";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { zodResolver } from "@hookform/resolvers/zod";
import { accountCreateSchema } from "./accountSchema";
import { createFormData } from "../../helpers/creatFormData";
import FormTextarea from "../../components/form/FormTextarea";
import { useEffect, useState } from "react";
import { useUserPost } from "../../useQuery/useUser";
import { CommonLoadingModal } from "../../components/model/LoadingModel";
import FormRadio from "../../components/form/FormRadio";
import { useDispatch } from "react-redux";
import { showMessageError, showMessageSuccesss } from "../../feature/homeSlice";
import { useNavigate } from "react-router-dom";

export const roleData = [
  { label: "Admin", value: import.meta.env.VITE_ADMIN },
  { label: "User", value: import.meta.env.VITE_USER },
];
const AccountCreate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(accountCreateSchema),
    mode: "onSubmit",
  });
  const [file, setFile] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { mutate, status } = useUserPost();
  useEffect(() => {
    if (status === "pending") {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [status]);
  return (
    <>
      <div className="text-[28px] font-bold ml-5 my-8">
        Màn hình tạo tài khoản{" "}
      </div>
      <div className="shadow-md rounded-md">
        <div className="px-6 flex gap-4">
          <div className="w-1/2">
            <FormInput
              id={"name"}
              label={"Tên "}
              placeholder={"Nhập tên"}
              register={register("name")}
              error={errors?.name}
            />
            <FormInput
              id={"mail"}
              label={"Mail "}
              placeholder={"Nhập Mail"}
              register={register("mail")}
              error={errors?.mail}
            />
            <FormInput
              id={"phone"}
              label={"Số điện thoại "}
              placeholder={"Nhập số điện thoại"}
              register={register("phone")}
              error={errors?.phone}
            />
            <FormTextarea
              id={"description"}
              label={"Mô tả"}
              rows={6}
              placeholder={"Nhập mô tả"}
              register={register("description")}
              error={errors?.description}
            />
          </div>
          <div className="w-1/2">
            <FormInput
              id={"address"}
              label={"Địa chỉ "}
              placeholder={"Nhập địa chỉ"}
              register={register("address")}
              error={errors?.address}
            />
            <FormInput
              id={"profession"}
              label={"Nghề nghiệp "}
              placeholder={"Nhập nghề nghiệp"}
              register={register("profession")}
              error={errors?.profession}
            />
            <FormRadio
              label={"Quyền"}
              data={roleData}
              register={register("role")}
            />
            <FormInput
              type="password"
              id={"password"}
              label={"Password "}
              placeholder={"Nhập password"}
              register={register("password")}
              error={errors?.password}
            />
            <div className="h-[120px]  border-[2px]  flex justify-center items-center border-dashed">
              <label htmlFor="file-upload" className="flex items-center">
                {" "}
                <UploadFileIcon />
                Thêm ảnh
              </label>
            </div>
            {!file ? (
              <p className={`text-red-300 mt-3`}>{"Vui lòng chọn ảnh"}</p>
            ) : (
              <img
                src={URL.createObjectURL(file[0])}
                alt=""
                className="w-[128px] h-[128px] mt-4 object-contain"
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
        <div className="p-6">
          <button
            onClick={handleSubmit((data) => {
              const result = createFormData({
                ...data,
                image: file[0],
              });
              mutate(result, {
                onSuccess: () => {
                  navigate("/tai-khoan");
                  dispatch(showMessageSuccesss("Tạo thành công!"));
                },
                onError: () => {
                  dispatch(showMessageError("Tạo thất bại!"));
                },
              });
              reset();
            })}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
          >
            Tạo tài khoản
          </button>
        </div>
      </div>
      <CommonLoadingModal isLoadingModalOpen={isLoading} />
    </>
  );
};

export default AccountCreate;
