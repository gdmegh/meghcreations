// src/components/admin/logo-uploader.tsx
"use client";

import { useState } from "react";
import { UploadCloud } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";

export function LogoUploader() {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  return (
    <div className="space-y-4">
      <Label htmlFor="logo-upload">Logo</Label>
      <div className="flex items-center gap-4">
        <div className="w-24 h-24 border-2 border-dashed rounded-lg flex items-center justify-center bg-muted">
          {preview ? (
            <Image
              src={preview}
              alt="Logo preview"
              width={80}
              height={80}
              className="object-contain"
            />
          ) : (
            <UploadCloud className="w-8 h-8 text-muted-foreground" />
          )}
        </div>
        <div className="space-y-2">
          <Input id="logo-upload" type="file" onChange={handleFileChange} className="max-w-xs" />
          <p className="text-xs text-muted-foreground">
            PNG, JPG, SVG up to 2MB.
          </p>
        </div>
      </div>
       <Button>Save Logo</Button>
    </div>
  );
}
