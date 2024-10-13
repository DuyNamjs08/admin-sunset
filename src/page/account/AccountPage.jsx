import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import EmailIcon from "@mui/icons-material/Email";
import WorkIcon from "@mui/icons-material/Work";
import PersonIcon from "@mui/icons-material/Person";
import { accountSchema } from "./accountSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormInput from "../../components/form/FormInput";
import FormTextarea from "../../components/form/FormTextarea";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useEffect, useState } from "react";
import {
  useUser,
  useUserDelete,
  useUserId,
  useUserUpdate,
} from "../../useQuery/useUser";
import { CommonLoadingModal } from "../../components/model/LoadingModel";
import { createFormData } from "../../helpers/creatFormData";
import AccountTable from "./AccountTable";
import { Table } from "../../components/table/Table";
import { TableHeader } from "../../components/table/TableHeader";
import { Pagination } from "@mui/material";
import { usePaginate } from "../../hook/usePaginate";
import { Link } from "react-router-dom";
import Button from "../../components/button/Button";
import FormRadio from "../../components/form/FormRadio";
import { roleData } from "./AccountCreate";
import { useDispatch } from "react-redux";
import { showMessageError, showMessageSuccesss } from "../../feature/homeSlice";
const AccountPage = () => {
  const dispatch = useDispatch();
  const { offset, page, handleChange, limit } = usePaginate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(accountSchema),
    mode: "onSubmit",
  });
  const [file, setFile] = useState("");
  const { data, isLoading, refetch } = useUserId(
    localStorage.getItem("userId") ?? ""
  );
  const {
    data: dataListUser,
    isLoading: isLoadingUser,
    totalPage,
    totalCount,
    refetch: refetchUser,
  } = useUser({
    limit,
    offset,
  });
  const { mutate, status } = useUserUpdate();
  const { mutate: mutateDelete, status: statusDelete } = useUserDelete();
  useEffect(() => {
    if (data) {
      setValue("name", data?.name || "");
      setValue("mail", data?.mail || "");
      setValue("address", data?.address || "");
      setValue("phone", data?.phone || "");
      setValue("profession", data?.profession || "");
      setValue("description", data?.description || "");
      setValue("role", data?.role || "");
    }
  }, [data]);
  const [isLoadingMethod, setIsLoadingMethod] = useState(false);
  useEffect(() => {
    if (status === "pending" || statusDelete === "pending") {
      setIsLoadingMethod(true);
    } else {
      setIsLoadingMethod(false);
    }
  }, [status, statusDelete]);
  return (
    <>
      <div className="text-[28px] font-bold ml-5">
        Màn hình danh sách tài khoản{" "}
      </div>
      <div className="flex gap-8">
        <div className="w-1/3">
          <div className=" shadow-md flex gap-8 p-4 rounded-md">
            <img
              src={data?.image}
              alt=""
              className="w-[128px] h-[128px] rounded-full"
            />
            <div className="mt-4 font-semibold text-[20px] text-[#3a589d]">
              Số lượng tài khoản đã tạo:{" "}
              <span className="font-bold text-[25px] text-[#b7494a]">
                {" "}
                {totalCount ?? 0}
              </span>
            </div>
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
        {/* phần chỉnh sửa */}
        <div className="w-2/3 shadow-md rounded-md">
          <div className="p-4 font-semibold text-[20px] text-[#3a589d] ">
            Chỉnh sửa
          </div>
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
                  _id: localStorage.getItem("userId") ?? "",
                  image: file[0],
                  imageName: data.imageName ?? [],
                });
                mutate(result, {
                  onSuccess: () => {
                    refetch();
                    refetchUser();
                    dispatch(showMessageSuccesss("Chỉnh sửa thành công!"));
                  },
                  onError: () => {
                    dispatch(showMessageError("Chỉnh sửa thất bại!"));
                  },
                });
                reset();
              })}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
            >
              Lưu
            </button>
          </div>
        </div>
      </div>
      {/* phần table */}
      <div>
        <div className="text-xl font-semibold">Danh sách tài khoản</div>
        <Link to={"/tai-khoan/tao-tai-khoan"}>
          <Button text={"Thêm tài khoản"} className={"mt-4"} />
        </Link>
      </div>
      <div className="mt-8">
        <Table
          tableHeader={
            <TableHeader
              headers={[
                {
                  label: "Số thứ tự",
                },
                {
                  label: "id",
                },
                {
                  label: "Tên",
                },
                {
                  label: "Quyền",
                },
                {
                  label: "Ngày tạo",
                },
                {
                  label: "Image",
                },
                {
                  label: "",
                },
              ]}
            />
          }
          tableBody={
            <AccountTable
              data={dataListUser?.data}
              mutate={mutateDelete}
              refetch={refetch}
              refetchUser={refetchUser}
            />
          }
          isEmpty={dataListUser?.data?.length === 0}
        />
      </div>
      <div className="mt-4 flex justify-center">
        <Pagination
          count={totalPage ?? 0}
          page={page}
          onChange={handleChange}
          variant="outlined"
          shape="rounded"
        />
      </div>
      <CommonLoadingModal
        isLoadingModalOpen={isLoading || isLoadingMethod || isLoadingUser}
      />
    </>
  );
};

export default AccountPage;
