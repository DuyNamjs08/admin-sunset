import { useState, useRef, useEffect } from "react";
import JoditEditor from "jodit-react";
// import HTMLReactParser from "html-react-parser";
import { Table } from "../../components/table/Table";
import { TableHeader } from "../../components/table/TableHeader";
import { CommonLoadingModal } from "../../components/model/LoadingModel";
import FormInput from "../../components/form/FormInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { showMessageError, showMessageSuccesss } from "../../feature/homeSlice";
import CKeditor from "../../components/CKeditor";
import PostTable from "../infoPage/PostTable";
import { postSchema } from "../infoPage/postSchema";
import {
  useFinish,
  useFinishDelete,
  useFinishPost,
} from "../../useQuery/useProject";
import { v4 as uuidv4 } from "uuid";

const Project = () => {
  const dispatch = useDispatch();
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [editorData, setEditorData] = useState("");
  // const [file, setFile] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(postSchema),
    mode: "onSubmit",
  });

  const [isLoadingMethod, setIsLoadingMethod] = useState(false);
  const { data, isLoading, refetch } = useFinish();
  const { mutate, status } = useFinishDelete();
  const { mutate: mutatePost, status: statusPost } = useFinishPost();
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
    const files = Array.from(images).map((img) => {
      const fileName = `image${uuidv4()}.png`;
      return base64ToFile(img.src, fileName);
    });
    return files;
  };
  return (
    <>
      <div className="text-[28px] font-bold my-5">
        Màn hình tạo dự án đã làm{" "}
      </div>
      <FormInput
        id={"name"}
        label={"Tên tiêu đề"}
        placeholder={"Nhập tên tiêu đề"}
        register={register("name")}
        error={errors?.name}
      />
      {false && (
        <JoditEditor
          ref={editor}
          value={content}
          tabIndex={1}
          onChange={(newContent) => setContent(newContent)}
        />
      )}
      {/* <div>{HTMLReactParser(content)}</div> */}
      <CKeditor editorData={editorData} setEditorData={setEditorData} />
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
                setContent("");
                await reset();
                dispatch(showMessageSuccesss("Tạo thành công!"));
              },
              onError: () => {
                dispatch(showMessageError("Tạo thất bại!"));
              },
            }
          );
        })}
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center my-6"
      >
        Tạo bài viết
      </button>
      <Table
        tableHeader={
          <TableHeader
            headers={[
              {
                label: "id",
              },
              {
                label: "Tên bài viết",
              },
              {
                label: "Ngày tạo",
              },
              {
                label: "",
              },
            ]}
          />
        }
        tableBody={<PostTable data={data} mutate={mutate} refetch={refetch} />}
        isEmpty={data?.length === 0}
      />
      <CommonLoadingModal isLoadingModalOpen={isLoading || isLoadingMethod} />
    </>
  );
};

export default Project;
