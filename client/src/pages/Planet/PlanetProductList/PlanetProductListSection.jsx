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
  const productList = useSelector(store => store.product.productListByPlanet)
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
                        <TableHead className='font-bold text-black text-center'>Price</TableHead>
                        <TableHead className='font-bold text-black text-center'>Quantity</TableHead>
                        <TableHead className='font-bold text-black text-center'>category</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        productList && productList.length > 0 ? 
                        (
                            productList.map((product, index) => (
                                <TableRow key={index}>
                                    <TableCell className='text-left'>{index + 1}</TableCell>
                                    <TableCell className='text-center'>{product.name}</TableCell>
                                    <TableCell className='text-center'>{product.price}</TableCell>
                                    <TableCell className='text-center'>{product.quantity}</TableCell>
                                    <TableCell className='text-center'>{product.category}</TableCell>
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