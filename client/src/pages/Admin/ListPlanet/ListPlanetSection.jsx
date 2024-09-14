import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import useGetAllPlanets from "@/hooks/useGetAllPlanets"
import { useDispatch, useSelector } from "react-redux";

const ListPlanetSection = () => {
    useGetAllPlanets();
    const dispatch = useDispatch();
    const { planetList } = useSelector((store) => store.planet);
  return (
    <div className='w-full h-full rounded-md shadow-xl p-2'>
        <h1 className='text-xl font-titleFonts font-bold my-2'>Planet List</h1>
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
                    {
                        planetList && planetList.length > 0 ?
                        (
                            planetList.map((planet, index) => (
                                <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{planet.name}</TableCell>
                                    <TableCell>{planet.mobile}</TableCell>
                                    <TableCell>{planet.email}</TableCell>
                                    <TableCell>{planet.productCount}</TableCell>
                                </TableRow>
                            ))
                        ) : 
                        (
                            <TableRow>
                                <TableCell colSpan={5}>No Data Found</TableCell>
                            </TableRow>
                        )
                    }
                </TableBody>
            </Table>
        </div>
    </div>
  )
}

export default ListPlanetSection