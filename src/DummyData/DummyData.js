import companyLogo from "../assets/images/company-logo.png";
import {
  AccountBalanceWallet,
  LocalMall,
  Dashboard,
  BarChart,
} from "@material-ui/icons/";
const banks = [
  "Stanbic Bank",
  "First Atlantic",
  "Ecobank",
  "Cal Bank",
  "First National Bank",
];
const transactionTypes = ["Sell", "Buy"];

const messages = [
  {
    id: "1",
    sender: "Anonymous Buyer",
    message: "Hi, I would like a quote for 16BTCs at a discounted price",
    image: "https://thispersondoesnotexist.com/",
  },
  {
    id: "2",
    sender: "Anonymous Buyer",
    message:
      "Hey anon seller, I would like a quote for 195BTCs at a discounted price",
    image: "https://thispersondoesnotexist.com/",
  },
  {
    id: "3",
    sender: "Anonymous Buyer",
    message:
      "You there, I would like a quote for 135BTCs at a discounted price",
    image: "https://thispersondoesnotexist.com/",
  },
  {
    id: "4",
    sender: "Anonymous Buyer",
    message:
      "I would like to order more, I would like a quote for 158BTCs at a discounted price",
    image: "https://thispersondoesnotexist.com/",
  },
  {
    id: "5",
    sender: "Anonymous Buyer",
    message:
      "Someone recomended you to me a quote for 154BTCs at a discounted price",
    image: "https://thispersondoesnotexist.com/",
  },
];

const navItems = [
  { text: "Overview", icon: Dashboard },
  { text: "Shop", icon: LocalMall },
  { text: "Transactions", icon: BarChart },
  { text: "Wallet", icon: AccountBalanceWallet },
];

const transactions = [
  {
    id: "nsl453tre44",
    title: "Aliexpress",
    description: "Electronic gadget",
    amount: "-$2000.00",
    date: "11 Sept, 2020",
    time: "06:00",
    status: "Successful",
  },
  {
    id: "3kjaklfd4iP",
    title: "Aliexpress",
    description: "Electronic gadget",
    amount: "-$2000.00",
    date: "11 Sept, 2020",
    time: "06:00",
    status: "Failed",
  },
  {
    id: "JJ78teuh6u",
    title: "Aliexpress",
    description: "Electronic gadget",
    amount: "-$2000.00",
    date: "11 Sept, 2020",
    time: "06:00",
    status: "Pending",
  },
  {
    id: "ajh&8731,.mn",
    title: "Aliexpress",
    description: "Electronic gadget",
    amount: "-$2000.00",
    date: "11 Sept, 2020",
    time: "06:00",
    status: "Successful",
  },
];

const transactionVolumeData = [
  "last 7 days",
  "last 30 days",
  "last 90 days",
  "last 6 months",
];

const brandDetails = {
  logo: companyLogo,
  name: "GoPare",
  brief:
    "Irure enim ullamco exercitation incididunt. Irure enim ullamco exercitation incididunt.Irure enim ullamco exercitation incididunt.Irure enim ullamco exercitation incididunt.",
  social: { fb: "", ig: "", wp: "", tt: "" },
  contacts: {
    phone: 123456780,
    email: "someone@exmaple.com",
    address: "some business location, midtown ave.",
  },
  description: "Electronics",
  shopId: "#345244",
};

const products = [
  {
    name: "Sweet apple",
    image:
      "https://medilifefood.com/wp-content/uploads/2019/10/purepng.com-red-appleappleapplesfruitsweet-1701527180174lrnig-930x1024.png",
    description: "Anim ullamco eu exercitation reprehenderit minim.",
    price: 243,
    tiles: {
      first_tile:
        "https://medilifefood.com/wp-content/uploads/2019/10/purepng.com-red-appleappleapplesfruitsweet-1701527180174lrnig-930x1024.png",
    },
    delivery: "24hrs",
  },
  {
    name: "Sweet apple",
    image:
      "https://medilifefood.com/wp-content/uploads/2019/10/purepng.com-red-appleappleapplesfruitsweet-1701527180174lrnig-930x1024.png",
    description: "Anim ullamco eu exercitation reprehenderit minim.",
    price: 243,
    tiles: {
      first_tile:
        "https://medilifefood.com/wp-content/uploads/2019/10/purepng.com-red-appleappleapplesfruitsweet-1701527180174lrnig-930x1024.png",
    },
    delivery: "24hrs",
  },
  {
    name: "Sweet apple",
    image:
      "https://medilifefood.com/wp-content/uploads/2019/10/purepng.com-red-appleappleapplesfruitsweet-1701527180174lrnig-930x1024.png",
    description: "Anim ullamco eu exercitation reprehenderit minim.",
    price: 243,
    tiles: {
      first_tile:
        "https://medilifefood.com/wp-content/uploads/2019/10/purepng.com-red-appleappleapplesfruitsweet-1701527180174lrnig-930x1024.png",
    },
    delivery: "24hrs",
  },
  {
    name: "Sweet apple",
    image:
      "https://medilifefood.com/wp-content/uploads/2019/10/purepng.com-red-appleappleapplesfruitsweet-1701527180174lrnig-930x1024.png",
    description: "Anim ullamco eu exercitation reprehenderit minim.",
    price: 243,
    tiles: {
      first_tile:
        "https://medilifefood.com/wp-content/uploads/2019/10/purepng.com-red-appleappleapplesfruitsweet-1701527180174lrnig-930x1024.png",
    },
    delivery: "24hrs",
  },
  {
    name: "Sweet apple",
    image:
      "https://medilifefood.com/wp-content/uploads/2019/10/purepng.com-red-appleappleapplesfruitsweet-1701527180174lrnig-930x1024.png",
    description: "Anim ullamco eu exercitation reprehenderit minim.",
    price: 243,
    tiles: {
      first_tile:
        "https://medilifefood.com/wp-content/uploads/2019/10/purepng.com-red-appleappleapplesfruitsweet-1701527180174lrnig-930x1024.png",
    },
    delivery: "24hrs",
  },
  {
    name: "Sweet apple",
    image:
      "https://medilifefood.com/wp-content/uploads/2019/10/purepng.com-red-appleappleapplesfruitsweet-1701527180174lrnig-930x1024.png",
    description: "Anim ullamco eu exercitation reprehenderit minim.",
    price: 243,
    tiles: {
      first_tile:
        "https://medilifefood.com/wp-content/uploads/2019/10/purepng.com-red-appleappleapplesfruitsweet-1701527180174lrnig-930x1024.png",
    },
    delivery: "24hrs",
  },
  {
    name: "Sweet apple",
    image:
      "https://medilifefood.com/wp-content/uploads/2019/10/purepng.com-red-appleappleapplesfruitsweet-1701527180174lrnig-930x1024.png",
    description: "Anim ullamco eu exercitation reprehenderit minim.",
    price: 243,
    tiles: {
      first_tile:
        "https://medilifefood.com/wp-content/uploads/2019/10/purepng.com-red-appleappleapplesfruitsweet-1701527180174lrnig-930x1024.png",
    },
    delivery: "24hrs",
  },
  {
    name: "Sweet apple",
    image:
      "https://medilifefood.com/wp-content/uploads/2019/10/purepng.com-red-appleappleapplesfruitsweet-1701527180174lrnig-930x1024.png",
    description: "Anim ullamco eu exercitation reprehenderit minim.",
    price: 243,
    tiles: {
      first_tile:
        "https://medilifefood.com/wp-content/uploads/2019/10/purepng.com-red-appleappleapplesfruitsweet-1701527180174lrnig-930x1024.png",
    },
    delivery: "24hrs",
  },
];

