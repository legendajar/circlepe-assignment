import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Power, Settings2 } from "lucide-react"
import { Link } from "react-router-dom"

const Navbar = () => {
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
                <div className='mx-5'>
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
                                        <Link>
                                            <div className='flex items-center justify-center gap-4'>
                                                <Power /> Logout
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar