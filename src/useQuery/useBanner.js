import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getHeaders, handleError } from "../helpers/getHeaders";

const fetchData = async () => {
  const headers = getHeaders();
  try {
    const result = await axios.get(`${import.meta.env.VITE_BASE_URL}/banner`, {
      headers,
    });
    return result.data;
  } catch (error) {
    await handleError(error);
    await fetchData();
  }
};
export const useBanner = () => {
  const { data, isLoading, error, status, refetch } = useQuery({
    queryKey: ["Banner"],
    queryFn: fetchData,
  });
  return { data, isLoading, error, status, refetch };
};

const fetchDataUpdate = async (data) => {
  const headers = getHeaders();
  try {
    const result = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/banner`,
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
export const useBannerUpdate = () => {
  const { mutate, status } = useMutation({
    mutationFn: fetchDataUpdate,
    onSuccess: () => {},
  });
  return { mutate, status };
};
