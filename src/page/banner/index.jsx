import { useEffect, useState } from "react";
import Button from "../../components/button/Button";
import { CommonLoadingModal } from "../../components/model/LoadingModel";
import { useBanner, useBannerUpdate } from "../../useQuery/useBanner";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { createFormData } from "../../helpers/creatFormData";
import { showMessageError, showMessageSuccesss } from "../../feature/homeSlice";
import { useDispatch } from "react-redux";

const BannerPage = () => {
  const [file, setFile] = useState([]);
  const [fileOld, setFileOld] = useState([]);
  const [isLoadingMethod, setIsLoadingMethod] = useState(false);
  const { status, mutate } = useBannerUpdate();
  const { isLoading, data, refetch } = useBanner();
  const dispatch = useDispatch();
  useEffect(() => {
    if (status === "pending") {
      setIsLoadingMethod(true);
    } else {
      setIsLoadingMethod(false);
    }
  }, [status]);
  const handleDelete = (index) => {
    const updatedImages = file.filter((img, i) => i !== index);
    setFile(updatedImages);
  };
  useEffect(() => {
    if (data) {
      setFileOld(data?.[0]?.image.split(","));
    }
  }, [data]);
  const hanleClick = async () => {
    const result = createFormData({
      _id: data?.[0]?._id,
      "image[]": file,
      imageName: data?.[0]?.imageName,
    });
    mutate(result, {
      onSuccess: () => {
        dispatch(showMessageSuccesss("Chỉnh sửa thành công!"));
        refetch();
      },
      onError: () => {
        dispatch(showMessageError("Chỉnh sửa thất bại!"));
      },
    });
    setFile([]);
  };
  return (
    <>
      <div className="text-xl font-semibold">Danh sách banner</div>
      <Button onclick={hanleClick} text={"Lưu banner"} className={"mt-4"} />
      <CommonLoadingModal isLoadingModalOpen={isLoading || isLoadingMethod} />
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
        <div className="mt-4 flex gap-3 items-center">
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
    </>
  );
};

export default BannerPage;
