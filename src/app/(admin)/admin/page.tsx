// src/app/(admin)/admin/page.tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold font-headline mb-6">Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Welcome, Admin!</CardTitle>
            <CardDescription>
              Here's a quick overview of your marketplace.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              You can manage your site settings, mega menu, and more from the
              sidebar.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
