import {
  Line,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ChartContainer } from "@/components/ui/chart";
import useGetAllProduct from "@/hooks/useGetAllProduct";
import { useSelector } from "react-redux";

// Helper function to get month name from month number


const AdminDashboardChartData = () => {
  useGetAllProduct();
  const monthsOrderList = useSelector(store => store.order.ordersByMonth);

  // Calculate chart data for orders and earnings
  const chartData = monthsOrderList.map((month) => {
    let totalEarnings = 0;

    // Use a for loop to calculate total earnings for the month
    for (let i = 0; i < month.orders.length; i++) {
      const order = month.orders[i].order;
      const product = order.product.product_id;

      // Calculate earnings based on product price and quantity
      totalEarnings += product.price * order.product.quantity;
    }
    const getMonthName = (monthNumber) => {
      const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
      return monthNames[monthNumber - 1]; // Month numbers are 1-12
    };

    return {
      month: getMonthName(month.month), // Get the month name
      year: month.year,
      totalOrders: month.orders.length, // Get the total number of orders
      totalEarnings: totalEarnings,
    };
  });

  const chartConfig = {
    totalOrders: {
      label: "Total Orders",
      color: "#2563eb",
    },
    totalEarnings: {
      label: "Total Earnings",
      color: "#60a5fa",
    },
  };

  return (
    <>
      <h1 className='text-lg font-bold font-titleFonts'>Details of Orders According to Month</h1>
      <ChartContainer
        config={chartConfig}
        className="w-13 smd:w-49 sml:h-[300px] sml:w-full"
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            {/* Line for Total Orders */}
            <Line
              type="monotone"
              dataKey="totalOrders"
              stroke={chartConfig.totalOrders.color}
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>

      <h1 className='text-lg font-bold font-titleFonts'>Details of Total Earnings According to Month</h1>

      <ChartContainer
        config={chartConfig}
        className="w-13 smd:w-49 sml:h-[300px] sml:w-full"
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            {/* Line for Total Earnings */}
            <Line
              type="monotone"
              dataKey="totalEarnings"
              stroke={chartConfig.totalEarnings.color}
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </>
  );
};

export default AdminDashboardChartData