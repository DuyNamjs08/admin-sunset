import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getHeaders, handleError } from "../helpers/getHeaders";

const fetchData = async () => {
  const headers = getHeaders();

  try {
    const result = await axios.get(`${import.meta.env.VITE_BASE_URL}/posts`, {
      headers,
    });
    return result.data;
  } catch (error) {
    await handleError(error);
    await fetchData();
  }
};
export const usePosts = () => {
  const { data, isLoading, error, status, refetch } = useQuery({
    queryKey: ["Posts"],
    queryFn: fetchData,
  });
  return { data, isLoading, error, status, refetch };
};
const fetchDataPost = async (data) => {
  const headers = getHeaders();
  try {
    const result = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/posts`,
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

export const usePostsPost = () => {
  const { mutate, status } = useMutation({
    mutationFn: fetchDataPost,
    onSuccess: () => {},
  });
  return { mutate, status };
};
const fetchDataDelete = async (data) => {
  const headers = getHeaders();
  try {
    const result = await axios.delete(
      `${import.meta.env.VITE_BASE_URL}/postId`,
      {
        headers,
        params: data,
      }
    );
    return result.data;
  } catch (error) {
    await handleError(error);
    await fetchData();
  }
};
export const usePostsDelete = () => {
  const { mutate, status } = useMutation({
    mutationFn: fetchDataDelete,
    onSuccess: () => {},
  });
  return { mutate, status };
};
const fetchDataId = async (id) => {
  const headers = getHeaders();

  try {
    const result = await axios.get(`${import.meta.env.VITE_BASE_URL}/postId`, {
      headers,
      params: { _id: id },
    });
    return result.data;
  } catch (error) {
    await handleError(error);
    await fetchData();
  }
};
export const usePostsId = (query) => {
  const { data, isLoading, error, status, refetch } = useQuery({
    queryKey: ["Postsid"],
    queryFn: () => fetchDataId(query),
  });
  return { data, isLoading, error, status, refetch };
};
const fetchDataUpdate = async (data) => {
  const headers = getHeaders("json");
  try {
    const result = await axios.put(
      `${import.meta.env.VITE_BASE_URL}/postId`,
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
export const usePostsUpdate = () => {
  const { mutate, status } = useMutation({
    mutationFn: fetchDataUpdate,
    onSuccess: () => {},
  });
  return { mutate, status };
};
