import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import useGetAllProduct from "@/hooks/useGetAllProduct"
import { useDispatch, useSelector } from "react-redux";

const ListProductSection = () => {
    useGetAllProduct();
    const dispatch = useDispatch();
    const { productList } = useSelector(store => store.product)
    return (
        <div className='w-full h-full rounded-md shadow-xl p-2'>
            <h1 className='text-xl font-titleFonts font-bold my-2'>Product List</h1>
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
                            productList && productList.length > 0 ? 
                            (
                                productList.map((product, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{product.name}</TableCell>
                                        <TableCell>{product.mobile}</TableCell>
                                        <TableCell>{product.email}</TableCell>
                                        <TableCell>{product.productCount}</TableCell>
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

export default ListProductSection