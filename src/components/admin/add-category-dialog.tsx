
"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PlusCircle } from "lucide-react"
import { useEffect, useState } from "react"
import type { Category } from "@/lib/constants"
import { getCategories } from "@/services/data.service"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

export function AddCategoryDialog() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [parentId, setParentId] = useState<string | undefined>(undefined);
  const { toast } = useToast();


  useEffect(() => {
    if (open) {
        async function loadCategories() {
            const fetchedCategories = await getCategories();
            setCategories(fetchedCategories);
        }
        loadCategories();
    }
  }, [open]);

  const handleSave = () => {
    // In a real app, you would call a server function to save the new category to Firestore.
    // For now, we'll just log it and show a toast.
    console.log("Saving new category:", { name, parentId });
    
    toast({
        title: "Category Saved!",
        description: `The category "${name}" has been created.`,
    });

    // Reset state and close dialog
    setName("");
    setParentId(undefined);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
            <PlusCircle className="mr-2 h-4 w-4"/>
            Add Category
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Category</DialogTitle>
          <DialogDescription>
            Create a new product category. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input 
              id="name" 
              placeholder="e.g. UI Kits" 
              className="col-span-3" 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="parent" className="text-right">
              Parent
            </Label>
            <Select onValueChange={setParentId} value={parentId}>
              <SelectTrigger id="parent" className="col-span-3">
                <SelectValue placeholder="Select a parent (optional)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">No Parent</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleSave} disabled={!name}>Save Category</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
