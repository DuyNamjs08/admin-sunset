import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getHeaders, handleError } from "../helpers/getHeaders";
import { defaultLimit } from "../configUrl /configPagnigate";

const fetchDataMonth = async () => {
  const headers = getHeaders();
  try {
    const result = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/transaction-month`,
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
export const useTransactionMonth = () => {
  const { data, isLoading, error, status, refetch } = useQuery({
    queryKey: ["Transaction-month"],
    queryFn: fetchDataMonth,
  });
  return { data, isLoading, error, status, refetch };
};
const fetchData = async (query) => {
  const headers = getHeaders();

  try {
    const result = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/transaction`,
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
export const useTransaction = (query) => {
  const { data, isLoading, error, status, refetch } = useQuery({
    queryKey: ["Transaction", query],
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
  };
};
const fetchDataPost = async (data) => {
  const headers = getHeaders();
  try {
    const result = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/Transaction`,
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

export const useTransactionPost = () => {
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
      `${import.meta.env.VITE_BASE_URL}/TransactionId`,
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
export const useTransactionDelete = () => {
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
      `${import.meta.env.VITE_BASE_URL}/transactionId`,
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
export const useTransactionId = (query) => {
  const { data, isLoading, error, status, refetch } = useQuery({
    queryKey: ["Transaction"],
    queryFn: () => fetchDataId(query),
  });
  return { data, isLoading, error, status, refetch };
};
const fetchDataUpdate = async (data) => {
  const headers = getHeaders("json");
  try {
    const result = await axios.put(
      `${import.meta.env.VITE_BASE_URL}/transactionId`,
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
export const useTransactionUpdate = () => {
  const { mutate, status } = useMutation({
    mutationFn: fetchDataUpdate,
    onSuccess: () => {},
  });
  return { mutate, status };
};
