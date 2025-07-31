
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
import { getProducts, getSellers } from "@/services/data.service";
import { DollarSign, Package, Users } from "lucide-react";

export default async function AdminDashboardPage() {
  const products = await getProducts();
  const sellers = await getSellers();

  const totalRevenue = products.reduce(
    (acc, product) => acc + (product.price || 0),
    0
  );
  const totalProducts = products.length;
  const totalSellers = sellers.length;

  return (
    <div className="flex flex-1 flex-col gap-4">
       <CardTitle>Site-Wide Analytics</CardTitle>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              Across all products
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProducts}</div>
            <p className="text-xs text-muted-foreground">
             Listed on the marketplace
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Sellers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSellers}</div>
            <p className="text-xs text-muted-foreground">
             Creators on the platform
            </p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Recent Products</CardTitle>
          <CardDescription>
            A view of the latest products added to the marketplace.
          </CardDescription>
        </CardHeader>
        <CardContent>
           <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Seller</TableHead>
                    <TableHead className="hidden md:table-cell">Price</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {products.slice(0, 5).map(async (product) => {
                    const seller = await getSellers().then(sellers => sellers.find(s => s.id === product.creatorId));
                    return (
                        <TableRow key={product.id}>
                            <TableCell className="font-medium">{product.title}</TableCell>
                            <TableCell>{seller?.displayName || 'Unknown'}</TableCell>
                            <TableCell className="hidden md:table-cell">${product.price?.toFixed(2) || 'Free'}</TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table>
        </CardContent>
      </Card>
    </div>
  );
}
