import { useEffect, useState } from "react";
import BannerCmp from "../../components/banner/BannerCmp";
import CarouselCmp from "../../components/carousel/carouselCmp";
import { useLocation, useNavigate } from "react-router-dom";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  useProduct,
  useProductId,
  useProductUpdate,
} from "../../useQuery/useProducts";
import { productSchema } from "./schema";
import FormInput from "../../components/form/FormInput";
import FormSelectBox from "../../components/form/FormSelectBox";
import FormCheckbox from "../../components/form/FormCheckbox";
// import FormTextarea from "../../components/form/FormTextarea";
import FormRadio from "../../components/form/FormRadio";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useCategory } from "../../useQuery/useCategory";
import { CommonLoadingModal } from "../../components/model/LoadingModel";
import { createFormData } from "../../helpers/creatFormData";
import { addDot } from "../../helpers/changeNumber";
import { defaultLimit } from "../../configUrl /configPagnigate";
import { showMessageError, showMessageSuccesss } from "../../feature/homeSlice";
import { useDispatch } from "react-redux";
import CKeditor from "../../components/CKeditor";
const PromoteData = [
  { label: "Theo giá tiền", value: "fixed" },
  { label: "Theo phần trăm", value: "percentage" },
];
const colorData = [
  { label: "Không xác định", value: "0" },
  { label: "Có màu", value: "1" },
];
const ProductDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(productSchema),
    mode: "onSubmit",
  });
  const [editorData, setEditorData] = useState("");
  const location = useLocation();
  const [isEdit, setIsEdit] = useState(false);
  const [file, setFile] = useState([]);
  const [fileOld, setFileOld] = useState([]);
  const {
    data: dataProductId,
    refetch,
    isLoading,
  } = useProductId(location.pathname.split("/")[2]);
  const [isLoadingMethod, setIsLoadingMethod] = useState(false);
  const { data, isLoading: isisLoadingCategory } = useCategory();
  const {
    data: dataListproduct,
    isLoading: isLoadingListproduct,
    refetch: refetchListProduct,
  } = useProduct({
    category_id: location.search.split("=")[1],
    limit: defaultLimit.limit,
    offset: 0,
  });
  const { mutate, status } = useProductUpdate();
  const handleDelete = (index) => {
    const updatedImages = file.filter((img, i) => i !== index);
    setFile(updatedImages);
  };
  useEffect(() => {
    if (dataProductId) {
      setValue("productName", dataProductId?.productName || "");
      setValue("price", dataProductId?.price || "");
      setValue("category_id", dataProductId?.category_id || "");
      setValue("promoteType", dataProductId?.promoteType || false);
      setValue("promotePrice", dataProductId?.promotePrice || "");
      setValue("type", dataProductId?.type || "");
      setValue("status", dataProductId?.status || false);
      setValue("inStore", dataProductId?.inStore || "");
      setValue("weight", dataProductId?.weight || "");
      setValue("size", dataProductId?.size || "");
      setValue("color", dataProductId?.color || "");
      setValue("description", dataProductId?.description || "");
      setEditorData(dataProductId?.description);
      setFileOld(dataProductId.image.split(","));
    }
  }, [dataProductId]);
  useEffect(() => {
    if (status === "pending") {
      setIsLoadingMethod(true);
    } else {
      setIsLoadingMethod(false);
    }
  }, [status]);
  return (
    <>
      <div className="text-xl font-semibold mb-3">Sản phẩm chi tiết</div>
      {isEdit ? (
        <button
          onClick={handleSubmit(async (dataForm) => {
            if (isEdit) {
              const result = createFormData({
                ...dataForm,
                _id: dataProductId._id,
                "image[]": file,
                imageName: dataProductId.imageName,
              });
              mutate(result, {
                onSuccess: () => {
                  dispatch(showMessageSuccesss("Chỉnh sửa thành công!"));
                  setIsEdit(false);
                  refetch();
                  refetchListProduct();
                },
                onError: () => {
                  dispatch(showMessageError("Chỉnh sửa thất bại!"));
                },
              });
              reset();
              setFile([]);
            }
          })}
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800   font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-6"
        >
          Lưu thông tin
        </button>
      ) : (
        <button
          onClick={() => setIsEdit(true)}
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800   font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-6"
        >
          Chỉnh sửa
        </button>
      )}
      <button
        onClick={() => navigate("/san-pham")}
        type="submit"
        className="text-white bg-yellow-500 hover:bg-yellow-600   font-medium rounded-lg text-sm px-5 py-2.5 text-center  ml-5 mt-6"
      >
        Quay lại
      </button>
      {isEdit ? (
        <div>
          <div className="flex gap-4 mt-6">
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
              {/* <FormTextarea
                id={"description"}
                label={"Mô tả"}
                rows={12}
                placeholder={"Nhập mô tả"}
                register={register("description")}
                error={errors?.description}
              /> */}
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
                {fileOld.length > 0 &&
                  file.length === 0 &&
                  fileOld.map((image, index) => (
                    <div key={index}>
                      <img
                        src={image}
                        alt={`Image ${index}`}
                        className="max-w-[200px] mb-2"
                      />
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div>
            <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Mô tả sản phẩm
            </div>
            <div className="pr-8 py-4">
              <CKeditor editorData={editorData} setEditorData={setEditorData} />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex gap-8 mt-6">
          <div className="mb-4 md:mb-0 md:w-1/3">
            <BannerCmp dataProductId={dataProductId} />
          </div>
          <div className="md:mb-8 md:w-2/3 px-8 mb-8">
            <p className="mb-4">
              <span className="font-semibold">Thương hiệu :</span> TC Pharma
            </p>
            <h3 className="text-[18px] font-semibold">
              {dataProductId ? dataProductId.productName : ""}
            </h3>
            <p>
              <strong className=" text-[20px] font-semibold mt-4 text-blue-700/80">
                {dataProductId ? addDot(dataProductId.price) : ""}
              </strong>{" "}
              <span className="text-[18px] text-blue-600/80">
                {" "}
                / {dataProductId ? dataProductId.type : ""}
              </span>
            </p>
            {/* <p>
              <strong className=" text-[18px] font-semibold mt-4 text-gray-700/50 line-through">
                280.000đ
              </strong>
            </p> */}
            {/* sản phẩm chi tiết */}
            <div>
              <div className="flex mb-3">
                <p className="text-[14px] w-[200px] font-semibold">
                  Chọn đơn vị tính:
                </p>
                <p className="text-[14px]">
                  {" "}
                  {dataProductId ? dataProductId.type : ""}
                </p>
              </div>
              <div className="flex mb-3">
                <p className="text-[14px] w-[200px] font-semibold">Danh mục:</p>
                <p className="text-[14px] text-blue-700 ">
                  {dataProductId && data
                    ? data?.data?.find(
                        (item) => item._id === dataProductId.category_id
                      )?.name
                    : ""}
                </p>
              </div>
              <div className="flex mb-3">
                <p className="text-[14px] w-[200px] font-semibold">Quy cách:</p>
                <p className="text-[14px]">
                  {" "}
                  {dataProductId
                    ? `${dataProductId.size} x ${dataProductId.weight}`
                    : ""}
                </p>
              </div>
              <div className="flex mb-3">
                <p className="text-[14px] w-[200px] font-semibold">
                  Xuất xứ thương hiệu:
                </p>
                <p className="text-[14px]">Việt Nam</p>
              </div>
              <div className="flex mb-3">
                <p className="text-[14px] w-[200px] font-semibold">Đặc điểm:</p>
                <p className="text-[14px]">
                  {" "}
                  {dataProductId ? dataProductId.color : ""}
                </p>
              </div>
              <div className="flex mb-3">
                <p className="text-[14px] min-w-[200px] font-semibold">
                  Mô tả :
                </p>
                <div
                  className="text-[14px]"
                  dangerouslySetInnerHTML={{
                    __html: dataProductId ? dataProductId.description : "",
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* sản phẩm liên quan  */}
      <div className="text-xl font-semibold my-6">Sản phẩm liên quan</div>
      <div>
        <CarouselCmp
          dataProductHot={dataListproduct?.data ?? []}
          id={location.search.split("=")[1]}
        />
      </div>
      <CommonLoadingModal
        isLoadingModalOpen={
          isLoadingMethod ||
          isisLoadingCategory ||
          isLoading ||
          isLoadingListproduct
        }
      />
    </>
  );
};

export default ProductDetail;
