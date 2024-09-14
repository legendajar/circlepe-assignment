import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useSelector } from 'react-redux'

const FindOrderSection = () => {
    const {orderList} = useSelector(store => store.order)
  return (
    <div className='w-full h-full'>
        <div className='m-3 border rounded-md shadow-md p-3'>
            <h1 className='text-lg font-titleFonts font-bold'>Find Space Stations</h1>
            <form className='flex items-center gap-4'>
                <div className='my-2'>
                    <Label>Space Station Name</Label>
                    <Input type="text"  />
                </div>

                <div className='my-2'>
                  <Label>Space Station Id</Label>
                  <Input type="text"  />
                </div>

                <Button>Search</Button>
            </form>
            <hr className='my-5'/>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>S.No</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Mobile</TableHead>
                        <TableHead>Product Count</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        orderList && orderList.length > 0 ?
                        (
                            orderList.map((order, index) => (
                                <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{order.name}</TableCell>
                                    <TableCell>{order.email}</TableCell>
                                    <TableCell>{order.mobile}</TableCell>
                                    <TableCell>{order.productCount}</TableCell>
                                </TableRow>
                            ))
                        ) : 
                        (
                            <TableRow>
                                <TableCell colSpan={5}>No Records Found</TableCell>
                            </TableRow>
                        )
                    }
                </TableBody>
            </Table>
        </div>

        
    </div>
  )
}

export default FindOrderSection