
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Loader2 } from "lucide-react";
import { doc, setDoc, getDoc } from "firebase/firestore";


import { auth, db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/icons";
import { useToast } from "@/hooks/use-toast";
import { Header } from "@/components/layout/header";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  displayName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  confirmPassword: z.string(),
  role: z.enum(["buyer", "seller"], {
    required_error: "You need to select a role.",
  }),
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

export default function SignupPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "buyer",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      const user = userCredential.user;
      
      // Save user data to Firestore
      await setDoc(doc(db, "users", user.uid), {
        displayName: values.displayName,
        email: values.email,
        role: values.role,
        createdAt: new Date(),
        profilePictureUrl: `https://placehold.co/100x100.png`, // Default placeholder
        bio: "",
      });

      toast({
        title: "Account Created!",
        description: "Your account has been successfully created. Please login.",
      });
      router.push("/login");
    } catch (error: any) {
      console.error("Signup error:", error);
      let errorMessage = "An unexpected error occurred. Please try again.";
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = "This email is already in use. Please login or use a different email.";
      }
      toast({
        title: "Signup Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleGoogleSignIn() {
    setIsLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if user already exists in Firestore
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
         await setDoc(userDocRef, {
            displayName: user.displayName,
            email: user.email,
            role: "buyer", // Default role for Google sign-in
            createdAt: new Date(),
            profilePictureUrl: user.photoURL || `https://placehold.co/100x100.png`,
            bio: "",
        });
      }
      
      toast({
        title: "Login Successful!",
        description: "Welcome back.",
      });
      router.push("/dashboard");

    } catch (error: any) {
        console.error("Google Sign-In error:", error);
        toast({
            title: "Google Sign-In Failed",
            description: "Could not sign in with Google. Please try again.",
            variant: "destructive",
        });
    } finally {
        setIsLoading(false);
    }
  }

  return (
    <>
      <Header />
      <div className="flex items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-sm">
          <CardHeader className="text-center">
            <Logo className="w-10 h-10 mx-auto mb-4 text-primary" />
            <CardTitle className="text-2xl font-headline">Create an Account</CardTitle>
            <CardDescription>
              Enter your information to create a new account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="displayName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="m@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>I am a...</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex space-x-4"
                        >
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="buyer" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Buyer
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="seller" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Seller
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </form>
            </Form>
            
            <div className="relative my-6">
              <Separator />
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 px-2 text-center">
                <span className="bg-background px-2 text-sm text-muted-foreground">OR CONTINUE WITH</span>
              </div>
            </div>

            <Button variant="outline" className="w-full" onClick={handleGoogleSignIn} disabled={isLoading}>
                {isLoading ? <Loader2 className="animate-spin" /> : 'Sign in with Google'}
            </Button>

            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="underline">
                Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
