
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";


export default function AdminPermissionsPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold font-headline">Permission Management</h1>
        <p className="text-muted-foreground">
          Configure what each role can do.
        </p>
      </div>
      <Card>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Permission</TableHead>
                        <TableHead className="text-center">Admin</TableHead>
                        <TableHead className="text-center">Seller</TableHead>
                        <TableHead className="text-center">Customer</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>Access Admin Panel</TableCell>
                        <TableCell className="text-center"><Checkbox checked disabled /></TableCell>
                        <TableCell className="text-center"><Checkbox /></TableCell>
                        <TableCell className="text-center"><Checkbox /></TableCell>
                    </TableRow>
                     <TableRow>
                        <TableCell>Create Products</TableCell>
                        <TableCell className="text-center"><Checkbox checked /></TableCell>
                        <TableCell className="text-center"><Checkbox checked /></TableCell>
                        <TableCell className="text-center"><Checkbox /></TableCell>
                    </TableRow>
                     <TableRow>
                        <TableCell>Edit Own Products</TableCell>
                        <TableCell className="text-center"><Checkbox checked /></TableCell>
                        <TableCell className="text-center"><Checkbox checked /></TableCell>
                        <TableCell className="text-center"><Checkbox /></TableCell>
                    </TableRow>
                     <TableRow>
                        <TableCell>Edit Any Product</TableCell>
                        <TableCell className="text-center"><Checkbox checked /></TableCell>
                        <TableCell className="text-center"><Checkbox /></TableCell>
                        <TableCell className="text-center"><Checkbox /></TableCell>
                    </TableRow>
                     <TableRow>
                        <TableCell>Purchase Products</TableCell>
                        <TableCell className="text-center"><Checkbox checked /></TableCell>
                        <TableCell className="text-center"><Checkbox checked /></TableCell>
                        <TableCell className="text-center"><Checkbox checked /></TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <div className="flex justify-end mt-6">
                <Button>Save Permissions</Button>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
