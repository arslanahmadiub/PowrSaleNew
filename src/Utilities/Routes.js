import Wallet from "../components/sections/Wallet/Wallet";
import ShopProfileEdit from "../components/sections/Shop/Shop";
import Transactions from "../components/sections/Transactions/Transactions";
import TransactionForm from "../components/Forms/TransactionForm";
import Dashboard from "../components/sections/Dashboard/Dashboard";
import EditProfile from "../components/sections/Profile/ProfileEdit";
import Shop from "../components/sections/Shop/Shop";

export default function () {
  return [
    {
      name: "Wallet",
      path: "/wallet",
      component: Wallet,
    },

    {
      name: "Transactions",
      path: "/transactions",
      component: Transactions,
    },
    {
      name: "Edit Prfile",
      path: "/edit-prfile",
      component: EditProfile,
    },
    {
      name: "Create Transaction",
      path: "/create-transaction",
      component: TransactionForm,
    },
    {
      name: "Shop Profile Edit",
      path: "/shop-profile-edit",
      component: ShopProfileEdit,
    },
    {
      name: "Dashboard",
      path: "/dashboard",
      component: Dashboard,
    },
    // {
    //   name: "Dashboard",
    //   path: "/",
    //   component: Dashboard,
    // },
    {
      name: "Dashboard",
      path: "/overview",
      component: Dashboard,
    },
    {
      name: "Shop",
      path: "/shopPreview",
      component: Shop,
    },
  ];
}
