/* eslint-disable react/prop-types */
import { Alert, AlertTitle } from "@mui/material";

const AlertCmp = ({ type, message }) => {
  if (type === "success") {
    return (
      <>
        <Alert severity="success" sx={{ lineHeight: 3 }}>
          <AlertTitle>
            <div className="font-semibold text-[#128d57]">Thành công</div>
          </AlertTitle>
          {message}
        </Alert>
      </>
    );
  } else if (type === "error") {
    return (
      <>
        <Alert severity="error" sx={{ lineHeight: 3 }}>
          <AlertTitle>
            <div className="font-semibold text-[#c33223]">Thất bại</div>
          </AlertTitle>
          {message}
        </Alert>
      </>
    );
  } else {
    return "";
  }
};

export default AlertCmp;
