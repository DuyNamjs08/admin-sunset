import { format } from "date-fns";
import Button from "../../components/button/Button";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showMessageError, showMessageSuccesss } from "../../feature/homeSlice";

/* eslint-disable react/prop-types */
const PostTable = ({ data, mutate, refetch }) => {
  const dispatch = useDispatch();
  return (
    <>
      <tbody className="divide-y divide-gray-200 ">
        {data && data?.length > 0
          ? data?.map((item, index) => {
              return (
                <tr key={index} className="hover:bg-gray-200 transition-all">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                    {item._id}
                  </td>
                  <td className="px-6 max-w-10 py-4 whitespace-nowrap text-sm text-gray-800 text-ellipsis overflow-hidden">
                    {item?.name}
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
                    <Button
                      onclick={() => {
                        mutate(
                          {
                            _id: item._id,
                            imageName: item.imageName,
                          },
                          {
                            onSuccess: () => {
                              refetch();
                              dispatch(showMessageSuccesss("Xóa thành công!"));
                            },
                            onError: () => {
                              dispatch(showMessageError("Xóa thất bại!"));
                            },
                          }
                        );
                      }}
                      text={"Xóa"}
                      className={"bg-red-800 px-4"}
                    />
                  </td>
                </tr>
              );
            })
          : ""}
      </tbody>
    </>
  );
};

export default PostTable;