const walletBalance = { escrow: 23434, main: 3453, currency: "GHS" };

const creditCards = [
  {
    name: "Mahmudul Hasan",
    country: "Ghana",
    number: "2334928048",
    date: "09/2020",
    type: "momo",
  },
  {
    name: "Ebenezer Ghanney",
    country: "Ghana",
    number: "353454245454424",
    date: "09/2020",
    cvv: "343",
    type: "bank",
  },
  {
    name: "Ebenezer Ghanney Ebenezer Ghanney me",
    country: "Ghana",
    number: "353454245854424",
    date: "09/2020",
    cvv: "343",
    type: "bank",
  },
];

const dashboardData = {
  growth: 25,
  dayVolume: 23,
  newOrders: 79,
  shipped: 89,
  delivered: 90,
  completed: 344,
  transactionStatusData: {
    delivered: {
      data: [
        { x: 1, y: 0 },
        { x: 2, y: 3 },
        { x: 3, y: 4 },
        { x: 4, y: 1 },
        { x: 5, y: 3 },
        { x: 6, y: 1 },
        { x: 7, y: 0 },
      ],
      total: 16,
    },
    completed: {
      data: [
        { x: 1, y: 0 },
        { x: 2, y: 1 },
        { x: 3, y: 3 },
        { x: 4, y: 1 },
        { x: 5, y: 3 },
        { x: 6, y: 1 },
        { x: 7, y: 0 },
      ],
      total: 76,
    },
    shipped: {
      data: [
        { x: 1, y: 0 },
        { x: 2, y: 3 },
        { x: 3, y: 4 },
        { x: 4, y: 1 },
        { x: 5, y: 3 },
        { x: 6, y: 1 },
        { x: 7, y: 0 },
      ],
      total: 69,
    },
  },

  activityData: [
    { x: 1, y: 1 },
    { x: 2, y: 3 },
    { x: 3, y: 2 },
    { x: 4, y: 2 },
    { x: 5, y: 2 },
    { x: 6, y: 1 },
    { x: 7, y: 2 },
  ],

  paymentLinkVisitsData: {
    day: 54,
    week: 178,
    month: 2024,
  },
  transactionVolume: [
    { percent: 80, label: "Sun" },
    { percent: 95, label: "Mon" },
    { percent: 5, label: "Tue" },
    { percent: 30, label: "Wed" },
    { percent: 30, label: "Thur" },
    { percent: 70, label: "Fri" },
    { percent: 60, label: "Fri" },
  ],
};

const purchaseSummaryData = {
  item: "Sweet Apple",
  itemCost: 100,
  deliveryCharge: 5,
  totalCost: 105,
};

const profileInfo = {
  firstName: "Ebenezer",
  lastName: "Ghanney",
  otherName: "",
  dateOfBirth: "25/09/1990",
  username: "Ebenezer Ghanney",
  phone: "0123456789",
  email: "someone@example.com",
  profilePhoto: "http",
  profileComplete: false,
  profilePercent: 60,
};

const shopsData = [
  {
    id: "ihqwiore2iu0sdcu8",
    name: "GoPare",
  },
  {
    id: "ie28I3i4r9fn48",
    name: "SanAndres",
  },
];

export const countryCodes = ["+233", "+234", "+255", "+225"];

export {
  messages,
  banks,
  products,
  navItems,
  transactions,
  transactionTypes,
  purchaseSummaryData,
  shopsData,
  walletBalance,
  creditCards,
  dashboardData,
  transactionVolumeData,
  profileInfo,
  brandDetails,
};
