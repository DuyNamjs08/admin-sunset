/* eslint-disable react/prop-types */
import { useState } from "react";
import { useEffect } from "react";
import SearchCmp from "../components/search/SearchCmp";
import BadgeCmp from "../components/badge/BadgeCmp";
import Avatar from "@mui/material/Avatar";
import ModelAccount from "./model/ModelAccount";
import { useOnOutsideClick } from "../hook/use-outside";
import { useUserId } from "../useQuery/useUser";
import { CommonLoadingModal } from "../components/model/LoadingModel";
import ModelSearch from "./model/ModelSearch";
import { useProductSearch } from "../useQuery/useProducts";

function Header({ setShowNoti }) {
  const [value, setValue] = useState("");
  const [valueSearch, setValueSearch] = useState("");
  const [showModel, setShowModel] = useState(false);
  const [active, setActive] = useState(false);
  const [showModelSearch, setShowModelSearch] = useState(false);
  useEffect(() => {
    setShowModel(false);
  }, [active]);
  const { innerBorderRef } = useOnOutsideClick(() => setShowModel(false));
  const { innerBorderRef: innerBorderRefSearch } = useOnOutsideClick(() =>
    setShowModelSearch(false)
  );

  const { data: dataProduct, isLoading: isLoadingProduct } = useProductSearch({
    offset: 0,
    productName: valueSearch,
  });
  const { data, isLoading } = useUserId(localStorage.getItem("userId") ?? "");
  const handleSearch = () => {
    if (value) {
      setShowModelSearch(true);
      setValueSearch(value);
    }
  };

  return (
    <header>
      <nav className="bg-white border-[#0172bc] border-b-[1px]">
        <div
          className={`bg-[#1B3C73] py-4 px-3 text-white 
           fixed top-0 left-0 w-full z-50  
          }`}
        >
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl gap-2 sm:gap-0">
            <div className="md:w-auto md:mr-0"></div>
            <div className="flex items-center lg:order-2 flex-wrap justify-between w-full md:w-auto relative">
              <div className="flex gap-2 items-center">
                <SearchCmp
                  onClick={handleSearch}
                  value={value}
                  setValue={setValue}
                />
                <div ref={innerBorderRefSearch}>
                  {showModelSearch && (
                    <ModelSearch data={dataProduct?.data ?? []} />
                  )}
                </div>
                <div onClick={() => setShowNoti(true)}>
                  <BadgeCmp />
                </div>
                <div
                  ref={innerBorderRef}
                  className="cursor-pointer"
                  onClick={() => setShowModel(true)}
                >
                  <Avatar alt="Remy Sharp" src={data?.image} />
                  {showModel && (
                    <ModelAccount setActive={setActive} active={active} />
                  )}
                </div>

                {/* orther */}
              </div>
            </div>
          </div>
        </div>
      </nav>
      <CommonLoadingModal isLoadingModalOpen={isLoading || isLoadingProduct} />
    </header>
  );
}

export default Header;
