const NotiSibar = () => {
  return (
    <>
      <div
        className="model-noti bg-white/95 text-black shadow-lg  backdrop-blur-[2px]
           fixed top-[80px] right-0 w-[400px] z-[10000] h-[100vh] "
      >
        <div>
          <div className="font-semibold border-b-[1px] border-gray-300 p-4">
            Danh sách thông báo{" "}
          </div>
          {/* list thong bao  */}
          <div className="flex gap-4 py-4 border-b-[1px] border-gray-300">
            <div className="list-read flex items-center gap-2 text-[14px] font-semibold">
              <div>Tất cả</div>
              <div className="w-[30px] h-[30px] rounded-md bg-black text-white flex items-center justify-center">
                12
              </div>
            </div>
            <div className="flex items-center gap-2 text-[14px] font-semibold">
              <div>Đã đọc</div>
              <div className="w-[30px] h-[30px] rounded-md bg-[#dbe8ea] text-[#0c6f9f] flex items-center justify-center">
                12
              </div>
            </div>
            <div className="flex items-center gap-2 text-[14px] font-semibold">
              <div>Chưa đọc</div>
              <div className="w-[30px] h-[30px] rounded-md bg-[#cbe4d6] text-[#128d57] flex items-center justify-center">
                12
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotiSibar;
