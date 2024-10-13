import SearchCmp from "../../components/search/SearchCmp";
import { Table } from "../../components/table/Table";
import { TableHeader } from "../../components/table/TableHeader";
import { useOrder } from "../../useQuery/useOrder";
import OrderTable from "./orderTable";

const OrderPage = () => {
  const { data, refetch } = useOrder();
  return (
    <>
      <div className="text-xl font-semibold">Danh sách đơn hàng</div>
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
                label: "Mã order",
              },
              {
                label: "Trạng thái ",
              },
              {
                label: "Mã người dùng ",
              },
              {
                label: "Tên người",
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
        tableBody={<OrderTable data={data?.order} refetch={refetch} />}
        isEmpty={data?.product?.length === 0}
      />
    </>
  );
};

export default OrderPage;
