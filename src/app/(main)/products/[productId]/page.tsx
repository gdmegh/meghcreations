
import { getProductById, getSellerById } from "@/services/data.service";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ProductDetailClient } from "@/components/product/product-detail-client";

type Props = {
  params: { productId: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProductById(params.productId);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `MeghMarket | ${product.title}`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: Props) {
  const product = await getProductById(params.productId);

  if (!product) {
    notFound();
  }

  const seller = await getSellerById(product.creatorId);

  if (!seller) {
    notFound();
  }

  return <ProductDetailClient product={product} seller={seller} />;
}
