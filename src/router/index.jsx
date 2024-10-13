import Pages from "../page/index";
const TRANG_CHU = "/";
const GIOI_THIEU = "/gioi-thieu";
const LIEN_HE = "/lien-he";
const SAN_PHAM = "/san-pham";
const TIN_TUC = "/tin-tuc";
const DON_HANG = "/don-hang";
const CHAN_TRANG = "/chan-trang";
const DANH_MUC = "/danh-muc";
const TAI_KHOAN = "/tai-khoan";
const GIAO_DICH = "/giao-dich";
const CHAT = "/chat";
const THONG_TIN = "/thong-tin";

const RouterWeb = [
  {
    id: 1,
    path: TRANG_CHU,
    role: ["1", "2", "3"],
    component: <Pages.MapPage />,
  },
  {
    id: 1999,
    path: THONG_TIN,
    role: ["1", "2", "3"],
    component: <Pages.ThongTin />,
  },
  {
    id: 312311,
    path: CHAT,
    role: ["1", "2", "3"],
    component: <Pages.Chat />,
  },
  {
    id: 414316,
    path: GIAO_DICH,
    role: ["1", "2", "3"],
    component: <Pages.TransacOulet />,
    child: [
      {
        path: "",
        component: <Pages.TransacPage />,
      },
      {
        path: ":id",
        component: <Pages.TransacDetail />,
      },
    ],
  },
  {
    id: 414312,
    path: TAI_KHOAN,
    role: ["1", "2", "3"],
    component: <Pages.AccountOutlet />,
    child: [
      {
        path: "",
        component: <Pages.AccountPage />,
      },
      {
        path: "tao-tai-khoan",
        component: <Pages.AccountCreate />,
      },
      {
        path: ":id",
        component: <Pages.AccountDetails />,
      },
    ],
  },
  {
    id: 2,
    path: GIOI_THIEU,
    component: <Pages.IntroPage />,
    role: ["1", "2", "3"],
  },
  {
    id: 299,
    path: LIEN_HE,
    component: <Pages.ContactPage />,
    role: ["1", "2", "3"],
  },
  {
    id: 298,
    path: TIN_TUC,
    component: <Pages.PostOulet />,
    role: ["1", "2", "3"],
    child: [
      {
        path: "",
        component: <Pages.InforPage />,
      },
      {
        path: ":id",
        component: <Pages.PostDetails />,
      },
    ],
  },
  {
    id: 296,
    path: CHAN_TRANG,
    component: <Pages.Footer />,
    role: ["1", "2", "3"],
  },
  {
    id: 3,
    path: SAN_PHAM,
    role: ["1", "2", "3"],
    component: <Pages.ProductOulet />,
    child: [
      {
        path: "",
        component: <Pages.ProductPage />,
      },
      {
        path: "tao-san-pham",
        component: <Pages.ProductCreate />,
      },
      {
        path: ":id",
        component: <Pages.ProductDetail />,
      },
    ],
  },
  {
    id: 297,
    path: DON_HANG,
    role: ["1", "2", "3"],
    component: <Pages.OrderOulet />,
    child: [
      {
        path: "",
        component: <Pages.OrderPage />,
      },
      {
        path: ":id",
        component: <Pages.OrderDetailPage />,
      },
    ],
  },
  {
    id: 295,
    path: DANH_MUC,
    role: ["1", "2", "3"],
    component: <Pages.CategoryOulet />,
    child: [
      {
        path: "",
        component: <Pages.CategoryPage />,
      },
      {
        path: "tao-thu-muc",
        component: <Pages.CategoryCreate />,
      },
      {
        path: ":id",
        component: <Pages.CategoryDetail />,
      },
    ],
  },
];

export default RouterWeb;
