import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const AdminLogin = () => {
  const [visible, setVisible] = useState(false)
  const visibleHandler = () => {
        setVisible(!visible)
    }
  return (
    <div>
      <div className='w-full h-16 bg-bodyColor'>
        <h3 className='text-2xl uppercase font-bold text-designColor px-5 py-4'> InterGalatic Store </h3>
      </div>

      <div className='flex items-center justify-center max-w-7xl mx-auto'>
        <form className='w-1/2 border border-gray-200 rounded-md p-4 my-10 px-10 py-10 shadow-md'>
          <h1 className='font-bold text-xl mb-5'> Admin Login </h1>
          <div className='my-5'>
            <Label htmlfor='email'>Email</Label>
            <Input type='email' className='w-full p-2 border border-gray-300 rounded-md' />
          </div>
          <div className='my-5'>
            <Label htmlfor='password'>Password</Label>
            <div className='flex items-center justify-center'>
              <Input type={visible ? 'text' : 'password' }placeholder='Password' name='studentId'/>
                {
                  visible ? (
                    <span className='w-12 h-12 flex items-center justify-center rounded-md' onClick={visibleHandler}><Eye /></span>
                  ) : (
                    <span className='w-12 h-12 flex items-center justify-center rounded-md' onClick={visibleHandler}><EyeOff /></span>
                  )
                }
            </div>
          </div>
          <Link to='/admin/dashboard'>
            <Button className='w-full p-2 my-5 bg-designColor rounded-md text-black font-bold'>Login</Button>
          </Link>
        </form>
      </div>
    </div>
  )
}

export default AdminLogin