import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import axios from "axios";
import { Power, Settings2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { PLANET_API_END_POINT } from '@/utils/URLS.js';
import { setUser } from "@/redux/planetSlice.js";
import { useDispatch } from "react-redux";

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Logout handler function
    const logoutHandler = async () => {
        try {
            const res = await axios.post(`${PLANET_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                localStorage.removeItem("token");
                dispatch(setUser(null));
                navigate("/planet/login");
            }
        } catch (err) {
            console.log("Logout error:", err);
        }
    };

    return (
        <div className='w-full h-16 bg-bodyColor'>
            <div className="flex justify-between items-center">
                <h3 className='text-2xl uppercase font-bold text-designColor px-5 py-4'>
                    InterGalactic Store
                </h3>
                <div className='mx-5'>
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
                            <div className="flex flex-col gap-5 text-gray-600">
                                {/* Profile Link */}
                                <div className="flex w-fit items-center gap-2 cursor-pointer group hover:text-designColor">
                                    <Link to="/profile">  {/* Ensure a valid `to` attribute */}
                                        <div className='flex items-center justify-center gap-4'>
                                            <Settings2 /> Profile
                                        </div>
                                    </Link>
                                </div>

                                {/* Logout */}
                                <div 
                                    onClick={logoutHandler} 
                                    className="flex w-fit items-center gap-2 cursor-pointer group hover:text-red-500"
                                >
                                    <div className='flex items-center justify-center gap-4'>
                                        <Power /> Logout
                                    </div>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
