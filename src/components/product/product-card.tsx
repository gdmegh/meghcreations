import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Product, Seller } from "@/lib/constants";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProductCardProps {
  product: Product;
  seller: Seller;
}

export function ProductCard({ product, seller }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`} className="group">
      <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <CardHeader className="p-0">
          <div className="relative h-48 w-full">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover"
              data-ai-hint="digital product screenshot"
            />
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <Badge variant="secondary">{product.category}</Badge>
            <div className="text-lg font-bold font-headline text-primary">
              ${product.price.toFixed(2)}
            </div>
          </div>
          <h3 className="mt-2 text-lg font-semibold font-headline truncate">
            {product.name}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground h-10">
            {product.shortDescription}
          </p>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={seller.avatarUrl} alt={seller.name} data-ai-hint="person face" />
              <AvatarFallback>{seller.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-sm text-muted-foreground">{seller.name}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
