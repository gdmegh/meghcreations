import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Star, CheckCircle } from "lucide-react";

import { products, sellers } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ProductPage({
  params,
}: {
  params: { productId: string };
}) {
  const product = products.find((p) => p.id === params.productId);
  if (!product) {
    notFound();
  }

  const seller = sellers.find((s) => s.id === product.sellerId);
  if (!seller) {
    notFound();
  }

  return (
    <div className="container py-12">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div className="flex-shrink-0">
          <div className="relative w-full h-[400px] rounded-lg overflow-hidden shadow-lg">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover"
              data-ai-hint="digital product screenshot"
            />
          </div>
          {/* Add Carousel for multiple images here if needed */}
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <Badge variant="secondary">{product.category}</Badge>
            <h1 className="text-4xl font-bold font-headline mt-2">
              {product.name}
            </h1>
            <div className="mt-4 flex items-center gap-4">
              <Link href={`/${seller.id}`} className="flex items-center gap-2 group">
                <Avatar>
                  <AvatarImage src={seller.avatarUrl} alt={seller.name} data-ai-hint="person face" />
                  <AvatarFallback>{seller.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="font-medium group-hover:underline">{seller.name}</span>
              </Link>
              <div className="flex items-center gap-1 text-yellow-500">
                <Star className="w-4 h-4 fill-current" />
                <span>{seller.rating.toFixed(1)}</span>
                <span className="text-muted-foreground">({seller.totalSales} sales)</span>
              </div>
            </div>
          </div>

          <p className="text-lg text-muted-foreground">
            {product.description}
          </p>

          <Card>
            <CardHeader>
              <CardTitle>Key Features</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="text-4xl font-bold font-headline text-primary">
              ${product.price.toFixed(2)}
            </div>
            <Button size="lg" className="w-full sm:w-auto">
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
