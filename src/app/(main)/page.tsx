
import { ProductCard } from "@/components/product/product-card";
import { ProductFilters } from "@/components/product/product-filters";
import { getProducts, getSellerById } from "@/services/data.service";

export default async function HomePage() {
  const products = await getProducts();

  return (
    <div>
      <section className="text-center py-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline">
          Discover Your Next Digital Asset
        </h1>
        <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
          Explore thousands of high-quality digital products from top creators around the world.
        </p>
      </section>

      <main className="py-8">
        <div className="mb-8">
          <ProductFilters />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map(async (product) => {
            const seller = await getSellerById(product.sellerId);
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
