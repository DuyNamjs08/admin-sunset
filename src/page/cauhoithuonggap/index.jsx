import { useEffect, useState } from "react";
import img from "../../assets/Group 118.svg";
import Accordion from "../../components/dropdown";
import { showMessageError, showMessageSuccesss } from "../../feature/homeSlice";
import { useDispatch } from "react-redux";
import { postSchema } from "../infoPage/postSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "../../components/form/FormInput";
import MyEditor from "../../components/CKeditor";
import { CommonLoadingModal } from "../../components/model/LoadingModel";
import {
  useQuestions,
  useQuestionsDelete,
  useQuestionsPost,
} from "../../useQuery/useQuestion";
const Questions = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(postSchema),
    mode: "onSubmit",
  });
  const [editorData, setEditorData] = useState("");
  const [isLoadingMethod, setIsLoadingMethod] = useState(false);
  const { mutate, status } = useQuestionsDelete();
  const { data, isLoading, refetch } = useQuestions();
  const { mutate: mutatePost, status: statusPost } = useQuestionsPost();
  useEffect(() => {
    if (status === "pending" || statusPost === "pending") {
      setIsLoadingMethod(true);
    } else {
      setIsLoadingMethod(false);
    }
  }, [status, statusPost]);

  function base64ToFile(base64String, fileName) {
    const arr = base64String.split(",");
    const mime = arr[0]?.match(/:(.*?);/)?.[1];
    if (mime) {
      const bstr = atob(arr[1]);
      const n = bstr.length;
      const u8arr = new Uint8Array(n);
      for (let i = 0; i < n; i++) {
        u8arr[i] = bstr.charCodeAt(i);
      }
      return new File([u8arr], fileName, { type: mime });
    } else {
      return base64String;
    }
  }
  const ConverImg = (htmlContent) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");
    const images = doc.querySelectorAll("img");
    const files = Array.from(images).map((img, index) => {
      const fileName = `image${index}.png`;
      return base64ToFile(img.src, fileName);
    });
    return files;
  };
  return (
    <>
      <div className="flex w-full">
        <div className="w-2/3 p-[20px]">
          <div className="text-[20px] font-bold mb-4">
            Màn hình câu hỏi thường gặp{" "}
          </div>
          <FormInput
            id={"name"}
            label={"Tên tiêu đề"}
            placeholder={"Nhập tên tiêu đề"}
            register={register("name")}
            error={errors?.name}
          />
          <MyEditor editorData={editorData} setEditorData={setEditorData} />
          <button
            onClick={handleSubmit((data) => {
              // console.log(ConverImg(editorData));
              mutatePost(
                {
                  ...data,
                  description: editorData.replace(
                    /<img([^>]*?)src=["']([^"']*)["']([^>]*?)>/gi,
                    `<img$1src="[]"$3>`
                  ),
                  "image[]": ConverImg(editorData),
                },
                {
                  onSuccess: async () => {
                    refetch();
                    await reset();
                    dispatch(showMessageSuccesss("Tạo thành công!"));
                    setEditorData("");
                  },
                  onError: () => {
                    dispatch(showMessageError("Tạo thất bại!"));
                    setEditorData("");
                  },
                }
              );
            })}
            type="submit"
            className="text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center my-6"
          >
            Tạo câu hỏi
          </button>
          <div className="flex mt-8">
            <Accordion data={data} refetch={refetch} mutate={mutate} />
          </div>
        </div>
        <div className="w-1/3">
          <img src={img} alt="img" />
        </div>
      </div>
      <CommonLoadingModal isLoadingModalOpen={isLoading || isLoadingMethod} />
    </>
  );
};

export default Questions;
