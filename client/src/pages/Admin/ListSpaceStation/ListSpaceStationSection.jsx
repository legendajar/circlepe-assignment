import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

const ListSpaceStationSection = () => {
  return (
    <div className='w-full h-full'>
        <div className='mx-5 my-2 px-4 py-2 border rounded-md bg-white shadow-md flex flex-col'>
            <h1 className='text-xl font-bold font-titleFonts'>List Space Stations</h1>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>S.No</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Mobile</TableHead>
                        <TableHead>Order Count</TableHead>
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

export default ListSpaceStationSection