
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MoreHorizontal, PlusCircle } from "lucide-react";

import type { DigitalAsset } from "@/lib/constants";
import { getProductsBySellerId } from "@/services/data.service";
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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@/hooks/use-user";

export default function SellerProductsPage() {
  const { user } = useUser();
  const [products, setProducts] = useState<DigitalAsset[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      if (user) {
        setIsLoading(true);
        const fetchedProducts = await getProductsBySellerId(user.id);
        setProducts(fetchedProducts);
        setIsLoading(false);
      }
    }
    loadProducts();
  }, [user]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-headline">My Products</h1>
          <p className="text-muted-foreground">
            View, manage, and add new products.
          </p>
        </div>
        <Button asChild>
          <Link href="/sell">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Product
          </Link>
        </Button>
      </div>
      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  Image
                </TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    Loading your products...
                  </TableCell>
                </TableRow>
              ) : products.length === 0 ? (
                 <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    You haven't listed any products yet.
                  </TableCell>
                </TableRow>
              ) : products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="hidden sm:table-cell">
                    <Image
                      alt={product.title}
                      className="aspect-square rounded-md object-cover"
                      height="64"
                      src={product.previewImageUrl}
                      width="64"
                      data-ai-hint="digital product thumbnail"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{product.title}</TableCell>
                  <TableCell>${product.price?.toFixed(2) ?? "Free"}</TableCell>
                  <TableCell>
                    <Badge variant={product.isPublished ? "outline" : "secondary"}>
                      {product.isPublished ? "Active" : "Draft"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
