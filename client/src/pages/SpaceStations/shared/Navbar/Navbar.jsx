import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { setUser } from "@/redux/spaceStationSlice";
import { SPACE_STATION_API_END_POINT } from "@/utils/URLS.js";
import axios from "axios";
import {
  ChevronsDown,
  MenuIcon,
  Power,
  Settings2,
  ShoppingCartIcon,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.spaceStation);
  const { cartItems } = useSelector((store) => store.cart);
  const [menu, setMenu] = useState(false);

  const menuHandler = () => {
    setMenu(!menu);
  };

  const logoutHandler = async () => {
    try {
      const res = await axios.post(`${SPACE_STATION_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        localStorage.removeItem("token");
        navigate("/login");
        dispatch(setUser(null));
      }
    } catch (err) {
      console.log("Logout Error: ", err);
    }
  };
  return (
    <div>
      <div className="w-full h-16 bg-bodyColor">
        <div className="flex items-center justify-between gap-10">
          <h3 className="text-sm sm:text-md smd:text-xl lg:text-2xl uppercase font-bold text-designColor px-5 py-4">
            <Link to="/">InterGalatic Store</Link>
          </h3>

          <div className="md:block hidden">
            <ul className="flex items-center justify-between gap-5 text-designColor font-titleFonts">
              <Link to="/">
                <li className="font-lg font-bold">HOME</li>
              </Link>
              <Link to="/">
                <li className="font-lg font-bold">ALL</li>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger className="font-lg font-bold flex items-center">
                  Planets <ChevronsDown className="ml-1" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-bodyColor text-white">
                  <DropdownMenuItem className="hover:bg-designColor hover:text-black my-2">
                    Mercury
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-designColor hover:text-black my-2">
                    Venus
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-designColor hover:text-black my-2">
                    Earth
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-designColor hover:text-black my-2">
                    Mars
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-designColor hover:text-black my-2">
                    Jupiter
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-designColor hover:text-black my-2">
                    Saturn
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-designColor hover:text-black my-2">
                    Uranus
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-designColor hover:text-black my-2">
                    Neptune
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-designColor hover:text-black my-2">
                    Pluto
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </ul>
          </div>

          <div className="md:block hidden">
            {user ? (
              <div className="mx-5 flex items-center gap-5">
                <Popover>
                  <PopoverTrigger asChild>
                    <Avatar>
                      <AvatarImage
                        src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
                        alt="Avatar Image"
                      />
                    </Avatar>
                  </PopoverTrigger>
                  <PopoverContent className="my-4 z-[1100] bg-bodyColor">
                    <div className="flex gap-4 space-y-2">
                      <div className="flex flex-col gap-5 text-gray-600">
                        <div className="flex w-fit items-center gap-2 cursor-pointer group hover:text-designColor">
                          <Link>
                            <div className="flex items-center justify-center gap-4 text-white hover:text-designColor">
                              <Settings2 /> Profile
                            </div>
                          </Link>
                        </div>
                        <div className="flex w-fit items-center gap-2 cursor-pointer group hover:text-red-500">
                          <div
                            onClick={logoutHandler}
                            className="text-white flex items-center justify-center gap-4 hover:text-red-500"
                          >
                            <Power /> Logout
                          </div>
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            ) : (
              <div className="mx-5 flex gap-5 items-center">
                <div className="relative">
                  <Link to="/cart">
                    <ShoppingCartIcon className="w-8 h-8 text-white" />
                    <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold transform translate-x-1/2 -translate-y-1/2">
                      {cartItems.length}
                    </span>
                  </Link>
                </div>
                <Link to="/register">
                  <Button className="px-4 py-2 bg-designColor text-black font-bold rounded-md hover:text-white">
                    Register
                  </Button>
                </Link>
                <Link to="/login">
                  <Button className="px-4 py-2 bg-designColor text-black font-bold rounded-md hover:text-white">
                    Login
                  </Button>
                </Link>
              </div>
            )}
          </div>

          <div className="md:hidden block">
            <div className="flex">
              <div className="relative">
                <Link to="/cart">
                  <ShoppingCartIcon className="w-8 h-8 text-white" />
                  <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold transform translate-x-1/2 -translate-y-1/2">
                    {cartItems.length}
                  </span>
                </Link>
              </div>
              <MenuIcon onClick={menuHandler} className="text-white mx-5" />
            </div>
          </div>
        </div>
      </div>
      <div
        className={`${
          menu ? "block" : "hidden"
        } w-full h-full border bg-bodyColor transition duration-1000 ease-in-out`}
      >
        <div className="mb-20">
          {/* Menu Items */}
          <ul className="text-white flex flex-col items-center gap-5">
            <li className="w-full px-10 py-3 hover:bg-designColor hover:text-black">
              <Link to="/">Home</Link>
            </li>
            <li className="w-full px-10 py-3 hover:bg-designColor hover:text-black">
              <Link to="/">All</Link>
            </li>
            <li className="w-full px-10 py-3 hover:bg-designColor hover:text-black">
              <Link to="/planets">Planets</Link>
            </li>

            {user && (
              <li className="w-full flex items-center justify-center px-10 py-3">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="hover:bg-designColor hover:text-black flex items-center gap-3 py-3 px-5">
                      {/* User Avatar */}
                      <Avatar>
                        <AvatarImage
                          src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
                          alt="User Avatar"
                          className="w-10 h-10 rounded-full"
                        />
                      </Avatar>
                    </AccordionTrigger>
                    <AccordionContent className="bg-gray-800">
                      <ul className="flex flex-col">
                        <li className="w-full px-10 py-3 hover:bg-designColor hover:text-black">
                          <Link to="/profile">Profile</Link>
                        </li>
                        <li
                          className="w-full px-10 py-3 text-red-500 hover:text-black hover:bg-designColor cursor-pointer"
                          onClick={logoutHandler}
                        >
                          Logout
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
