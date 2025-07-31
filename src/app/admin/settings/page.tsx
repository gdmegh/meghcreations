
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
import { Separator } from "@/components/ui/separator";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";


export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-headline">General Settings</h1>
        <p className="text-muted-foreground">
          Manage your marketplace settings and configurations.
        </p>
      </div>
      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Site Configuration</CardTitle>
          <CardDescription>
            Update your site's branding and general information.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Site Name</Label>
            <Input defaultValue="MeghMarket" />
          </div>
          <div className="space-y-2">
            <Label>Logo</Label>
            <div className="flex items-center gap-4">
                <div className="w-20 h-20 border-2 border-dashed rounded-lg flex items-center justify-center bg-muted">
                    <p className="text-xs text-muted-foreground">Logo</p>
                </div>
                 <Button variant="outline" type="button">Upload New Logo</Button>
            </div>
          </div>
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
