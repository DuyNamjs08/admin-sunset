import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getHeaders, handleError } from "../helpers/getHeaders";
import { defaultLimit } from "../configUrl /configPagnigate";

const fetchData = async (query) => {
  const headers = getHeaders();

  try {
    const result = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/category`,
      {
        params: query,
        headers,
      }
    );
    return result.data;
  } catch (error) {
    await handleError(error);
    await fetchData();
  }
};
export const useCategory = (query) => {
  const { data, isLoading, error, status, refetch } = useQuery({
    queryKey: ["category", query],
    queryFn: () => fetchData(query),
  });
  return {
    data,
    totalPage: data?.totalCount
      ? Math.ceil(data.totalCount / defaultLimit.limit ?? 0)
      : 0,
    isLoading,
    error,
    status,
    refetch,
  };
};
const fetchDataPost = async (data) => {
  const headers = getHeaders();
  try {
    const result = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/category`,
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

export const useCategoryPost = () => {
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
      `${import.meta.env.VITE_BASE_URL}/categoryId`,
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
export const useCategoryDelete = () => {
  const { mutate, status } = useMutation({
    mutationFn: fetchDataDelete,
    onSuccess: () => {},
  });
  return { mutate, status };
};
const fetchDataId = async (id) => {
  const headers = getHeaders();

  try {
    const result = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/categoryId`,
      {
        headers,
        params: { _id: id },
      }
    );
    return result.data;
  } catch (error) {
    await handleError(error);
    await fetchData();
  }
};
export const useCategoryId = (query) => {
  const { data, isLoading, error, status, refetch } = useQuery({
    queryKey: ["category"],
    queryFn: () => fetchDataId(query),
  });
  return { data, isLoading, error, status, refetch };
};
const fetchDataUpdate = async (data) => {
  const headers = getHeaders();
  try {
    const result = await axios.put(
      `${import.meta.env.VITE_BASE_URL}/categoryId`,
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
export const useCategoryUpdate = () => {
  const { mutate, status } = useMutation({
    mutationFn: fetchDataUpdate,
    onSuccess: () => {},
  });
  return { mutate, status };
};
