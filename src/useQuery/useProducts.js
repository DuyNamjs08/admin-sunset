import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getHeaders, handleError } from "../helpers/getHeaders";
import { defaultLimit } from "../configUrl /configPagnigate";

const fetchData = async (query) => {
  const headers = getHeaders("json");
  try {
    const result = await axios.get(`${import.meta.env.VITE_BASE_URL}/product`, {
      params: query,
      headers,
    });
    return result.data;
  } catch (error) {
    await handleError(error);
    await fetchData();
  }
};
export const useProduct = (query) => {
  const { data, isLoading, error, status, refetch } = useQuery({
    queryKey: ["product", query],
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
const fetchDataSearch = async (query) => {
  const headers = getHeaders("json");
  try {
    if (query.productName) {
      const result = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/product`,
        {
          params: query,
          headers,
        }
      );
      return result.data;
    }
    return [];
  } catch (error) {
    await handleError(error);
    await fetchData();
  }
};
export const useProductSearch = (query) => {
  const { data, isLoading, error, status, refetch } = useQuery({
    queryKey: ["product-search", query],
    queryFn: () => fetchDataSearch(query),
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
      `${import.meta.env.VITE_BASE_URL}/product`,
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

export const useProductPost = () => {
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
      `${import.meta.env.VITE_BASE_URL}/productId`,
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
export const useProductDelete = () => {
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
      `${import.meta.env.VITE_BASE_URL}/productId`,
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
export const useProductId = (query) => {
  const { data, isLoading, error, status, refetch } = useQuery({
    queryKey: ["productid", query],
    queryFn: () => fetchDataId(query),
  });
  return { data, isLoading, error, status, refetch };
};
const fetchDataUpdate = async (data) => {
  const headers = getHeaders();
  try {
    const result = await axios.put(
      `${import.meta.env.VITE_BASE_URL}/productId`,
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
export const useProductUpdate = () => {
  const { mutate, status } = useMutation({
    mutationFn: fetchDataUpdate,
    onSuccess: () => {},
  });
  return { mutate, status };
};
