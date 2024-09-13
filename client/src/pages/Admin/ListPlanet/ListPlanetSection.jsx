import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

const ListPlanetSection = () => {
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
  )
}

export default ListPlanetSection