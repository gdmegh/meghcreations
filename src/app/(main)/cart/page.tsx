import Image from "next/image";
import Link from "next/link";
import { Plus, Minus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { products } from "@/lib/constants";

const cartItems = [
  { productId: 'prod-1', quantity: 1 },
  { productId: 'prod-2', quantity: 2 },
];

export default function CartPage() {
  const subtotal = cartItems.reduce((acc, item) => {
    const product = products.find(p => p.id === item.productId);
    return acc + (product?.price || 0) * item.quantity;
  }, 0);

  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold font-headline mb-8">Your Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="text-center py-20 border-dashed border-2 rounded-lg">
          <h2 className="text-2xl font-semibold">Your cart is empty</h2>
          <p className="text-muted-foreground mt-2">Looks like you haven't added anything to your cart yet.</p>
          <Button asChild className="mt-6">
            <Link href="/">Start Browsing</Link>
          </Button>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map(item => {
              const product = products.find(p => p.id === item.productId);
              if (!product) return null;

              return (
                <Card key={product.id} className="flex items-center p-4">
                  <Image src={product.imageUrl} alt={product.name} width={100} height={100} className="rounded-md object-cover" data-ai-hint="digital product thumbnail"/>
                  <div className="ml-4 flex-grow">
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">{product.category}</p>
                    <p className="text-lg font-semibold mt-1">${product.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" className="h-8 w-8"><Minus className="h-4 w-4" /></Button>
                    <Input type="number" value={item.quantity} className="w-14 h-8 text-center" readOnly />
                    <Button variant="outline" size="icon" className="h-8 w-8"><Plus className="h-4 w-4" /></Button>
                  </div>
                  <Button variant="ghost" size="icon" className="ml-4">
                    <X className="h-5 w-5" />
                  </Button>
                </Card>
              );
            })}
          </div>

          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" size="lg">Proceed to Checkout</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
