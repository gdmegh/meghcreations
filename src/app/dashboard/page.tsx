

import Link from "next/link";
import { ArrowUpRight, DollarSign, Package } from "lucide-react";
import Image from "next/image";

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
import { Button } from "@/components/ui/button";
import { getProductsBySellerId, getSellerById } from "@/services/data.service";
import { Badge } from "@/components/ui/badge";

export default async function SellerDashboardPage() {
    const sellerId = "seller-1"; // Hardcoded for now
    const seller = await getSellerById(sellerId);
    const products = await getProductsBySellerId(sellerId);

    const totalRevenue = products.reduce((acc, product) => acc + product.price, 0);

    return (
        <div className="flex flex-1 flex-col gap-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Revenue
                        </CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
                        <p className="text-xs text-muted-foreground">
                            Based on your product sales
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Your Products
                        </CardTitle>
                        <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{products.length}</div>
                        <p className="text-xs text-muted-foreground">
                            Total products you've listed
                        </p>
                    </CardContent>
                </Card>
            </div>
            <Card>
                <CardHeader className="flex flex-row items-center">
                    <div className="grid gap-2">
                        <CardTitle>Your Products</CardTitle>
                        <CardDescription>
                            A list of your most recent products.
                        </CardDescription>
                    </div>
                    <Button asChild size="sm" className="ml-auto gap-1">
                        <Link href="/sell">
                            Add Product
                            <ArrowUpRight className="h-4 w-4" />
                        </Link>
                    </Button>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="hidden w-[100px] sm:table-cell">
                                    <span className="sr-only">Image</span>
                                </TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="hidden md:table-cell">
                                    Price
                                </TableHead>
                                <TableHead>
                                    <span className="sr-only">Actions</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell className="hidden sm:table-cell">
                                <Image
                                    alt="Product image"
                                    className="aspect-square rounded-md object-cover"
                                    height="64"
                                    src={product.imageUrl}
                                    width="64"
                                    data-ai-hint="digital product thumbnail"
                                />
                                </TableCell>
                                <TableCell className="font-medium">
                                {product.name}
                                </TableCell>
                                <TableCell>
                                <Badge variant="outline">Active</Badge>
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                ${product.price.toFixed(2)}
                                </TableCell>
                                <TableCell>
                                    <Button asChild variant="outline" size="sm">
                                        <Link href={`/products/${product.id}`}>View</Link>
                                    </Button>
                                </TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
