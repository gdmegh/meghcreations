
"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Star, CheckCircle, ZoomIn, ZoomOut, Redo } from "lucide-react";
import { useState } from "react";

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
import { cn } from "@/lib/utils";

export default function ProductPage({
  params,
}: {
  params: { productId: string };
}) {
  const [zoom, setZoom] = useState(1);
  const product = products.find((p) => p.id === params.productId);
  
  const handleZoomIn = () => setZoom((prev) => Math.min(prev * 1.2, 3));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev / 1.2, 0.5));
  const handleResetZoom = () => setZoom(1);

  if (!product) {
    notFound();
  }

  const seller = sellers.find((s) => s.id === product.sellerId);
  
  if (!seller) {
    notFound();
  }

  return (
    <div className="container py-12">
      <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
        <div className="md:col-span-2">
          <div className="sticky top-20">
            <Card>
              <CardContent className="p-2">
                <div
                  className="relative w-full overflow-auto rounded-lg shadow-lg"
                  style={{ height: "calc(100vh - 10rem)" }}
                >
                  <div
                    className="relative transition-transform duration-300"
                    style={{
                      transform: `scale(${zoom})`,
                      transformOrigin: "top center",
                      width: "100%",
                    }}
                  >
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      width={1200}
                      height={1800}
                      className="object-contain object-top"
                      data-ai-hint="digital product screenshot"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="flex justify-center items-center gap-2 mt-4">
                <Button variant="outline" size="icon" onClick={handleZoomOut}>
                    <ZoomOut />
                    <span className="sr-only">Zoom Out</span>
                </Button>
                <Button variant="outline" size="icon" onClick={handleResetZoom}>
                    <Redo />
                    <span className="sr-only">Reset Zoom</span>
                </Button>
                <Button variant="outline" size="icon" onClick={handleZoomIn}>
                    <ZoomIn />
                    <span className="sr-only">Zoom In</span>
                </Button>
            </div>
          </div>
        </div>

        <div className="md:col-span-1 flex flex-col gap-6">
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

          <div className="flex flex-col sm:items-center sm:justify-between gap-4 sticky bottom-8">
            <div className="text-4xl font-bold font-headline text-primary">
              ${product.price.toFixed(2)}
            </div>
            <Button size="lg" className="w-full">
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
