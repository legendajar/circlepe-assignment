import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { setUser } from '@/redux/adminSlice'
import { ADMIN_API_END_POINT } from '@/utils/URLS'
import axios from 'axios'
import { Eye, EyeOff } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

const AdminLogin = () => {
  const [visible, setVisible] = useState(false)
  const visibleHandler = () => {
    setVisible(!visible)
  }
  const [input, setInput] = useState({
    email: "",
    password: ""
  })

  const changeInputHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(store => store.admin)

  const submitHandler = async(e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", input.email);
    formData.append("password", input.password);

    try {
      const res = await axios.post(`${ADMIN_API_END_POINT}/login`, formData , {
        headers: {
          "Content-Type": "application/json",
        },
      })

      if(res.data.success) {
        dispatch(setUser(res.data.user))
        navigate("/admin/dashboard")
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (user) {
      navigate("/admin/dashboard")
      return;
    }
  }, [])

  return (
    <div>
  <div className='w-full h-16 bg-bodyColor'>
    <h3 className='text-2xl uppercase font-bold text-designColor px-5 py-4'>InterGalactic Store</h3>
  </div>

  <div className='flex items-center justify-center max-w-7xl mx-auto'>
    <form 
      onSubmit={submitHandler} 
      className='w-full max-w-md border border-gray-200 rounded-md p-4 my-10 px-4 py-6 shadow-md
        sm:w-smd 
        md:w-sml 
        lg:w-md
      '
    >
      <h1 className='font-bold text-xl mb-5'>Admin Login</h1>
      <div className='my-5'>
        <Label htmlFor='email'>Email</Label>
        <Input 
          type='email' 
          className='w-full p-2 border border-gray-300 rounded-md' 
          placeholder='Email' 
          name='email' 
          value={input.email} 
          onChange={changeInputHandler} 
        />
      </div>
      <div className='my-5'>
        <Label htmlFor='password'>Password</Label>
        <div className='flex items-center justify-between'>
          <Input 
            type={visible ? 'text' : 'password'} 
            placeholder='Password' 
            name='password' 
            value={input.password} 
            onChange={changeInputHandler} 
            className='w-full p-2 border border-gray-300 rounded-md'
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
      <Button className='w-full p-2 my-5 bg-designColor rounded-md text-black font-bold'>Login</Button>
    </form>
  </div>
</div>

  )
}

export default AdminLogin