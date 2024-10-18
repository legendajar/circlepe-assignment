import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { setUser } from "@/redux/adminSlice.js";
import { ADMIN_API_END_POINT } from "@/utils/URLS";
import axios from "axios";
import { Power, Settings2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.admin);
  const logoutHandler = async () => {
    try {
      const res = await axios.post(`${ADMIN_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        localStorage.removeItem("token");
        dispatch(setUser(null));
        navigate("/admin/login");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <div className="fixed top-0 left-0 right-0 w-full h-16 bg-bodyColor z-50">
        <div className="flex justify-between items-center">
          <h3 className="text-lg mdl:text-2xl uppercase font-bold text-designColor px-5 py-4">
            InterGalatic Store
          </h3>
          <div className="mx-5">
            <Popover>
              <PopoverTrigger asChild>
                <Avatar>
                  <AvatarImage
                    src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
                    alt="Avatar Image"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="my-4 z-[1100]">
                <div className="flex gap-4 space-y-2">
                  <div className="flex flex-col gap-5 text-gray-600">
                    <div className="flex w-fit items-center gap-2 cursor-pointer group hover:text-designColor">
                      <Link>
                        <div className="flex items-center justify-center gap-4">
                          <Settings2 /> Profile
                        </div>
                      </Link>
                    </div>
                    <div className="flex w-fit items-center gap-2 cursor-pointer group hover:text-red-500">
                      <div
                        className="flex items-center justify-center gap-4"
                        onClick={logoutHandler}
                      >
                        <Power /> Logout
                      </div>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
