
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

export default function AdminSettingsPage() {
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
            <Input defaultValue="MeghMarket" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="logo-upload">Logo</Label>
            <div className="flex items-center gap-4">
                <div className="w-20 h-20 border-2 border-dashed rounded-lg flex items-center justify-center bg-muted">
                    <p className="text-xs text-muted-foreground">Logo</p>
                </div>
                 <Input id="logo-upload" type="file" className="max-w-xs" />
            </div>
            <p className="text-xs text-muted-foreground">
                Upload your site logo. This is a UI placeholder; backend implementation is required.
            </p>
          </div>
           <Button>Save Site Configuration</Button>
        </CardContent>
      </Card>
    </div>
  );
}
