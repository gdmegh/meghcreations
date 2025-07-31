
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import Image from "next/image";
import { Loader2 } from "lucide-react";

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
import { useToast } from "@/hooks/use-toast";
import { auth } from "@/lib/firebase";
import { getSellerById } from "@/services/data.service";
import type { Seller } from "@/lib/constants";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const formSchema = z.object({
  displayName: z.string().min(2, "Display name is required"),
  bio: z.string().max(200, "Bio cannot exceed 200 characters.").optional(),
  profilePicture: z.any(),
});

export default function SellerSettingsPage() {
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [seller, setSeller] = useState<Seller | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      displayName: "",
      bio: "",
      profilePicture: null,
    },
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        // Using a default seller for now as user roles aren't fully implemented
        const currentSeller = await getSellerById("seller-1"); 
        if (currentSeller) {
          setSeller(currentSeller);
          form.reset({
            displayName: currentSeller.displayName,
            bio: currentSeller.bio || "",
          });
          setPreviewImage(currentSeller.profilePictureUrl);
        }
      } else {
        // Redirect or handle non-authenticated user
      }
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, [form]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      form.setValue("profilePicture", file);
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSaving(true);
    // In a real application, you would handle the file upload here.
    // This could involve uploading the `values.profilePicture` file to a service
    // like Firebase Storage and getting a URL back.
    // Then you would save the `displayName`, `bio`, and the new image URL
    // to your Firestore database.

    console.log("Saving data:", {
      displayName: values.displayName,
      bio: values.bio,
      fileName: values.profilePicture?.name,
    });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast({
      title: "Profile Saved!",
      description: "Your seller profile has been updated.",
    });
    setIsSaving(false);
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="animate-spin h-8 w-8" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-headline">Seller Settings</h1>
        <p className="text-muted-foreground">
          Manage your public seller profile.
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Profile Details</CardTitle>
              <CardDescription>Update your display name and bio.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="displayName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Display Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Seller Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell everyone a little about yourself and what you create."
                        className="min-h-[100px]"
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
              <CardTitle>Profile Picture</CardTitle>
              <CardDescription>Upload a new profile picture. This will be displayed on your seller page and product cards.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <FormField
                control={form.control}
                name="profilePicture"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image</FormLabel>
                     <div className="flex items-center gap-4">
                        <Avatar className="h-20 w-20">
                            <AvatarImage src={previewImage || undefined} alt="Profile Preview" data-ai-hint="person face" />
                            <AvatarFallback className="text-2xl">
                                {seller?.displayName.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                        <FormControl>
                            <Input 
                                type="file" 
                                accept="image/*" 
                                onChange={handleFileChange}
                                className="max-w-xs"
                             />
                        </FormControl>
                    </div>
                    <FormDescription>
                        Note: Backend implementation is required to store the uploaded file.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Button type="submit" disabled={isSaving}>
            {isSaving ? <><Loader2 className="animate-spin" /> Saving...</> : "Save Changes"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
