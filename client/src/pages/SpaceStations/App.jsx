import { createBrowserRouter, RouterProvider } from "react-router-dom"
import AdminLogin from "../Admin/AdminLogin/AdminLogin"
import AdminDashboard from "../Admin/AdminDashboard/AdminDashboard";
import ListPlanet from "../Admin/ListPlanet/ListPlanet";
import FindPlanet from "../Admin/FindPlanet/FindPlanet";
import ListSpaceStation from "../Admin/ListSpaceStation/ListSpaceStation";
import FindSpaceStation from "../Admin/FindSpaceStation/FindSpaceStation";
import ListProduct from "../Admin/ListProduct/ListProduct";
import FindProduct from "../Admin/FindProduct/FindProduct";
import ListTransaction from "../Admin/ListTransaction/ListTransaction";
import FindTransaction from "../Admin/FindTransaction.jsx/FindTransaction";
import FindOrder from "../Admin/FindOrder/FindOrder";
import ListOrder from "../Admin/ListOrder/ListOrder";
import Dashboard from "../Planet/Dashboard/Dashboard";
import AddProduct from "../Planet/AddProduct/AddProduct";
import LIstProduct from "../Planet/ListProduct/LIstProduct";


const appRouter = createBrowserRouter([

  // Admin Routes
  {
    path: "/admin/login",
    element: <AdminLogin />
  },

  {
    path: "/admin/dashboard",
    element: <AdminDashboard />
  },

  {
    path: '/admin/planet/list',
    element: <ListPlanet />
  },

  {
    path: '/admin/planet/find',
    element: <FindPlanet />
  },

  {
    path: '/admin/spacestation/view',
    element: <ListSpaceStation />
  },

  {
    path: '/admin/spacestation/find',
    element: <FindSpaceStation />
  },

  {
    path: '/admin/product/list',
    element: <ListProduct />
  },

  {
    path: '/admin/product/find',
    element: <FindProduct />
  },

  {
    path: '/admin/transaction/list',
    element: <ListTransaction />
  },

  {
    path: '/admin/transaction/find',
    element: <FindTransaction />
  },

  {
    path: '/admin/order/find',
    element: <FindOrder />
  }, 
  
  {
    path: '/admin/order/view',
    element: <ListOrder />
  },

  // Planet Route
  {
    path: '/planet/dashboard',
    element: <Dashboard />
  },

  {
    path: '/planet/product/add',
    element: <AddProduct />
  },

  {
    path: '/planet/product/view',
    element: <LIstProduct />
  },

  {
    path: '/planet/order/view',
    element: <ListOrder />
  }

  // Space Station Route


]);

function App() {
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  )
}

export default App
