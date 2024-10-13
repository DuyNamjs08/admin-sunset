import { Link } from "react-router-dom";
import Button from "../../components/button/Button";
import { format } from "date-fns";
import { addDot } from "../../helpers/changeNumber";
import { useDispatch } from "react-redux";
import { showMessageError, showMessageSuccesss } from "../../feature/homeSlice";

/* eslint-disable react/prop-types */
const ProductTable = ({ data, mutate, refetch, dataCategory }) => {
  const dispatch = useDispatch();
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
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-semibold">
                  {item.productName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-red-800 font-semibold">
                  {addDot(item.price)} vnđ
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm  font-semibold text-blue-800 cursor-pointer">
                  {dataCategory
                    ? dataCategory.find(
                        (category) => category._id === item.category_id
                      )?.name
                    : ""}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {item?.createdAt
                    ? format(new Date(item?.createdAt), "dd-MM-yyyy")
                    : ""}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  <img
                    className="h-[50px] w-[50px]"
                    src={item.image.split(",")[0]}
                    alt="img"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  <Link to={item._id + `?category_id=${item.category_id}`}>
                    <Button text={"Xem"} className={"px-4"} />
                  </Link>
                  <Button
                    onclick={() => {
                      mutate(
                        {
                          _id: item._id,
                          imageName: item.imageName,
                        },
                        {
                          onSuccess: () => {
                            dispatch(showMessageSuccesss("Xóa thành công!"));
                            refetch();
                          },
                          onError: () => {
                            dispatch(showMessageError("Xóa thất bại!"));
                          },
                        }
                      );
                    }}
                    text={"Xóa"}
                    className={"bg-red-800 px-4 hover:bg-red-900"}
                  />
                </td>
              </tr>
            );
          })
        : ""}
    </tbody>
  );
};

export default ProductTable;
