import { useState } from "react";
import { defaultLimit } from "../configUrl /configPagnigate";
import { useSearchParams } from "react-router-dom";

export const usePaginate = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const limit = defaultLimit.limit;
  const [page, setPage] = useState(
    searchParams.get("page") ? parseInt(searchParams.get("page")) : 1
  );
  const [offset, setOffset] = useState(
    searchParams.get("offset") ? parseInt(searchParams.get("offset")) : 0
  );
  const handleChange = (event, value) => {
    setPage(value);
    setOffset((value - 1) * limit);
    setSearchParams({ limit: limit, offset: (value - 1) * limit, page: value });
  };

  return { page, setPage, offset, setOffset, handleChange, limit };
};
