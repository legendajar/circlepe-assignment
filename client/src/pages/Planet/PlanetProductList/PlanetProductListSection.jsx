import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import useGetProductByPlanet from '@/hooks/useGetProductByPlanet'
import { useSelector } from 'react-redux'

const PlanetProductListSection = () => {
  const {setUser} = useSelector(store => store.planet)
  useGetProductByPlanet(setUser._id)
  const {planetProductList} = useSelector(store => store.product)
  return (
    <div className='w-full h-full p-3'>
        <div className='flex flex-col gap-5 p-5 border rounded-md shadow-md'>
          <div className='flex items-center justify-between gap-5'>
            <h1 className='text-lg font-bold font-titleFonts'>Products</h1>
            <Input type='text' className='w-2/5' placeholder='Enter Product Name or Product ID' />
          </div>
          <hr className='my-2'/>
          <div className='w-full'>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className='font-bold text-black text-left'>S.No</TableHead>
                        <TableHead className='font-bold text-black text-center'>Name</TableHead>
                        <TableHead className='font-bold text-black text-center'>Mobile</TableHead>
                        <TableHead className='font-bold text-black text-center'>Email</TableHead>
                        <TableHead className='font-bold text-black text-center'>Product Count</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        planetProductList && planetProductList.length > 0 ? 
                        (
                            planetProductList.map((product, index) => (
                                <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>{product.mobile}</TableCell>
                                    <TableCell>{product.email}</TableCell>
                                    <TableCell>{product.count}</TableCell>
                                </TableRow>
                            ))
                        ) : 
                        (
                            <TableRow>
                              <TableCell colSpan={5} className='text-center'>No Data Found </TableCell>
                            </TableRow>
                        )
                    }
                </TableBody>
            </Table>
        </div>
        </div>
    </div>
  )
}

export default PlanetProductListSection