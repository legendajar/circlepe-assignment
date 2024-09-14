import { Input } from '@/components/ui/input'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

const ListProductSection = () => {
  return (
    <div className='w-full h-full'>
        <div className='border rounded-md shadow-md m-3 p-3 flex flex-col items-center'>
            <div className='flex justify-between items-center w-full gap-5'>
                <h1 className='text-lg font-bold font-titleFonts'>Products</h1>
                <Input type='text' placeholder='Enter Name or ID' />
            </div>
            <hr className='my-5'/>
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

export default ListProductSection