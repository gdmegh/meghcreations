
"use client";

import { useState } from "react";
import { type UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { Wand2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import type { GenerateProductDescriptionInput } from "@/ai/flows/generate-product-description";

const formSchema = z.object({
  productName: z.string().min(2, {
    message: "Product name must be at least 2 characters.",
  }),
  keyFeatures: z.string().min(3),
});

interface ProductDescriptionGeneratorProps {
  generateDescriptionAction: (
    input: GenerateProductDescriptionInput
  ) => Promise<{ description: string }>;
  form: UseFormReturn<any>; // Pass the main form's context
}

export function ProductDescriptionGenerator({
  generateDescriptionAction,
  form,
}: ProductDescriptionGeneratorProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerateDescription = async () => {
    const { productName, keyFeatures } =
      form.getValues();

    if (!productName || !keyFeatures) {
      toast({
        title: "Missing Information",
        description:
          "Please fill out Product Name and Key Features to generate a description.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const result = await generateDescriptionAction({
        productName,
        keyFeatures,
        targetAudience: 'Digital creators', // Placeholder as it's required by the flow but removed from UI
      });
      form.setValue("description", result.description, {
        shouldValidate: true,
      });
      toast({
        title: "Description Generated",
        description: "The AI has generated a new product description.",
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Could not generate a description. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      type="button"
      onClick={handleGenerateDescription}
      disabled={isLoading}
      variant="outline"
      size="sm"
    >
      <Wand2 className="mr-2 h-4 w-4" />
      {isLoading ? "Generating..." : "Generate with AI"}
    </Button>
  );
}
