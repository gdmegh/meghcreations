
"use client";

import { useEffect, useState } from "react";
import { Edit, Loader2, Trash2 } from "lucide-react";
import type { Category } from "@/lib/constants";
import { getCategories, deleteCategory, addCategory } from "@/services/data.service";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AddCategoryDialog } from "@/components/admin/add-category-dialog";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddEditDialogOpen, setIsAddEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | undefined>(undefined);
  const { toast } = useToast();

  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryParentId, setNewCategoryParentId] = useState<string>('none');
  const [isAdding, setIsAdding] = useState(false);


  const loadCategories = async () => {
    setIsLoading(true);
    const fetchedCategories = await getCategories();
    setCategories(fetchedCategories);
    setIsLoading(false);
  }

  useEffect(() => {
    loadCategories();
  }, []);
  
  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    setIsAddEditDialogOpen(true);
  }
  
  const handleDelete = (category: Category) => {
    setSelectedCategory(category);
    setIsDeleteDialogOpen(true);
  }

  const onConfirmDelete = async () => {
    if (!selectedCategory) return;
    try {
      await deleteCategory(selectedCategory.id);
      toast({
        title: "Category Deleted",
        description: `The category "${selectedCategory.name}" has been deleted.`,
      });
      setIsDeleteDialogOpen(false);
      setSelectedCategory(undefined);
      loadCategories(); // Re-fetch categories
    } catch(error) {
       toast({
        title: "Delete Failed",
        description: "Could not delete the category. Please try again.",
        variant: "destructive",
      });
    }
  }

  const getParentCategoryName = (parentId?: string) => {
    if (!parentId) return 'N/A';
    const parent = categories.find(c => c.id === parentId);
    return parent ? parent.name : 'Unknown';
  };
  
  const handleAddNewCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName) {
      toast({ title: "Name is required", variant: "destructive" });
      return;
    }
    setIsAdding(true);
    try {
      await addCategory({ 
        name: newCategoryName, 
        parentId: newCategoryParentId === 'none' ? undefined : newCategoryParentId 
      });
      toast({ title: "Category Added!", description: `The category "${newCategoryName}" has been added.` });
      setNewCategoryName("");
      setNewCategoryParentId("none");
      loadCategories();
    } catch (error) {
      toast({ title: "Add Failed", description: "Could not add category.", variant: "destructive" });
    } finally {
      setIsAdding(false);
    }
  }


  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-headline">Category Management</h1>
        <p className="text-muted-foreground">
          Manage product categories on the platform.
        </p>
      </div>

       <Card>
        <CardHeader>
          <CardTitle>Add New Category</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddNewCategory} className="grid sm:grid-cols-3 gap-4 items-end">
            <div className="space-y-2">
              <Label htmlFor="new-category-name">Category Name</Label>
              <Input
                id="new-category-name"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="e.g. UI Kits"
                disabled={isAdding}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-category-parent">Parent Category</Label>
              <Select
                onValueChange={(value) => setNewCategoryParentId(value)}
                value={newCategoryParentId}
                disabled={isAdding}
              >
                <SelectTrigger id="new-category-parent">
                  <SelectValue placeholder="Select a parent (optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No Parent</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" disabled={isAdding || !newCategoryName}>
              {isAdding ? <><Loader2 className="animate-spin" /> Adding...</> : "Add Category"}
            </Button>
          </form>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Existing Categories</CardTitle>
          <CardDescription>View, edit, or delete existing categories.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Parent Category</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={3} className="h-24 text-center">
                    Loading categories...
                  </TableCell>
                </TableRow>
              ) : categories.length === 0 ? (
                 <TableRow>
                  <TableCell colSpan={3} className="h-24 text-center text-muted-foreground">
                    No categories found. Add one above to get started.
                  </TableCell>
                </TableRow>
              ) : categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell className="font-medium">{category.name}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {getParentCategoryName(category.parentId)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(category)}>
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(category)}>
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <AddCategoryDialog 
        isOpen={isAddEditDialogOpen}
        setIsOpen={setIsAddEditDialogOpen}
        category={selectedCategory}
        onFinished={loadCategories}
      />

      <ConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={onConfirmDelete}
        title="Are you sure?"
        description={`This will permanently delete the category "${selectedCategory?.name}". This action cannot be undone.`}
      />
    </div>
  );
}
