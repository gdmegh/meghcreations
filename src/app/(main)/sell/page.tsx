
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductDescriptionGenerator } from "@/components/ai/product-description-generator";
import {
  generateProductDescription
} from "@/ai/flows/generate-product-description";
import { getCategories } from "@/services/data.service";
import { useEffect, useState } from "react";
import { Combobox } from "@/components/ui/combobox";

const formSchema = z.object({
  productName: z.string().min(2, "Product name is required"),
  productCategory: z.string().min(2, "Category is required"),
  keyFeatures: z.string().min(10, "List at least one key feature"),
  targetAudience: z.string().min(3, "Describe the target audience"),
  price: z.coerce.number().min(0, "Price must be a positive number"),
  description: z.string().min(20, "Description must be at least 20 characters"),
});

export default function SellPage() {
  const [categories, setCategories] = useState<{value: string, label: string}[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const cats = await getCategories();
      setCategories(cats.map(c => ({ value: c, label: c })));
    };
    fetchCategories();
  }, [])


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: "",
      productCategory: "",
      keyFeatures: "",
      targetAudience: "",
      price: 0.0,
      description: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Handle form submission logic
  }

  return (
    <div className="py-12">
      <h1 className="text-4xl font-bold font-headline mb-8">
        Sell Your Product
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Product Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="productName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Minimalist UI Kit" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="productCategory"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Category</FormLabel>
                        <Combobox
                          options={categories}
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="Select a category..."
                          searchPlaceholder="Search categories..."
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex items-center justify-between">
                    <FormLabel>Description</FormLabel>
                    <ProductDescriptionGenerator
                      generateDescriptionAction={generateProductDescription}
                      form={form}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us more about your product..."
                            className="min-h-[150px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>AI Content Generation Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="keyFeatures"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Key Features (comma-separated)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., 100+ components, dark & light mode"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Provide features to help the AI generate a better description.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="targetAudience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Target Audience</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Designers, developers"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1 space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Pricing</CardTitle>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price (USD)</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">$</span>
                            <Input type="number" placeholder="49.99" className="pl-7" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Product Image</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="w-full h-40 border-2 border-dashed rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Drag & drop or</p>
                      <Button type="button" variant="link" className="p-0 h-auto">browse files</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Button type="submit" size="lg" className="w-full">
                List Product
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
