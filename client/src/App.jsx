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
import PlanetLogin from "./pages/Planet/PlanetLogin/PlanetLogin";
import PlanetRegister from "./pages/Planet/PlanetRegister/PlanetRegister";
import Login from "./pages/SpaceStations/Login/Login";
import Register from "./pages/SpaceStations/Register/register";
import Cart from "./pages/SpaceStations/Cart/Cart";
import PlaceOrder from "./pages/SpaceStations/PlaceOrder/PlaceOrder";
import Verify from "./pages/SpaceStations/Verify/Verify";
import RatingProduct from "./pages/SpaceStations/RatingProduct/RatingProduct";
import ProfilePage from "./pages/SpaceStations/ProfilePage/ProfilePage";
import ResetPassword from "./pages/SpaceStations/ResetPassword/ResetPassword";
import ResetPasswordForm from "./pages/SpaceStations/ResetPassword/ResetPasswordForm";
import OrderDetailsPage from "./pages/Planet/OrderDetailPage/OrderDetailPage";
import UpdateProduct from "./pages/Planet/UpdateProduct/UpdateProduct";
import PlanetProfilePage from "./pages/Admin/PlanetProfilePage/PlanetProfilePage";
import SpaceStationProfilePage from "./pages/Admin/SpaceStationProfilePage/SpaceStationProfilePage";


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
    path: '/admin/planet/:id',
    element: <PlanetProfilePage />
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
    path: '/admin/spacestation/:id',
    element: <SpaceStationProfilePage />
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
    path: '/planet/login',
    element: <PlanetLogin />
  },

  {
    path: '/planet/register',
    element: <PlanetRegister />
  },

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
    path: '/planet/product/update/:id',
    element: <UpdateProduct />
  },

  {
    path: '/planet/order/view',
    element: <PlanetListOrder />
  },

  {
    path:'/planet/order/view/:id',
    element: <OrderDetailsPage />
  },

  // Space Station Route
  {
    path: '/login',
    element: <Login />
  },

  {
    path: '/register',
    element: <Register />
  },

  {
    path: '/',
    element: <Home />
  },

  {
    path:'/product/view/:id',
    element: <ViewProductPage />
  },

  {
    path: '/order',
    element: <OrderPage />
  },

  {
    path: '/order/view/:id',
    element: <ViewOrdersPage /> 
  },

  {
    path: '/cart',
    element: <Cart />
  },

  {
    path: '/order/place',
    element: <PlaceOrder />
  },

  {
    path: '/verify',
    element: <Verify />
  },

  {
    path:'/product/rating/add/:id',
    element: <RatingProduct />
  },

  {
    path: '/spacestation/profile/:id',
    element: <ProfilePage />
  },

  {
    path: '/spacestation/reset/password',
    element: <ResetPassword />
  },

  {
    path: '/spacestation/reset/password/form',
    element: <ResetPasswordForm />
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
