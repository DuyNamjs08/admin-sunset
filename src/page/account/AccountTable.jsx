/* eslint-disable no-unused-vars */

import { format } from "date-fns";
import Button from "../../components/button/Button";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showMessageError, showMessageSuccesss } from "../../feature/homeSlice";

/* eslint-disable react/prop-types */
const UserEnums = {
  ADMIN: import.meta.env.VITE_ADMIN,
  USER: import.meta.env.VITE_USER,
};
const AccountTable = ({ data, mutate, refetch, refetchUser }) => {
  const dispatch = useDispatch();
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
                    {item?.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-800 font-semibold">
                    {item?.role
                      ? Object.entries(UserEnums).find(
                          ([_, value]) => value === item.role
                        )[0]
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
                      src={item.image}
                      alt="img"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    <Link to={item._id}>
                      <Button text={"Xem"} className={"px-4"} />
                    </Link>
                    <Button
                      disable={item._id === localStorage.getItem("userId")}
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
                              refetchUser();
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

export default AccountTable;
