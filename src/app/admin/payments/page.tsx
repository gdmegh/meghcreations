
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
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";


export default function AdminPaymentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-headline">Payments</h1>
        <p className="text-muted-foreground">
          View and manage all transactions and disbursements.
        </p>
      </div>
      <Card>
        <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>A log of the most recent payments.</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Transaction ID</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Buyer</TableHead>
                        <TableHead>Seller</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>txn_12345</TableCell>
                        <TableCell>$49.00</TableCell>
                        <TableCell>Buyer Name</TableCell>
                        <TableCell>Seller Name</TableCell>
                        <TableCell>2024-07-29</TableCell>
                        <TableCell>Completed</TableCell>
                    </TableRow>
                     <TableRow>
                        <TableCell>txn_12346</TableCell>
                        <TableCell>$29.99</TableCell>
                        <TableCell>Another Buyer</TableCell>
                        <TableCell>Another Seller</TableCell>
                        <TableCell>2024-07-28</TableCell>
                        <TableCell>Completed</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </CardContent>
      </Card>
       <Card>
        <CardHeader>
          <CardTitle>Payment & Disbursement</CardTitle>
          <CardDescription>
            Configure payment gateway settings. This is a placeholder UI.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
           <div className="space-y-2">
            <Label>Stripe API Key</Label>
            <Input type="password" placeholder="sk_test_••••••••••••••••••••••••" />
          </div>
           <div className="space-y-2">
            <Label>Disbursement Schedule</Label>
             <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a schedule" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
          </div>
          <Button>Save Payment Settings</Button>
        </CardContent>
      </Card>
    </div>
  );
}
