import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getHeaders, handleError } from "../helpers/getHeaders";
import { defaultLimit } from "../configUrl /configPagnigate";

const fetchDataMonth = async () => {
  const headers = getHeaders();
  try {
    const result = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/user-month`,
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
export const useUserMonth = () => {
  const { data, isLoading, error, status, refetch } = useQuery({
    queryKey: ["user-month"],
    queryFn: fetchDataMonth,
  });
  return { data, isLoading, error, status, refetch };
};
const fetchData = async (query) => {
  const headers = getHeaders();
  try {
    const result = await axios.get(`${import.meta.env.VITE_BASE_URL}/user`, {
      params: query,
      headers,
    });
    return result.data;
  } catch (error) {
    await handleError(error);
    await fetchData();
  }
};
export const useUser = (query) => {
  const { data, isLoading, error, status, refetch } = useQuery({
    queryKey: ["user", query],
    queryFn: () => fetchData(query),
  });
  return {
    data,
    isLoading,
    error,
    status,
    refetch,
    totalPage: data?.totalCount
      ? Math.ceil(data.totalCount / defaultLimit.limit ?? 0)
      : 0,
    totalCount: data?.totalCount ? data.totalCount : 0,
  };
};
const fetchDataPost = async (data) => {
  const headers = getHeaders();
  try {
    const result = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/create`,
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

export const useUserPost = () => {
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
      `${import.meta.env.VITE_BASE_URL}/userId`,
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
export const useUserDelete = () => {
  const { mutate, status } = useMutation({
    mutationFn: fetchDataDelete,
    onSuccess: () => {},
  });
  return { mutate, status };
};
const fetchDataId = async (id) => {
  const headers = getHeaders();

  try {
    const result = await axios.get(`${import.meta.env.VITE_BASE_URL}/userId`, {
      headers,
      params: { _id: id },
    });
    return result.data;
  } catch (error) {
    await handleError(error);
    await fetchData();
  }
};
export const useUserId = (query) => {
  const { data, isLoading, error, status, refetch } = useQuery({
    queryKey: ["user-id", query],
    queryFn: () => fetchDataId(query),
  });
  return { data, isLoading, error, status, refetch };
};
const fetchDataUpdate = async (data) => {
  const headers = getHeaders();
  try {
    const result = await axios.put(
      `${import.meta.env.VITE_BASE_URL}/userId`,
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
export const useUserUpdate = () => {
  const { mutate, status } = useMutation({
    mutationFn: fetchDataUpdate,
    onSuccess: () => {},
  });
  return { mutate, status };
};
