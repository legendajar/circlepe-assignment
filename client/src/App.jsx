import { createBrowserRouter, RouterProvider } from "react-router-dom"
import AdminLogin from "./pages/Admin/AdminLogin/AdminLogin"
import AdminDashboard from "./pages/Admin/AdminDashboard/AdminDashboard";
import ListPlanet from "./pages/Admin/ListPlanet/ListPlanet";
import FindPlanet from "./pages/Admin/FindPlanet/FindPlanet";
import ListSpaceStation from "./pages/Admin/ListSpaceStation/ListSpaceStation";


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
