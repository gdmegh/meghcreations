
"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Star, CheckCircle, ZoomIn, ZoomOut, Redo, Maximize, X } from "lucide-react";
import { useState, use } from "react";

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
  params: Promise<{ productId:string }>;
}) {
  const { productId } = use(params);
  const [zoom, setZoom] = useState(1);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const product = products.find((p) => p.id === productId);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev * 1.2, 3));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev / 1.2, 0.5));
  const handleResetZoom = () => setZoom(1);
  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
    if (!isFullScreen) {
      setZoom(1); // Reset zoom when entering fullscreen
    }
  }


  if (!product) {
    notFound();
  }

  const seller = sellers.find((s) => s.id === product.sellerId);

  if (!seller) {
    notFound();
  }

  return (
    <div className="py-12">
      <div
        className={cn({
          "fixed inset-0 z-50 bg-background/90 backdrop-blur-sm p-4 flex items-center justify-center": isFullScreen,
        })}
      >
        {isFullScreen && (
            <Button variant="ghost" size="icon" onClick={toggleFullScreen} className="absolute top-4 right-4 z-50">
                <X className="h-6 w-6"/>
                <span className="sr-only">Exit Fullscreen</span>
            </Button>
        )}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 w-full h-full">
          <div className={cn("md:col-span-2", { "col-span-3": isFullScreen })}>
            <div className={cn("sticky top-20", { "static": isFullScreen })}>
              <Card className={cn({"shadow-none border-0 bg-transparent": isFullScreen})}>
                <CardContent className={cn("p-2", {"p-0": isFullScreen})}>
                  <div
                    className={cn("relative w-full overflow-auto rounded-lg", {
                      "shadow-lg": !isFullScreen,
                      "h-full w-full": isFullScreen,
                      "h-[calc(100vh-10rem)]": !isFullScreen
                    })}
                  >
                    <div
                      className={cn("relative transition-transform duration-300", {"flex items-center justify-center h-full": isFullScreen})}
                      style={{
                        transform: `scale(${zoom})`,
                        transformOrigin: "center center",
                        width: "100%",
                      }}
                    >
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        width={isFullScreen ? 1920 : 1200}
                        height={isFullScreen ? 1080 : 1800}
                        className={cn("object-contain", { "object-top": !isFullScreen })}
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
                  <Button variant="outline" size="icon" onClick={toggleFullScreen}>
                      <Maximize />
                      <span className="sr-only">Fullscreen</span>
                  </Button>
              </div>
            </div>
          </div>

          <div className={cn("md:col-span-1 flex-col gap-6", isFullScreen ? "hidden" : "flex")}>
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
    </div>
  );
}
