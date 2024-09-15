import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table' 

const FindPRoductSection = () => {
  return (
    <div className='w-full h-full p-5'>
        <div className='border rounded-md shadow-md p-5'>
            <h1 className='text-lg font-titleFonts font-bold'>Find Product</h1>
            <form className='flex items-center gap-5' action="">
                <div className="my-2">
                    <Label htmlFor='id'>Product ID</Label>
                    <Input type='text' name='id' />
                </div>
                <div className="my-2">
                    <Label htmlFor='name'>Product Name</Label>
                    <Input type='text' name='name' />
                </div>
                <Button>Search</Button>
            </form>

            <hr className='my-5' />

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
                    <TableRow>
                        <TableCell>1</TableCell>
                        <TableCell>Harsh Solanki</TableCell>
                        <TableCell>9Ys9i@example.com</TableCell>
                        <TableCell>1234567890</TableCell>
                        <TableCell>5</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>1</TableCell>
                        <TableCell>Harsh Solanki</TableCell>
                        <TableCell>9Ys9i@example.com</TableCell>
                        <TableCell>1234567890</TableCell>
                        <TableCell>5</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>1</TableCell>
                        <TableCell>Harsh Solanki</TableCell>
                        <TableCell>9Ys9i@example.com</TableCell>
                        <TableCell>1234567890</TableCell>
                        <TableCell>5</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>1</TableCell>
                        <TableCell>Harsh Solanki</TableCell>
                        <TableCell>9Ys9i@example.com</TableCell>
                        <TableCell>1234567890</TableCell>
                        <TableCell>5</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    </div>
  )
}

export default FindPRoductSection