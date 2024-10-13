import { Link } from "react-router-dom";
import Button from "../../components/button/Button";
import { format } from "date-fns";

/* eslint-disable react/prop-types */
export const handleRenderStatus = (text) => {
  switch (text) {
    case "pending":
      return "text-yellow-600 font-semibold ";
    case "completed":
      return "text-green-700 font-semibold ";
    case "cancelled":
      return "text-red-700 font-semibold ";
    default:
      return "";
  }
};
const handleRenderTranslate = (text) => {
  switch (text) {
    case "pending":
      return "Đang chờ xử lý";
    case "completed":
      return "Đã hoàn thành đơn hàng";
    case "cancelled":
      return "Đã hủy đơn hàng";
    default:
      return "";
  }
};
const OrderTable = ({ data }) => {
  return (
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
                <td
                  className={`px-6 py-4 whitespace-nowrap ${handleRenderStatus(
                    item.status
                  )}`}
                >
                  {handleRenderTranslate(item.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {item.customer_id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {item.customer_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {item?.createdAt
                    ? format(new Date(item?.createdAt), "dd-MM-yyyy")
                    : ""}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  <Link to={item._id}>
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
                    className={"bg-red-800 px-4 hover:bg-red-900"}
                  /> */}
                </td>
              </tr>
            );
          })
        : ""}
    </tbody>
  );
};

export default OrderTable;
