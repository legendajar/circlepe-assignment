import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SPACE_STATION_API_END_POINT } from "@/utils/URLS.js";
import { setUser } from "@/redux/spaceStationSlice";

const Login = () => {
    const [visible, setVisible] = useState(false)
    const [input, setInput] = useState({
        email: "",
        password: ""
    })
    const visibleHandler = () => {
        setVisible(!visible)
    }

    const changeInputHandler = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const { user } = useSelector(store => store.spaceStation)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const submitHandler = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append("email", input.email);
        formData.append("password", input.password);

        try {
            const res = await axios.post(`${SPACE_STATION_API_END_POINT}/login`, formData , {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true
            })

            if(res.data.success) {
                dispatch(setUser(res.data.user))
                navigate('/')
                alert(res.data.message)
            }
        } catch (err) {
            console.log(err)
        }

    }
    return (
        <div>
          <div className="w-full h-16 bg-bodyColor">
            <h3 className="text-2xl uppercase font-bold text-designColor px-5 py-4">
              InterGalactic Store
            </h3>
          </div>
    
          <div className="flex items-center justify-center max-w-7xl mx-auto">
            <form
                className="w-full max-w-md border border-gray-200 rounded-md p-4 my-10 px-4 py-6 shadow-md
                sm:w-smd 
                md:w-sml 
                lg:w-md
                "
                onSubmit={submitHandler}
            >
              <h1 className="font-bold text-xl mb-5">Login</h1>
              <div className="my-5">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Email"
                  name="email"
                  value={input.email}
                  onChange={changeInputHandler}
                />
              </div>
              <div className="my-5">
                <Label htmlFor="password">Password</Label>
                <div className="flex items-center justify-between">
                  <Input
                    type={visible ? "text" : "password"}
                    placeholder="Password"
                    name="password"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={input.password}
                    onChange={changeInputHandler}
                  />
                  {visible ? (
                    <span
                      className="w-12 h-12 flex items-center justify-center rounded-md cursor-pointer"
                      onClick={visibleHandler}
                    >
                      <Eye />
                    </span>
                  ) : (
                    <span
                      className="w-12 h-12 flex items-center justify-center rounded-md cursor-pointer"
                      onClick={visibleHandler}
                    >
                      <EyeOff />
                    </span>
                  )}
                </div>
              </div>
              <Button className="w-full p-2 my-5 bg-designColor rounded-md text-black font-bold">
                Login
              </Button>
            </form>
          </div>
        </div>
      );
}

export default Login