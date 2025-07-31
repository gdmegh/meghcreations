
// src/ai/flows/generate-product-description.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating product description suggestions.
 *
 * - generateProductDescription - A function that generates product description suggestions.
 * - GenerateProductDescriptionInput - The input type for the generateProductDescription function.
 * - GenerateProductDescriptionOutput - The return type for the generateProductDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProductDescriptionInputSchema = z.object({
  productName: z.string().describe('The name of the product.'),
  keyFeatures: z.string().describe('Key features of the product, comma separated.'),
  targetAudience: z.string().describe('The target audience for the product.'),
});
export type GenerateProductDescriptionInput = z.infer<typeof GenerateProductDescriptionInputSchema>;

const GenerateProductDescriptionOutputSchema = z.object({
  description: z.string().describe('The generated product description.'),
});
export type GenerateProductDescriptionOutput = z.infer<typeof GenerateProductDescriptionOutputSchema>;

export async function generateProductDescription(input: GenerateProductDescriptionInput): Promise<GenerateProductDescriptionOutput> {
  return generateProductDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateProductDescriptionPrompt',
  input: {schema: GenerateProductDescriptionInputSchema},
  output: {schema: GenerateProductDescriptionOutputSchema},
  prompt: `You are an expert copywriter specializing in writing compelling product descriptions.

  Based on the product details provided, write a product description that is engaging, informative, and persuasive.

  Product Name: {{{productName}}}
  Key Features: {{{keyFeatures}}}
  Target Audience: {{{targetAudience}}}

  Description:`, // Ensure the prompt ends with "Description:" so the model knows what is expected.
});

const generateProductDescriptionFlow = ai.defineFlow(
  {
    name: 'generateProductDescriptionFlow',
    inputSchema: GenerateProductDescriptionInputSchema,
    outputSchema: GenerateProductDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
