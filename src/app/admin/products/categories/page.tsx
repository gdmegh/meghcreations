
"use client";

import { useEffect, useState } from "react";
import { Edit, Trash2 } from "lucide-react";
import type { Category } from "@/lib/constants";
import { getCategories, deleteCategory } from "@/services/data.service";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AddCategoryDialog } from "@/components/admin/add-category-dialog";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";
import { useToast } from "@/hooks/use-toast";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddEditDialogOpen, setIsAddEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | undefined>(undefined);
  const { toast } = useToast();


  const loadCategories = async () => {
    setIsLoading(true);
    const fetchedCategories = await getCategories();
    setCategories(fetchedCategories);
    setIsLoading(false);
  }

  useEffect(() => {
    loadCategories();
  }, []);
  
  const handleAdd = () => {
    setSelectedCategory(undefined);
    setIsAddEditDialogOpen(true);
  }

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

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-headline">Category Management</h1>
          <p className="text-muted-foreground">
            A list of all product categories on the platform.
          </p>
        </div>
        <AddCategoryDialog 
          isOpen={isAddEditDialogOpen}
          setIsOpen={setIsAddEditDialogOpen}
          category={selectedCategory}
          onFinished={loadCategories}
        >
          <Button onClick={handleAdd}>Add Category</Button>
        </AddCategoryDialog>
      </div>
      <Card>
        <CardContent className="pt-6">
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

