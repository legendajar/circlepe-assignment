import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

const AdminDashboardCard = () => {
  return (
    <Card className="w-[250px] smd:w-[350px]">
      <CardHeader>
        <CardTitle>Planets</CardTitle>
        <CardDescription>Planets Data</CardDescription>
      </CardHeader>
      <CardContent>
            <p>5</p>
      </CardContent>
    </Card>
  )
}

export default AdminDashboardCard