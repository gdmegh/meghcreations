
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";
import { useRouter } from "next/navigation";

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
import { getCategories, addProduct } from "@/services/data.service";
import { useEffect, useState } from "react";
import { Combobox } from "@/components/ui/combobox";
import { useToast } from "@/hooks/use-toast";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, type User } from "firebase/auth";
import { Loader2, UploadCloud } from "lucide-react";

const formSchema = z.object({
  productName: z.string().min(2, "Product name is required"),
  productCategory: z.string().min(2, "Category is required"),
  keyFeatures: z.string().min(10, "List at least one key feature"),
  targetAudience: z.string().min(3, "Describe the target audience"),
  price: z.coerce.number().min(0, "Price must be a positive number"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  previewImage: z.any().refine(file => file instanceof File, "Image is required."),
});

export default function SellPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [categories, setCategories] = useState<{value: string, label: string}[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      const cats = await getCategories();
      setCategories(cats.map(c => ({ value: c.id, label: c.name })));
    };
    fetchCategories();

     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        router.push("/login"); // Redirect to login if not authenticated
      }
    });
    return () => unsubscribe();
  }, [router])


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: "",
      productCategory: "",
      keyFeatures: "",
      targetAudience: "",
      price: 0.0,
      description: "",
      previewImage: null,
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      form.setValue("previewImage", file, { shouldValidate: true });
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!user) {
        toast({ title: "Authentication Error", description: "You must be logged in to create a product.", variant: "destructive" });
        return;
    }
    setIsLoading(true);

    try {
        await addProduct({
            title: values.productName,
            categoryId: values.productCategory,
            tags: values.keyFeatures.split(',').map(f => f.trim()),
            price: values.price,
            description: values.description,
            priceType: values.price > 0 ? 'fixed' : 'free',
            assetType: 'Digital Asset', // Placeholder
            creatorId: user.uid,
            previewImageFile: values.previewImage,
        });
        toast({
            title: "Product Listed!",
            description: "Your product has been successfully listed on the marketplace."
        });
        router.push("/dashboard");
    } catch(error) {
        console.error("Failed to add product", error);
        toast({
            title: "Submission Failed",
            description: "There was an error listing your product. Please try again.",
            variant: "destructive"
        })
    } finally {
        setIsLoading(false);
    }
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
                   <FormField
                    control={form.control}
                    name="previewImage"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="w-full h-48 border-2 border-dashed rounded-lg flex items-center justify-center text-center relative">
                            {previewImage ? (
                              <Image src={previewImage} alt="Preview" fill className="object-cover rounded-lg" />
                            ) : (
                              <div className="flex flex-col items-center">
                                <UploadCloud className="w-12 h-12 text-muted-foreground" />
                                <p className="text-sm text-muted-foreground mt-2">Drag & drop or click to upload</p>
                              </div>
                            )}
                            <Input 
                              type="file" 
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                              accept="image/*"
                              onChange={handleFileChange}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
              <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
                {isLoading ? <><Loader2 className="animate-spin" /> Listing...</> : "List Product"}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
