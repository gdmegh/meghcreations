import { ProductCard } from "@/components/product/product-card";
import { ProductFilters } from "@/components/product/product-filters";
import { products, sellers } from "@/lib/constants";

export default function HomePage() {
  const getSellerById = (id: string) => sellers.find((s) => s.id === id);

  return (
    <div className="container py-8">
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline">
          Discover Your Next Digital Asset
        </h1>
        <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
          Explore thousands of high-quality digital products from top creators around the world.
        </p>
      </section>

      <main>
        <div className="mb-8">
          <ProductFilters />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => {
            const seller = getSellerById(product.sellerId);
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
      </main>
    </div>
  );
}
