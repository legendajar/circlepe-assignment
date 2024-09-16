import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { setUser } from "@/redux/spaceStationSlice"
import { SPACE_STATION_API_END_POINT } from "@/utils/URLS.js"
import axios from "axios"
import { Power, Settings2, ShoppingCartIcon } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector(store => store.spaceStation);
    const { cartItems } = useSelector(store => store.cart)
    const logoutHandler = async () => {
        try {
            const res = await axios.post(`${SPACE_STATION_API_END_POINT}/logout`, { withCredentials: true })
            if (res.data.success) {
                localStorage.removeItem("token")
                navigate('/login')
                dispatch(setUser(null))
            }
        } catch (err) {
            console.log("Logout Error: ", err)
        }
    }
  return (
    <div>
        <div className='w-full h-16 bg-bodyColor'>
            <div className="flex justify-between items-center">
                <h3 className='text-2xl uppercase font-bold text-designColor px-5 py-4'> InterGalatic Store </h3>
                <div>
                    <ul className='flex items-center justify-between gap-5 text-designColor'>
                        <li className='font-lg font-bold'>Home</li>
                        <li className='font-lg font-bold'>Mars</li>
                        <li className='font-lg font-bold'>Venus</li>
                        <li className='font-lg font-bold'>Earth</li>
                    </ul>
                </div>
                {
                    user ? 
                    (
                        <div className='mx-5 flex items-center gap-5'>
                            <div className="relative">
                                <ShoppingCartIcon className="w-8 h-8 text-white" />
                                <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold transform translate-x-1/2 -translate-y-1/2">
                                    {cartItems.length}
                                </span>
                            </div>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar>
                                        <AvatarImage src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" alt="Avatar Image" />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="my-4 z-[1100]">
                                    <div className="flex gap-4 space-y-2">
                                        <div className="flex flex-col gap-5 text-gray-600">
                                            <div className="flex w-fit items-center gap-2 cursor-pointer group hover:text-designColor">
                                                <Link>
                                                    <div className='flex items-center justify-center gap-4'>
                                                        <Settings2 /> Profile
                                                    </div>
                                                </Link>
                                            </div>
                                            <div className="flex w-fit items-center gap-2 cursor-pointer group hover:text-red-500">
                                                <div onClick={logoutHandler} className='flex items-center justify-center gap-4'>
                                                    <Power /> Logout
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </div>
                    ) : 
                    (
                        <div className='mx-5 flex gap-5 items-center'>
                            <div className="relative">
                                <Link to=''>
                                    <ShoppingCartIcon className="w-8 h-8 text-white" />
                                    <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold transform translate-x-1/2 -translate-y-1/2">
                                        {cartItems.length}
                                    </span>
                                </Link>
                            </div>
                            <Link to="/register">
                                <Button className='px-4 py-2 bg-designColor text-black font-bold rounded-md hover:text-white'>Register</Button>
                            </Link>
                            <Link to="/login">
                                <Button className='px-4 py-2 bg-designColor text-black font-bold rounded-md hover:text-white'>Login</Button>
                            </Link>
                        </div>
                    )
                }
                
            </div>
        </div>
    </div>
  )
}

export default Navbar