
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";


export default function AdminRolesPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-headline">Role Management</h1>
          <p className="text-muted-foreground">
            Define roles and their permissions.
          </p>
        </div>
        <Button>
            <PlusCircle className="mr-2 h-4 w-4"/>
            Add Role
        </Button>
      </div>
      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Role</TableHead>
                <TableHead>Permissions</TableHead>
                <TableHead>
                    <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell>Admin</TableCell>
                    <TableCell>All</TableCell>
                    <TableCell>
                        <Button variant="outline" size="sm">Edit</Button>
                    </TableCell>
                </TableRow>
                 <TableRow>
                    <TableCell>Seller</TableCell>
                    <TableCell>Manage own products, view sales</TableCell>
                    <TableCell>
                        <Button variant="outline" size="sm">Edit</Button>
                    </TableCell>
                </TableRow>
                 <TableRow>
                    <TableCell>Customer</TableCell>
                    <TableCell>Browse products, purchase</TableCell>
                    <TableCell>
                        <Button variant="outline" size="sm">Edit</Button>
                    </TableCell>
                </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
