import { useEffect, useState } from "react";
import Header from "./Header";
import NotiSibar from "./NotiSibar";
import Sidebar from "./Sidebar";
import { useOnOutsideClick } from "../hook/use-outside";
import AlertCmp from "../components/alert/Alert";
import { useSelector, useDispatch } from "react-redux";
import { resetMessage } from "../feature/homeSlice";

// eslint-disable-next-line react/prop-types
function Layout({ children }) {
  const dispatch = useDispatch();
  const type = useSelector((state) => state.home.type);
  const showMess = useSelector((state) => state.home.showMess);
  const message = useSelector((state) => state.home.message);
  const [showNoti, setShowNoti] = useState(false);
  const { innerBorderRef } = useOnOutsideClick(() => setShowNoti(false));
  useEffect(() => {
    let timeoutId;
    if (showMess) {
      timeoutId = setTimeout(() => {
        dispatch(resetMessage());
      }, 3000);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [showMess]);

  return (
    <div>
      <Sidebar />
      <Header setShowNoti={setShowNoti} />
      <div ref={innerBorderRef}>{showNoti && <NotiSibar />}</div>
      <div className="mt-[80px] ml-[200px] p-4">{children}</div>
      {showMess && (
        <div className="z-[1000000]  fixed right-4 bottom-10">
          <div className="w-[400px]">
            <AlertCmp type={type} message={message} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Layout;
