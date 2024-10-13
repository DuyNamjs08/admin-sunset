import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getHeaders, handleError } from "../helpers/getHeaders";

const fetchData = async ({ senderId, receiverId }) => {
  const headers = getHeaders();
  try {
    const result = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/chat/${receiverId}?_id=${senderId}`,
      {
        headers,
      }
    );
    return result.data;
  } catch (error) {
    await handleError(error);
    await fetchData();
  }
};
export const useChatGet = ({ senderId, receiverId }) => {
  const { data, isLoading, error, status, refetch } = useQuery({
    queryKey: ["intro"],
    queryFn: () => fetchData({ senderId, receiverId }),
  });
  return { data, isLoading, error, status, refetch };
};
const fetchDataPost = async (data) => {
  const headers = getHeaders("json");
  try {
    const result = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/send/${data.receiverId}`,
      data,
      {
        headers,
      }
    );
    return result.data;
  } catch (error) {
    await handleError(error);
  }
};

export const useSendPost = () => {
  const { mutate, status } = useMutation({
    mutationFn: fetchDataPost,
    onSuccess: () => {},
  });
  return { mutate, status };
};
