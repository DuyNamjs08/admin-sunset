import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getHeaders, handleError } from "../helpers/getHeaders";

const fetchDataMonth = async () => {
  const headers = getHeaders();
  try {
    const result = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/order-month`,
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
export const useOrderMonth = () => {
  const { data, isLoading, error, status, refetch } = useQuery({
    queryKey: ["order-month"],
    queryFn: fetchDataMonth,
  });
  return { data, isLoading, error, status, refetch };
};
const fetchData = async () => {
  const headers = getHeaders();

  try {
    const result = await axios.get(`${import.meta.env.VITE_BASE_URL}/order`, {
      headers,
    });
    return result.data;
  } catch (error) {
    await handleError(error);
    await fetchData();
  }
};
export const useOrder = () => {
  const { data, isLoading, error, status, refetch } = useQuery({
    queryKey: ["order"],
    queryFn: fetchData,
  });
  return { data, isLoading, error, status, refetch };
};
const fetchDataPost = async (data) => {
  const headers = getHeaders();
  try {
    const result = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/order`,
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

export const useOrderPost = () => {
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
      `${import.meta.env.VITE_BASE_URL}/orderId`,
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
export const useOrderDelete = () => {
  const { mutate, status } = useMutation({
    mutationFn: fetchDataDelete,
    onSuccess: () => {},
  });
  return { mutate, status };
};
const fetchDataId = async (id) => {
  const headers = getHeaders();

  try {
    const result = await axios.get(`${import.meta.env.VITE_BASE_URL}/orderId`, {
      headers,
      params: { _id: id },
    });
    return result.data;
  } catch (error) {
    await handleError(error);
    await fetchData();
  }
};
export const useOrderId = (query) => {
  const { data, isLoading, error, status, refetch } = useQuery({
    queryKey: ["order"],
    queryFn: () => fetchDataId(query),
  });
  return { data, isLoading, error, status, refetch };
};
const fetchDataUpdate = async (data) => {
  const headers = getHeaders("json");
  try {
    const result = await axios.put(
      `${import.meta.env.VITE_BASE_URL}/orderId`,
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
export const useOrderUpdate = () => {
  const { mutate, status } = useMutation({
    mutationFn: fetchDataUpdate,
    onSuccess: () => {},
  });
  return { mutate, status };
};
