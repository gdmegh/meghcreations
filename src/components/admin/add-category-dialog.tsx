
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
import { useEffect, useState } from "react"
import type { Category } from "@/lib/constants"
import { getCategories } from "@/services/data.service"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

interface AddCategoryDialogProps {
  children?: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  category?: Category;
  onFinished?: () => void;
}

export function AddCategoryDialog({ children, isOpen, setIsOpen, category, onFinished }: AddCategoryDialogProps) {
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [parentId, setParentId] = useState<string | undefined>(undefined);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
        async function loadCategories() {
            const fetchedCategories = await getCategories();
            // Exclude the current category from the list of potential parents
            setAllCategories(fetchedCategories.filter(c => c.id !== category?.id));
        }
        loadCategories();

        if (category) {
          setName(category.name);
          setParentId(category.parentId);
        } else {
          setName("");
          setParentId(undefined);
        }
    }
  }, [isOpen, category]);

  const handleSave = () => {
    const action = category ? "Updating" : "Saving";
    const verb = category ? "Updated" : "Created";
    
    console.log(`${action} category:`, { id: category?.id, name, parentId });
    
    toast({
        title: `Category ${verb}!`,
        description: `The category "${name}" has been successfully ${verb.toLowerCase()}.`,
    });
    
    if(onFinished) onFinished();
    setIsOpen(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{category ? 'Edit Category' : 'Add New Category'}</DialogTitle>
          <DialogDescription>
            {category ? 'Update the category details.' : 'Create a new product category.'} Click save when you're done.
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
            <Select onValueChange={(value) => setParentId(value === 'none' ? undefined : value)} value={parentId || 'none'}>
              <SelectTrigger id="parent" className="col-span-3">
                <SelectValue placeholder="Select a parent (optional)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">No Parent</SelectItem>
                {allCategories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
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
