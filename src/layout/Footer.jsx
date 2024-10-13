const dataFooter1 = [
  { id: "1", path: "/dieu-kien-giao-dich", title: "Điều kiện giao dịch" },
  { id: "2", path: "/chinh-sach-thanh-toan", title: "Chính sách thanh toán" },
  { id: "3", path: "/chinh-sach-giao-hang", title: "Chính sách giao hàng" },
  { id: "4", path: "/chinh-sach-doi-tra", title: "Chính sách đổi trả" },
  { id: "5", path: "/chinh-sach-bao-mat", title: "Chính sách bảo mật" },
];
const dataFooter2 = [
  {
    id: "1",
    path: "",
    title: "Cơ sở 1 : 85 Vũ Trọng Phụng, Thanh Xuân Trung, Thanh Xuân, Hà Nội",
  },
  { id: "2", path: "/gioi-thieu", title: "Giới thiệu" },
  { id: "3", path: "/lien-he", title: "Liên hệ" },
  { id: "4", path: "/mua-hang", title: "Mua hàng" },
  { id: "5", path: "/goc-suc-khoe", title: "Góc sức khỏe" },
  { id: "6", path: "/tin-tuc", title: "Tin tức" },
];

function Footer() {
  return (
    <>
      <footer className="bg-[#e5e5e5] dark:bg-gray-900 pb-10">
        <div className="mx-auto w-full max-w-screen-xl">
          <div className="block md:flex gap-8 px-4 py-6 lg:py-8 ">
            <div className="mb-4 md:mb-0 w-full md:w-2/5">
              <h2 className="mb-6 text-lg font-semibold text-gray-900 uppercase">
                Về nhà thuốc Hapu
              </h2>
              <div className=" text-[14px]  text-[#5e6f88]">
                Chuyên tư vấn, mua bán các loại các loại thuốc kê đơn (Ung thư,
                viêm gan B, C, thuốc điều trị vô sinh hiếm muộn, kháng sinh...)
                và các loại thuốc hiếm khó tìm.Chúng tôi có dịch vụ giao thuốc
                toàn quốc (Hà Nội, Hồ Chí Minh (Sài Gòn), Đà Nẵng, Huế, Nha
                Trang, Cần Thơ...)
              </div>
            </div>
            <div className="w-full md:w-[30%]">
              <h2 className="mb-6 text-lg font-semibold text-gray-900 uppercase">
                Điều khoản
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                {dataFooter1.map((item) => {
                  return (
                    <li key={item.id} className="mb-4 text-[14px]">
                      <a href={item.path} className="hover:underline">
                        {item.title}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="w-full md:w-[30%]">
              <h2 className="mb-6 text-lg font-semibold text-gray-900 uppercase dark:text-white">
                VĂN PHÒNG ĐẠI DIỆN
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                {dataFooter2.map((item) => {
                  return (
                    <li key={item.id} className="mb-4 text-[14px]">
                      <a href={item.path} className="hover:underline">
                        {item.title}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="text-[#5e6f88] text-center text-[14px]">
            <h4 className="mb-3 uppercase">Văn phòng nhà thuốc Hapu</h4>
            <div>
              Trụ sở: 85 Vũ Trọng Phụng, Thanh Xuân Trung, Thanh Xuân, Hà Nội
            </div>
            <div>Điện thoại: 0866621957. Email:cskh@pharmacity.vn</div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
