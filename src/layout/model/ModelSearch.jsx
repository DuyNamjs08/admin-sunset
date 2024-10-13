/* eslint-disable react/prop-types */
import { Avatar } from "@mui/material";
import "./style.css";
import { Link } from "react-router-dom";

const ModelSearch = ({ data }) => {
  return (
    <>
      <div className="scrollable-div h-[200px] w-[300px] overscroll-auto overflow-y-auto bg-white text-black absolute z-50 top-12 right-[111px] rounded-md shadow-md  divide-dotted transition-all">
        <div className="divide-y-[2px] divide-dotted ">
          {data && data?.length > 0 ? (
            data?.map((item) => {
              return (
                <div key={item}>
                  <Link
                    className="px-2 py-1 flex items-center gap-2 justify-between cursor-pointer hover:bg-gray-200"
                    to={
                      `/san-pham/` +
                      item._id +
                      `?category_id=${item.category_id}`
                    }
                  >
                    <h4 className="text-nowrap overflow-hidden w-[240px] text-ellipsis text-[14px] text-gray-600">
                      {item?.productName}
                    </h4>
                    <Avatar
                      sx={{ width: 30, height: 30 }}
                      alt="Remy Sharp"
                      src={item?.image.split(",")[0]}
                    />
                  </Link>
                </div>
              );
            })
          ) : (
            <div className="p-4 mt-4 justify-center text-center">
              Không có kết quả nào
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ModelSearch;
