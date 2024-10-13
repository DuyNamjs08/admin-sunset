/* eslint-disable react/prop-types */
import { Box, CircularProgress } from "@mui/material";
import { BaseModal } from "./BaseModel";

export const CommonLoadingModal = ({ isLoadingModalOpen }) => {
  return (
    <BaseModal isModalOpen={isLoadingModalOpen} onClose={() => {}}>
      <div
        data-modal-name="loading-modal"
        className="flex h-40 w-80 flex-col items-center"
      >
        <div className="p-6 text-xl font-bold">Xin chờ</div>
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      </div>
    </BaseModal>
  );
};
