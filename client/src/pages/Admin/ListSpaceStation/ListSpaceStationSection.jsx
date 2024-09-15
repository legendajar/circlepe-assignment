import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import useGetAllSpaceStation from '@/hooks/useGetAllSpaceStation';
import { useDispatch, useSelector } from 'react-redux';

const ListSpaceStationSection = () => {
    useGetAllSpaceStation();
    const dispatch = useDispatch()
    const { spaceStationList } = useSelector(store => store.spaceStation)
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
                        {
                            spaceStationList && spaceStationList.length > 0 ? 
                            (
                                spaceStationList.map((spaceStation, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{spaceStation.name}</TableCell>
                                        <TableCell>{spaceStation.email}</TableCell>
                                        <TableCell>{spaceStation.mobile}</TableCell>
                                        <TableCell>{spaceStation.orderCount}</TableCell>
                                    </TableRow>
                                ))
                            ) :
                            (
                                <TableRow>
                                    <TableCell colSpan={5}> No Data Found</TableCell>
                                </TableRow>
                            )
                        }
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default ListSpaceStationSection