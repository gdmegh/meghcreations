
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export default function AdminSettingsPage() {
  const { toast } = useToast();
  const [siteName, setSiteName] = useState("MeghMarket");
  const [logoFile, setLogoFile] = useState<File | null>(null);

  const handleSave = () => {
    // In a real application, you would handle the file upload
    // and save the siteName to your database here.
    console.log("Saving settings:", { siteName, logoFile });

    toast({
      title: "Settings Saved!",
      description: "Your site configuration has been updated.",
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setLogoFile(event.target.files[0]);
    }
  };


  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-headline">General Settings</h1>
        <p className="text-muted-foreground">
          Manage your marketplace settings and configurations.
        </p>
      </div>
      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Site Configuration</CardTitle>
          <CardDescription>
            Update your site's branding and general information.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Site Name</Label>
            <Input 
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="logo-upload">Logo</Label>
            <div className="flex items-center gap-4">
                <div className="w-20 h-20 border-2 border-dashed rounded-lg flex items-center justify-center bg-muted">
                    <p className="text-xs text-muted-foreground">Logo</p>
                </div>
                 <Input id="logo-upload" type="file" className="max-w-xs" onChange={handleFileChange} />
            </div>
             {logoFile && <p className="text-xs text-muted-foreground">Selected file: {logoFile.name}</p>}
            <p className="text-xs text-muted-foreground">
                Upload your site logo. Backend implementation is required to store the file.
            </p>
          </div>
           <Button onClick={handleSave}>Save Site Configuration</Button>
        </CardContent>
      </Card>
    </div>
  );
}
