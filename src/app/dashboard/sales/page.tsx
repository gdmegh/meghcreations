
"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DollarSign, CreditCard, Users, BarChart } from "lucide-react";
import {
    Bar,
    BarChart as RechartsBarChart,
    ResponsiveContainer,
    XAxis,
    YAxis,
    Tooltip,
    Legend
} from "recharts";
import { getProductsBySellerId, getSellerById } from "@/services/data.service";
import { useEffect, useState } from "react";
import type { DigitalAsset } from "@/lib/constants";

// Mock data for sales
const salesData = [
  { customer: "Olivia Martin", product: "Minimalist UI Kit", date: "2023-11-23", amount: 49.00 },
  { customer: "Jackson Lee", product: "Icon Set Vol. 1", date: "2023-11-20", amount: 19.99 },
  { customer: "Isabella Nguyen", product: "Website Template", date: "2023-11-15", amount: 99.00 },
  { customer: "Liam Smith", product: "Minimalist UI Kit", date: "2023-11-10", amount: 49.00 },
];

const monthlyRevenue = [
  { month: "Jan", revenue: 1200 },
  { month: "Feb", revenue: 1500 },
  { month: "Mar", revenue: 1800 },
  { month: "Apr", revenue: 1700 },
  { month: "May", revenue: 2100 },
  { month: "Jun", revenue: 2500 },
];

export default function SellerSalesPage() {
    const [products, setProducts] = useState<DigitalAsset[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const sellerId = "seller-1"; // Hardcoded for now

    useEffect(() => {
        async function loadData() {
            setIsLoading(true);
            const sellerProducts = await getProductsBySellerId(sellerId);
            setProducts(sellerProducts);
            setIsLoading(false);
        }
        loadData();
    }, [sellerId]);
    
    // These would be calculated from real sales data
    const totalRevenue = salesData.reduce((acc, sale) => acc + sale.amount, 0);
    const totalSales = salesData.length;
    const avgSale = totalSales > 0 ? totalRevenue / totalSales : 0;

  return (
    <div className="flex flex-1 flex-col gap-4">
      <h1 className="text-2xl font-bold font-headline">Sales Analytics</h1>
       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              From {totalSales} sales
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{totalSales}</div>
            <p className="text-xs text-muted-foreground">
             Successful transactions
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Sale Value</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${avgSale.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
             Per transaction
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
            <CardHeader>
                <CardTitle>Recent Sales</CardTitle>
                <CardDescription>A log of your recent sales.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Customer</TableHead>
                            <TableHead>Product</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {salesData.map((sale, index) => (
                            <TableRow key={index}>
                                <TableCell>{sale.customer}</TableCell>
                                <TableCell>{sale.product}</TableCell>
                                <TableCell>{sale.date}</TableCell>
                                <TableCell className="text-right">${sale.amount.toFixed(2)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
        <Card className="lg:col-span-3">
            <CardHeader>
                <CardTitle>Monthly Revenue</CardTitle>
                <CardDescription>Your sales performance over the last 6 months.</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={300}>
                    <RechartsBarChart data={monthlyRevenue}>
                        <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                        <Tooltip
                            contentStyle={{
                                background: "hsl(var(--background))",
                                border: "1px solid hsl(var(--border))",
                                color: "hsl(var(--foreground))"
                            }}
                        />
                        <Legend iconType="circle" />
                        <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </RechartsBarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
