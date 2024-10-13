import { useForm } from "react-hook-form";
import FormInput from "../../components/form/FormInput";
import FormTextarea from "../../components/form/FormTextarea";
import { categorySchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useCategoryPost } from "../../useQuery/useCategory";
import { CommonLoadingModal } from "../../components/model/LoadingModel";
import { useNavigate } from "react-router-dom";
import { createFormData } from "../../helpers/creatFormData";
import { showMessageError, showMessageSuccesss } from "../../feature/homeSlice";
import { useDispatch } from "react-redux";

const CategoryCreate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(categorySchema),
    mode: "onSubmit",
  });
  const [file, setFile] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { mutate, status } = useCategoryPost();
  useEffect(() => {
    if (status === "pending") {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [status]);
  return (
    <>
      <div className="text-[20px] font-bold ml-5">Màn hình tạo thư mục </div>
      <form
        onSubmit={handleSubmit(async (dataForm) => {
          if (file) {
            const result = createFormData({
              ...dataForm,
              image: file[0],
            });
            mutate(result, {
              onSuccess: () => {
                navigate("/danh-muc");
                dispatch(showMessageSuccesss("Tạo thành công!"));
              },
              onError: () => {
                dispatch(showMessageError("Tạo thất bại!"));
              },
            });
            reset();
          }
        })}
        className="max-w-sm p-6"
      >
        <FormInput
          id={"name"}
          label={"Tên thư mục"}
          placeholder={"Nhập tên thư mục"}
          register={register("name")}
          error={errors?.name}
        />
        {!watch("image") ? (
          <input
            onChange={(e) => {
              setFile(e.target.files);
            }}
            id="image"
            type="file"
            name="image"
          />
        ) : (
          <strong>{watch("image")[0].name}</strong>
        )}
        {!file && <p className={`text-red-300 ml-3`}>{"Vui lòng chọn ảnh"}</p>}

        <FormTextarea
          id={"description"}
          label={"Mô tả"}
          rows={6}
          placeholder={"Nhập mô tả"}
          register={register("description")}
          error={errors?.description}
        />
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
        >
          Tạo thư mục
        </button>
      </form>
      <CommonLoadingModal isLoadingModalOpen={isLoading} />
    </>
  );
};

export default CategoryCreate;
