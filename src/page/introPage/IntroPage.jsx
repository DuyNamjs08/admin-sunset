import { useState, useRef, useEffect } from "react";
import JoditEditor from "jodit-react";
import FormInput from "../../components/form/FormInput";
import { introSchema } from "./introSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useIntro, useIntroUpdate } from "../../useQuery/useIntro";
import { CommonLoadingModal } from "../../components/model/LoadingModel";
import { createFormData } from "../../helpers/creatFormData";
import { useDispatch } from "react-redux";
import { showMessageError, showMessageSuccesss } from "../../feature/homeSlice";

const IntroPage = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(introSchema),
    mode: "onSubmit",
  });
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [file, setFile] = useState("");
  const [isLoadingMethod, setIsLoadingMethod] = useState(false);
  const { data, refetch, isLoading } = useIntro();
  const { mutate, status } = useIntroUpdate();
  console.log(data);
  useEffect(() => {
    if (data) {
      setValue("name", data[0]?.name ?? "");
      setContent(data[0]?.description);
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
      <div className="text-[28px] font-bold my-5">Màn hình tạo giới thiệu </div>
      <FormInput
        id={"name"}
        label={"Tên tiêu đề"}
        placeholder={"Nhập tên tiêu đề"}
        register={register("name")}
        error={errors?.name}
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
      <div className="mt-6">
        <JoditEditor
          ref={editor}
          value={content}
          tabIndex={100}
          onChange={(newContent) => setContent(newContent)}
        />
      </div>
      <button
        onClick={handleSubmit((dataForm) => {
          const result = createFormData({
            ...dataForm,
            description: content,
            image: file[0],
            imageName: data[0]?.imageName,
          });
          mutate(result, {
            onSuccess: () => {
              dispatch(showMessageSuccesss("Chỉnh sửa thành công!"));
              refetch();
              setFile("");
              setContent("");
            },
            onError: () => {
              dispatch(showMessageError("Chỉnh sửa thất bại!"));
            },
          });
          reset();
        })}
        className="text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm px-5 py-2.5 text-center my-8"
      >
        Lưu
      </button>
      <CommonLoadingModal isLoadingModalOpen={isLoading || isLoadingMethod} />
    </>
  );
};

export default IntroPage;
