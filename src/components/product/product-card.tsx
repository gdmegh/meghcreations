
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { DigitalAsset, Seller } from "@/lib/constants";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProductCardProps {
  product: DigitalAsset;
  seller: Seller;
}

export function ProductCard({ product, seller }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`} className="group">
      <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 flex flex-col">
        <CardHeader className="p-0">
          <div className="relative h-52 w-full">
            <Image
              src={product.previewImageUrl}
              alt={product.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              data-ai-hint="digital product screenshot"
            />
          </div>
        </CardHeader>
        <CardContent className="p-4 flex-grow">
          <div className="flex items-start justify-between">
            <Badge variant="secondary">{product.assetType}</Badge>
            <div className="text-lg font-bold font-headline text-primary">
              ${product.price?.toFixed(2) || 'Free'}
            </div>
          </div>
          <h3 className="mt-3 text-lg font-semibold font-headline leading-tight group-hover:text-primary transition-colors">
            {product.title}
          </h3>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8 border-2 border-background">
              <AvatarImage src={seller.profilePictureUrl} alt={seller.displayName} data-ai-hint="person face" />
              <AvatarFallback>{seller.displayName.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{seller.displayName}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
