import { Pagination } from "@mui/material";
import SearchCmp from "../../components/search/SearchCmp";
import { Table } from "../../components/table/Table";
import { TableHeader } from "../../components/table/TableHeader";
import { usePaginate } from "../../hook/usePaginate";
import { useTransaction } from "../../useQuery/useTransaction";
import TransacTable from "./TransacTable";
import { CommonLoadingModal } from "../../components/model/LoadingModel";

const TransacPage = () => {
  const { offset, page, handleChange, limit } = usePaginate();
  const { data, isLoading, refetch, totalPage } = useTransaction({
    offset,
    limit,
  });
  return (
    <>
      <div className="text-xl font-semibold">Danh sách giao dịch </div>
      <div className="flex justify-between items-center pr-8 mb-4">
        <SearchCmp text="Tìm kiếm" component={true} />
      </div>
      <Table
        tableHeader={
          <TableHeader
            headers={[
              {
                label: "Số thứ tự",
              },
              {
                label: "Mã giao dịch",
              },
              {
                label: "Người đặt ",
              },
              {
                label: "Trạng thái",
              },
              {
                label: "Ngày đặt",
              },
              {
                label: "",
              },
            ]}
          />
        }
        tableBody={<TransacTable data={data?.data} refetch={refetch} />}
        isEmpty={data?.product?.length === 0}
      />
      <div className="mt-4 flex justify-center">
        <Pagination
          count={totalPage ?? 0}
          page={page}
          onChange={handleChange}
          variant="outlined"
          shape="rounded"
        />
      </div>
      <CommonLoadingModal isLoadingModalOpen={isLoading} />
    </>
  );
};

export default TransacPage;
