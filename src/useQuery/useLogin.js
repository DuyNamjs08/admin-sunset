import { useMutation } from "@tanstack/react-query";
import { handleError } from "../helpers/getHeaders";
import axios from "axios";

const fetchDataPost = async (data) => {
  try {
    const result = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/login`,
      data
    );
    return result.data;
  } catch (error) {
    await handleError(error);
  }
};
export const useLoginPost = () => {
  const { mutate, status, data, error } = useMutation({
    mutationFn: fetchDataPost,
    onSuccess: () => {},
  });
  return { mutate, status, data, error };
};
