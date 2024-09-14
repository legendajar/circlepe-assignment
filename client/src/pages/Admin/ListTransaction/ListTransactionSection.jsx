import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSelector } from "react-redux";

const ListTransactionSection = () => {
  const { transactionList } = useSelector((store) => store.transaction);
  return (
    <div className="w-full h-full rounded-md shadow-xl p-2">
      <h1 className="text-xl font-titleFonts font-bold my-2">Product List</h1>
      <div className="w-full">
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
            {transactionList && transactionList.length > 0 ? (
              transactionList.map((transaction, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{transaction.name}</TableCell>
                  <TableCell>{transaction.mobile}</TableCell>
                  <TableCell>{transaction.email}</TableCell>
                  <TableCell>{transaction.productCount}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5}>No Records Found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ListTransactionSection;
