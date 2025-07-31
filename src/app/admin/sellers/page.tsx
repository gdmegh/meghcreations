
"use client"

import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getSellers } from "@/services/data.service";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import type { Seller } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge";
import { AddUserDialog } from "@/components/admin/add-user-dialog";


export default function AdminSellersPage() {
  const [users, setUsers] = useState<Seller[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadUsers() {
      setIsLoading(true);
      const fetchedUsers = await getSellers();
      setUsers(fetchedUsers);
      setIsLoading(false);
    }
    loadUsers();
  }, []);
  
  const getStatus = (index: number) => {
    if (index % 3 === 0) return { variant: "secondary", text: "Pending Approval" };
    if (index % 4 === 0) return { variant: "destructive", text: "Suspended" };
    return { variant: "outline", text: "Active" };
  }

  return (
    <div className="space-y-4">
       <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-headline">Seller Management</h1>
          <p className="text-muted-foreground">
            A list of all sellers on the platform.
          </p>
        </div>
        <AddUserDialog />
      </div>
      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Seller</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total Sales</TableHead>
                <TableHead>
                    <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    Loading sellers...
                  </TableCell>
                </TableRow>
              ) : users.map((user, index) => {
                const status = getStatus(index);
                return (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.profilePictureUrl} alt={user.displayName} data-ai-hint="person face" />
                          <AvatarFallback>{user.displayName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{user.displayName}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={status.variant as any}>{status.text}</Badge>
                    </TableCell>
                    <TableCell>{user.totalSales || 0}</TableCell>
                    <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>View details</DropdownMenuItem>
                         {status.text === "Pending Approval" && (
                          <DropdownMenuItem>Approve</DropdownMenuItem>
                        )}
                        {status.text !== "Suspended" ? (
                           <DropdownMenuItem>Suspend</DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem>Unsuspend</DropdownMenuItem>
                        )}
                        
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => navigator.clipboard.writeText(user.id)}
                        >
                          Copy user ID
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
