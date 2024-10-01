import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import useGetAllPlanetOrder from '@/hooks/useGetAllPlanetOrder'
import { useSelector } from 'react-redux'

const PlanetListOrderSection = () => {
  const user = useSelector(store => store.planet.user)
  useGetAllPlanetOrder(user._id)
  
  return (
    <div className='w-full h-full p-3'>
        <div className='flex flex-col gap-5 p-5 border rounded-md shadow-md'>
          <div className='flex items-center justify-between gap-5'>
            <h1 className='text-lg font-bold font-titleFonts'>Orders</h1>
            <Input type='text' className='w-2/5' placeholder='Enter Product Name or Product ID' />
          </div>
          <hr className='my-2'/>
          <div className='w-full'>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead class>S.No</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Mobile</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Product Count</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>1</TableCell>
                        <TableCell>Harsh Solanki</TableCell>
                        <TableCell>1234567890</TableCell>
                        <TableCell>9Ys9i@example.com</TableCell>
                        <TableCell>5</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>1</TableCell>
                        <TableCell>Harsh Solanki</TableCell>
                        <TableCell>1234567890</TableCell>
                        <TableCell>9Ys9i@example.com</TableCell>
                        <TableCell>5</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>1</TableCell>
                        <TableCell>Harsh Solanki</TableCell>
                        <TableCell>1234567890</TableCell>
                        <TableCell>9Ys9i@example.com</TableCell>
                        <TableCell>5</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>1</TableCell>
                        <TableCell>Harsh Solanki</TableCell>
                        <TableCell>1234567890</TableCell>
                        <TableCell>9Ys9i@example.com</TableCell>
                        <TableCell>5</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
        </div>
    </div>
  )
}

export default PlanetListOrderSection