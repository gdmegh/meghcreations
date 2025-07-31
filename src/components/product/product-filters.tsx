
"use client";

import {
  Card,
  CardContent
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { getCategories } from "@/services/data.service";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import type { Category } from "@/lib/constants";

export function ProductFilters() {
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    async function fetchCategories() {
      const cats = await getCategories();
      setCategories([{id: 'all', name: 'All Categories', createdAt: new Date()}, ...cats]);
    }
    fetchCategories();
  }, []);

  return (
    <Card>
      <CardContent className="p-4">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 items-center">
          <div className="relative">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input id="search" placeholder="Search products..." className="pl-10" />
          </div>
          <div className="space-y-2">
            <Select>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Slider
              id="price-range"
              defaultValue={[50]}
              max={200}
              step={1}
              className="pt-2"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>$0</span>
              <span>$200</span>
            </div>
          </div>
          <Button variant="ghost" className="w-full">
            Reset Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
