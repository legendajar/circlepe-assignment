import { createBrowserRouter, RouterProvider } from "react-router-dom"
import AdminLogin from "./pages/Admin/AdminLogin/AdminLogin"
import AdminDashboard from "./pages/Admin/AdminDashboard/AdminDashboard";
import ListPlanet from "./pages/Admin/ListPlanet/ListPlanet";
import FindPlanet from "./pages/Admin/FindPlanet/FindPlanet";
import ListSpaceStation from "./pages/Admin/ListSpaceStation/ListSpaceStation";
import FindSpaceStation from "./pages/Admin/FindSpaceStation/FindSpaceStation";
import ListProduct from "./pages/Admin/ListProduct/ListProduct";
import FindProduct from "./pages/Admin/FindProduct/FindProduct";
import ListTransaction from "./pages/Admin/ListTransaction/ListTransaction";
import FindTransaction from "./pages/Admin/FindTransaction.jsx/FindTransaction";
import FindOrder from "./pages/Admin/FindOrder/FindOrder";
import ListOrder from "./pages/Admin/ListOrder/ListOrder";
import Dashboard from "./pages/Planet/Dashboard/Dashboard";
import AddProduct from "./pages/Planet/AddProduct/AddProduct";
import PlanetListOrder from "./pages/Planet/PlanetListOrder/PlanetListOrder";
import PlanetProductList from "./pages/Planet/PlanetProductList/PlanetProductList";
import Home from "./pages/SpaceStations/Home/Home";
import ViewProductPage from "./pages/SpaceStations/ViewProductPage/ViewProductPage";
import OrderPage from "./pages/SpaceStations/OrderPage/OrderPage";
import ViewOrdersPage from "./pages/SpaceStations/ViewOrderPage/ViewOrderPage";


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
    element: <PlanetProductList />
  },

  {
    path: '/planet/order/view',
    element: <PlanetListOrder />
  },

  // Space Station Route
  {
    path: '/',
    element: <Home />
  },

  {
    path:'/product/:id',
    element: <ViewProductPage />
  },

  {
    path: '/order',
    element: <OrderPage />
  },

  {
    path: '/order/view/:id',
    element: <ViewOrdersPage /> 
  }

]);

function App() {
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  )
}

export default App
