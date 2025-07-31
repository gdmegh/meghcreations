
import { ProductCard } from "@/components/product/product-card";
import { ProductFilters } from "@/components/product/product-filters";
import { getProducts, getSellerById } from "@/services/data.service";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default async function HomePage() {
  const products = await getProducts();

  return (
    <div>
      <section className="relative text-center py-20 md:py-32 overflow-hidden rounded-lg">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-primary/10 to-background z-0"
        />
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold font-headline bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
            Discover Your Next Digital Asset
          </h1>
          <p className="text-lg text-muted-foreground mt-6 max-w-2xl mx-auto">
            Explore thousands of high-quality digital products from top creators around the world. Your next masterpiece starts here.
          </p>
          <div className="mt-8 flex gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="#products">
                Start Browsing
                <ArrowRight />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/sell">Become a Seller</Link>
            </Button>
          </div>
        </div>
      </section>

      <main id="products" className="py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold font-headline mb-4">Featured Products</h2>
          <ProductFilters />
        </div>
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map(async (product) => {
              const seller = await getSellerById(product.creatorId);
              if (!seller) return null;
              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  seller={seller}
                />
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 border-dashed border-2 rounded-lg">
            <h2 className="text-2xl font-semibold">No Products Yet</h2>
            <p className="text-muted-foreground mt-2">Check back soon for amazing digital products!</p>
          </div>
        )}
      </main>
    </div>
  );
}
