import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PLANET_API_END_POINT } from '@/utils/URLS.js'
import axios from 'axios'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const PlanetRegister = () => {
    const [visible, setVisible] = useState(false)
    const [confirmVisible, setConfirmVisible] = useState(false)
    const [input, setInput] = useState({
        name: "",
        email: "",
        mobile: null,
        password: "",
        confirmPassword: ""
    })
    const visibleHandler = () => {
      setVisible(!visible)
    }

    const confirmPasswordHandler = () => {
      setConfirmVisible(!confirmVisible)
    }

    const changeInputHandler = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const navigate = useNavigate()

    const submitHandler = async(e) => {
        e.preventDefault()
        
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("email", input.email);
        formData.append("mobile", input.mobile);
        formData.append("password", input.password);
        formData.append("confirmPassword", input.confirmPassword);

        try {
            const res = await axios.post(`${PLANET_API_END_POINT}/register`, formData, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true
            })

            if (res.data.success) {
                navigate('/planet/login')
                alert(res.data.message)
            }
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div>
            <div className='w-full h-16 bg-bodyColor'>
                <h3 className='text-2xl uppercase font-bold text-designColor px-5 py-4'>InterGalactic Store</h3>
            </div>
            <div className='flex items-center justify-center max-w-9xl mx-auto'>
                <form onSubmit={submitHandler} className='w-full max-w-md border border-gray-200 rounded-md p-4 my-10 px-4 py-6 shadow-md sm'>
                    <h1 className='font-bold text-xl mb-5'> Planet Register </h1>
                    <div className="my-5">
                        <Label htmlFor='name'>Name</Label>
                        <Input type='text' className='w-full p-2 border border-gray-300 rounded-md' placeholder='Name' name='name' value={input.name} onChange={changeInputHandler} />
                    </div>
                    <div className="my-5">
                        <Label htmlFor='email'>Email</Label>
                        <Input type='email' className='w-full p-2 border border-gray-300 rounded-md' placeholder='Email' name='email' value={input.email} onChange={changeInputHandler} />
                    </div>
                    <div className="my-5">
                        <Label htmlFor='mobile'>Mobile</Label>
                        <Input type='number' className='w-full p-2 border border-gray-300 rounded-md' placeholder='Mobile' name='mobile' value={input.mobile} onChange={changeInputHandler} />
                    </div>
                    <div className='my-5'>
                        <Label htmlFor='password'>Password</Label>
                        <div className='flex items-center justify-between'>
                            <Input 
                                type={visible ? 'text' : 'password'} 
                                placeholder='Password' 
                                name='password'  
                                className='w-full p-2 border border-gray-300 rounded-md' value={input.password} onChange={changeInputHandler}
                            />
                            {
                                visible ? (
                                <span className='w-12 h-12 flex items-center justify-center rounded-md cursor-pointer' onClick={visibleHandler}><Eye /></span>
                                ) : (
                                <span className='w-12 h-12 flex items-center justify-center rounded-md cursor-pointer' onClick={visibleHandler}><EyeOff /></span>
                                )
                            }
                        </div>
                    </div>
                    <div className='my-5'>
                        <Label htmlFor='confirmPassword'>Confirm Password</Label>
                        <div className='flex items-center justify-between'>
                            <Input 
                                type={confirmVisible ? 'text' : 'password'} 
                                placeholder='Confirm Password' 
                                name='confirmPassword'  
                                className='w-full p-2 border border-gray-300 rounded-md' value={input.confirmPassword} onChange={changeInputHandler}
                            />
                            {
                                confirmVisible ? (
                                <span className='w-12 h-12 flex items-center justify-center rounded-md cursor-pointer' onClick={confirmPasswordHandler}><Eye /></span>
                                ) : (
                                <span className='w-12 h-12 flex items-center justify-center rounded-md cursor-pointer' onClick={confirmPasswordHandler}><EyeOff /></span>
                                )
                            }
                        </div>
                    </div>
                    <Button className='w-full p-2 my-5 bg-designColor rounded-md hover:text-white text-black font-bold'>Add Planet</Button>
                </form>
            </div>
        </div>
    )
}

export default PlanetRegister