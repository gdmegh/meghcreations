
import Image from "next/image";
import { notFound } from "next/navigation";
import { Star, ShoppingBag } from "lucide-react";

import { getSellerById, getProductsBySellerId } from "@/services/data.service";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ProductCard } from "@/components/product/product-card";
import { Card, CardContent } from "@/components/ui/card";

export default async function SellerPage({
  params,
}: {
  params: { sellerId: string };
}) {
  const seller = await getSellerById(params.sellerId);
  if (!seller) {
    notFound();
  }

  const sellerProducts = await getProductsBySellerId(seller.id);

  return (
    <div className="py-12">
      <Card className="mb-12 overflow-hidden">
        <div className="relative h-48 w-full bg-muted">
           <Image src="https://placehold.co/1200x300.png" alt="Seller Banner" layout="fill" objectFit="cover" data-ai-hint="abstract background pattern" />
        </div>
        <CardContent className="p-6 pt-0">
          <div className="flex items-end -mt-16">
            <Avatar className="w-32 h-32 border-4 border-background ring-4 ring-background">
              <AvatarImage src={seller.profilePictureUrl} alt={seller.displayName} data-ai-hint="person face" />
              <AvatarFallback className="text-4xl">{seller.displayName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="ml-6 mb-2">
              <h1 className="text-3xl font-bold font-headline">{seller.displayName}</h1>
              <div className="flex items-center gap-4 text-muted-foreground mt-1">
                <div className="flex items-center gap-1 text-yellow-500">
                  <Star className="w-4 h-4 fill-current" />
                  <span>{seller.rating?.toFixed(1) || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-1">
                  <ShoppingBag className="w-4 h-4" />
                  <span>{seller.totalSales || 0} sales</span>
                </div>
              </div>
            </div>
          </div>
          <p className="mt-6 text-muted-foreground max-w-2xl">{seller.bio}</p>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-bold font-headline mb-6">
        Products by {seller.displayName}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sellerProducts.map(async (product) => {
          // The seller is already fetched, so we pass it directly.
          return <ProductCard key={product.id} product={product} seller={seller} />
        })}
      </div>
    </div>
  );
}
