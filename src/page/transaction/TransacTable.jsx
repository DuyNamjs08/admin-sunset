import { format } from "date-fns";
import Button from "../../components/button/Button";
import { Link } from "react-router-dom";
import { handleRenderStatus } from "../orderPage/orderTable";

const handleRenderTranslate = (text) => {
  switch (text) {
    case "pending":
      return "Đang chờ xử lý giao dịch";
    case "completed":
      return "Đã hoàn thành giao dịch";
    case "cancelled":
      return "Đã hủy giao dịch";
    default:
      return "";
  }
};
/* eslint-disable react/prop-types */
const TransacTable = ({ data }) => {
  return (
    <>
      <tbody className="divide-y divide-gray-200 ">
        {data && data?.length > 0
          ? data?.map((item, index) => {
              return (
                <tr key={index} className="hover:bg-gray-200 transition-all">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                    {item._id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    {item.name}
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap ${handleRenderStatus(
                      item.status
                    )}`}
                  >
                    {handleRenderTranslate(item.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    {item?.createdAt
                      ? format(new Date(item?.createdAt), "dd-MM-yyyy")
                      : ""}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800"></td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    <Link to={item._id + `?order_id=${item.order_id}`}>
                      <Button text={"Xem"} className={"px-4"} />
                    </Link>
                    {/* <Button
                      onclick={() => {
                        mutate(
                          {
                            _id: item._id,
                            imageName: item.imageName,
                          },
                          {
                            onSuccess: () => {
                              refetch();
                            },
                          }
                        );
                      }}
                      text={"Xóa"}
                      className={"bg-red-800 px-4"}
                    /> */}
                  </td>
                </tr>
              );
            })
          : ""}
      </tbody>
    </>
  );
};

export default TransacTable;
