import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

const FindOrderSection = () => {
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

export default FindOrderSection