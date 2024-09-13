import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

const FindPlanetSection = () => {
  return (
    <div className='w-full'>
        <div className='mx-5 my-2 px-4 py-2 border rounded-md bg-white shadow-md flex flex-col'>
            <h1 className='text-xl font-bold font-titleFonts'>Find Planet</h1>
            <div>
                <form className='flex items-center gap-4'>
                    <div className="my-2">
                        <Label htmlfor='planetName'>Planet Name</Label>
                        <Input type='text' name='name' />
                    </div>
                    <div className="my-2">
                        <Label htmlfor='planetId'>Planet Id</Label>
                        <Input type='text' name='id' />
                    </div>
                    <Button>Find</Button>
                </form>
            </div>
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

export default FindPlanetSection