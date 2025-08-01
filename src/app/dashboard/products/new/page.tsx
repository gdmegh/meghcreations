
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Loader2, DollarSign } from "lucide-react";

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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/hooks/use-user";
import { addProduct } from "@/services/data.service";
import { generateProductDescription } from "@/ai/flows/generate-product-description";
import { ProductDescriptionGenerator } from "@/components/ai/product-description-generator";

const formSchema = z.object({
  productName: z.string().min(2, "Product name is required"),
  description: z.string().min(10, "Description is required"),
  priceType: z.enum(["free", "fixed"], { required_error: "You must select a price type." }),
  price: z.coerce.number().optional(),
  assetType: z.string().min(2, "Asset type is required (e.g., UI Kit, Icon Set)"),
  keyFeatures: z.string().min(3, "Please list at least one key feature."),
  previewImage: z
    .any()
    .refine((file) => file instanceof File, "A preview image is required.")
}).refine(data => {
    if (data.priceType === 'fixed') {
        return data.price !== undefined && data.price >= 0;
    }
    return true;
}, {
    message: "Price is required for a fixed price product.",
    path: ["price"],
});

export default function NewProductPage() {
  const { toast } = useToast();
  const { user, isLoading: isUserLoading } = useUser();
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: "",
      description: "",
      priceType: "fixed",
      price: undefined,
      assetType: "",
      keyFeatures: "",
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
      toast({ title: "Not Authenticated", description: "You must be logged in to create a product.", variant: "destructive" });
      return;
    }
    setIsSaving(true);
    
    try {
      await addProduct({
        title: values.productName,
        description: values.description,
        priceType: values.priceType,
        price: values.priceType === 'fixed' ? values.price : 0,
        assetType: values.assetType,
        tags: values.keyFeatures.split(',').map(tag => tag.trim()),
        creatorId: user.id,
        previewImage: values.previewImage,
      });

      toast({
        title: "Product Created!",
        description: "Your new product has been listed.",
      });
      router.push("/dashboard/products");

    } catch (error) {
      console.error("Failed to create product", error);
       toast({
        title: "Save Failed",
        description: "Could not create your product. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  }
  
  const priceType = form.watch("priceType");

  if (isUserLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="animate-spin h-8 w-8" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-headline">Add New Product</h1>
        <p className="text-muted-foreground">
          Fill out the form below to list a new digital asset.
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Product Details</CardTitle>
              <CardDescription>Give your product a name, description, and asset type.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="productName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Minimalist UI Kit" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
                <FormField
                    control={form.control}
                    name="keyFeatures"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Key Features</FormLabel>
                        <FormControl>
                        <Input placeholder="Dark mode, Responsive, Auto-layout" {...field} />
                        </FormControl>
                        <FormDescription>
                         Comma-separated list of key features. Used for filtering and AI generation.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="assetType"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Asset Type</FormLabel>
                        <FormControl>
                        <Input placeholder="e.g., UI Kit, Icon Set, eBook" {...field} />
                        </FormControl>
                        <FormDescription>
                         A short category name for your asset.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                    )}
                />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between items-center">
                      <FormLabel>Description</FormLabel>
                      <ProductDescriptionGenerator form={form} generateDescriptionAction={generateProductDescription} />
                    </div>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your product in detail..."
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
              <CardTitle>Pricing</CardTitle>
              <CardDescription>Set a price for your product.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <FormField
                control={form.control}
                name="priceType"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex space-x-4"
                      >
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="fixed" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Fixed Price
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="free" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Free
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {priceType === 'fixed' && (
                <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Price</FormLabel>
                        <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <FormControl>
                                <Input type="number" placeholder="49.99" className="pl-8" {...field} value={field.value ?? ""} onChange={e => field.onChange(e.target.value === '' ? undefined : +e.target.value)} />
                            </FormControl>
                        </div>
                        <FormMessage />
                    </FormItem>
                    )}
                />
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Media</CardTitle>
              <CardDescription>Upload a preview image for your product.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <FormField
                control={form.control}
                name="previewImage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preview Image</FormLabel>
                    <div className="flex items-center gap-4">
                       {previewImage ? (
                          <Image src={previewImage} alt="Image Preview" width={128} height={128} className="rounded-md object-cover aspect-square" />
                       ) : (
                         <div className="w-32 h-32 border-2 border-dashed rounded-lg flex items-center justify-center bg-muted">
                            <p className="text-xs text-muted-foreground">Preview</p>
                        </div>
                       )}
                        <FormControl>
                            <Input 
                                type="file" 
                                accept="image/*" 
                                onChange={handleFileChange}
                                className="max-w-xs"
                             />
                        </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Button type="submit" disabled={isSaving}>
            {isSaving ? <><Loader2 className="animate-spin mr-2" /> Publishing...</> : "Publish Product"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
