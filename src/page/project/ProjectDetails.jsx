import { useLocation, useNavigate } from "react-router-dom";
// import HTMLReactParser from "html-react-parser";
import { useEffect, useRef, useState } from "react";
import JoditEditor from "jodit-react";
import { CommonLoadingModal } from "../../components/model/LoadingModel";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormInput from "../../components/form/FormInput";
import { useDispatch } from "react-redux";
import { showMessageError, showMessageSuccesss } from "../../feature/homeSlice";
import { postSchema } from "../infoPage/postSchema";
import { useFinishId, useFinishUpdate } from "../../useQuery/useProject";
import { decodeHtml } from "../../helpers/common";
import parse from "html-react-parser";
import styled from "styled-components";

const FinishProject = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const editor = useRef(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(postSchema),
    mode: "onSubmit",
  });
  const [content, setContent] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [isLoadingMethod, setIsLoadingMethod] = useState(false);
  const { data, refetch, isLoading } = useFinishId(
    location.pathname.split("/")[2]
  );
  const { mutate, status } = useFinishUpdate();
  useEffect(() => {
    if (status === "pending") {
      setIsLoadingMethod(true);
    } else {
      setIsLoadingMethod(false);
    }
  }, [status]);
  useEffect(() => {
    if (data) {
      setContent(data.description);
      setValue("name", data.name);
    }
  }, [data]);
  return (
    <>
      <div className="text-[28px] font-bold my-8">
        Màn hình bài viết chi tiết{" "}
      </div>
      {isEdit ? (
        <button
          onClick={handleSubmit((data) => {
            mutate(
              {
                ...data,
                description: content,
                _id: location.pathname.split("/")[2],
              },
              {
                onSuccess: async () => {
                  dispatch(showMessageSuccesss("Chỉnh sửa thành công!"));
                  refetch();
                  setContent("");
                  setIsEdit(false);
                  await reset();
                },
                onError: () => {
                  dispatch(showMessageError("Chỉnh sửa thất bại!"));
                },
              }
            );
          })}
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center my-6"
        >
          Lưu bài viết
        </button>
      ) : (
        <button
          onClick={() => setIsEdit(true)}
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center my-6"
        >
          Chỉnh sửa bài viết
        </button>
      )}
      <button
        onClick={() => navigate(-1)}
        type="submit"
        className="text-white bg-yellow-600 hover:bg-yellow-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center my-6 ml-4"
      >
        Quay lại
      </button>

      {isEdit ? (
        <>
          <FormInput
            id={"name"}
            label={"Tên tiêu đề"}
            placeholder={"Nhập tên tiêu đề"}
            register={register("name")}
            error={errors?.name}
          />
          <JoditEditor
            ref={editor}
            value={content}
            tabIndex={1}
            onChange={(newContent) => setContent(newContent)}
          />
        </>
      ) : data ? (
        <StylePost>
          <div className="title text-[24px] font-bold my-8 text-[#3a589d]">
            {data.name}
          </div>
          <div className="mt-6 description">
            {parse(decodeHtml(data.description))}
          </div>
        </StylePost>
      ) : (
        ""
      )}
      <CommonLoadingModal isLoadingModalOpen={isLoading || isLoadingMethod} />
    </>
  );
};
export const StylePost = styled.div`
  padding: 0 15%;
  .title {
    font-size: 30px;
    text-transform: uppercase;
  }
  h1 strong {
    font-size: 20px;
    margin-bottom: 20px;
  }
  p {
    color: #333;
    line-height: 1.5;
    margin-bottom: 1rem;
    font-size: 16px;
  }
  ul {
    list-style: disc;
    padding-left: 18px;
    padding-bottom: 5px;
  }
  iframe {
    max-width: 600px;
    height: 450px;
    margin: 0 auto;
  }
  img {
    width: 100%;
    height: 100%;
    margin-bottom: 20px;
  }
  a {
    color: #4e73df;
    text-decoration: underline;
    transition: all 0.3s;
    :hover {
      color: #0056b3;
    }
  }
  .table {
    width: 100%;
    margin-bottom: 20px;
  }
  table {
    width: 100%;
  }
  .table tbody > tr > td {
    border: 1px solid #ddd;
    padding: 7px 10px;
    font-size: 16px;
    line-height: 1.5;
  }
  @media (max-width: 768px) {
    padding: 0;
    iframe {
      width: 100%;
      height: 300px;
    }
  }
`;
export default FinishProject;
