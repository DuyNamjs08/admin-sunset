import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "./schema";
import FormInput from "../../components/form/FormInput";
import FormTextarea from "../../components/form/FormTextarea";
import FormCheckbox from "../../components/form/FormCheckbox";
import FormSelectBox from "../../components/form/FormSelectBox";
import { useCategory } from "../../useQuery/useCategory";
import { CommonLoadingModal } from "../../components/model/LoadingModel";
import FormRadio from "../../components/form/FormRadio";
import { useEffect, useState } from "react";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useProductPost } from "../../useQuery/useProducts";
import { createFormData } from "../../helpers/creatFormData";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showMessageError, showMessageSuccesss } from "../../feature/homeSlice";

const PromoteData = [
  { label: "Theo giá tiền", value: "fixed" },
  { label: "Theo phần trăm", value: "percentage" },
];
const colorData = [
  { label: "Không xác định", value: "0" },
  { label: "Có màu", value: "1" },
];
const ProductCreate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(productSchema),
    mode: "onSubmit",
  });

  const [file, setFile] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { data, isLoading: isisLoadingCategory } = useCategory();
  const handleDelete = (index) => {
    const updatedImages = file.filter((img, i) => i !== index);
    setFile(updatedImages);
  };
  const { mutate, status } = useProductPost();
  useEffect(() => {
    if (status === "pending") {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [status]);
  return (
    <>
      <div className="text-[20px] font-bold mb-4">Màn hình tạo sản phẩm </div>
      <button
        type="submit"
        onClick={handleSubmit(
          (dataForm) => {
            if (file.length > 0) {
              const result = createFormData({
                ...dataForm,
                "image[]": file,
              });
              mutate(result, {
                onSuccess: () => {
                  dispatch(showMessageSuccesss("Tạo thành công!"));
                  navigate("/san-pham");
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
        Tạo sản phẩm
      </button>
      <div className="flex gap-4">
        <div className="w-1/3">
          <FormInput
            id={"productName"}
            label={"Tên sản phẩm"}
            placeholder={"Nhập tên sản phẩm"}
            register={register("productName")}
            error={errors?.productName}
          />
          <FormInput
            id={"price"}
            label={"Giá sản phẩm"}
            placeholder={"Nhập giá sản phẩm"}
            register={register("price")}
            error={errors?.price}
          />
          <FormSelectBox
            data={
              data?.data
                ? data?.data?.map((item) => {
                    return { value: item._id, label: item.name };
                  })
                : []
            }
            label={"Tên thư mục"}
            id={"category_id"}
            register={register("category_id")}
          />
          <FormCheckbox
            label={"Khuyến mãi"}
            register={register("promoteType")}
            id={"promoteType"}
          />
          <FormSelectBox
            data={PromoteData}
            label={"Hình thức khuyến mãi"}
            id={"promotePrice"}
            register={register("promotePrice")}
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
            id={"type"}
            label={"Kiểu sản phẩm"}
            placeholder={"Kiểu sản phẩm"}
            register={register("type")}
            error={errors?.type}
          />
          <FormCheckbox
            label={"Trạng thái sản phẩm"}
            register={register("status")}
            id={"status"}
          />
          <FormInput
            id={"inStore"}
            label={"Số sản phẩm trong kho"}
            placeholder={"Số sản phẩm trong kho"}
            register={register("inStore")}
            error={errors?.inStore}
          />
          <FormInput
            id={"weight"}
            label={"Trọng lượng"}
            placeholder={"Nhập trọng lượng"}
            register={register("weight")}
            error={errors?.weight}
          />
          <FormInput
            id={"size"}
            label={"Kích thước"}
            placeholder={"Nhập kích thước"}
            register={register("size")}
            error={errors?.size}
          />
          <FormRadio
            label={"Màu sắc"}
            data={colorData}
            register={register("color")}
          />
        </div>
        <div className="w-1/3 ">
          <div className="h-[120px]  border-[2px]  flex justify-center items-center border-dashed">
            <label htmlFor="file-upload" className="flex items-center">
              {" "}
              <UploadFileIcon />
              Thêm ảnh
            </label>
          </div>
          {!file.length > 0 && (
            <p className={`text-red-300 mt-3`}>{"Vui lòng chọn ảnh"}</p>
          )}
          <input
            onChange={(e) => {
              setFile(Array.from(e.target.files));
            }}
            id="file-upload"
            type="file"
            name="file-upload"
            multiple
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
          </div>
        </div>
      </div>
      <CommonLoadingModal
        isLoadingModalOpen={isLoading || isisLoadingCategory}
      />
    </>
  );
};

export default ProductCreate;
