
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LogoUploader } from "@/components/admin/logo-uploader";

export default function AdminSettingsPage() {
  return (
    <div className="p-4 md:p-8">
      <h1 className="text-3xl font-bold font-headline mb-6">Settings</h1>
      <Card>
        <CardHeader>
          <CardTitle>Site Settings</CardTitle>
          <CardDescription>
            Manage your site's appearance and branding.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LogoUploader />
        </CardContent>
      </Card>
    </div>
  );
}
