
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AdminDashboardPage() {
  return (
      <div className="flex items-center justify-center rounded-lg border border-dashed shadow-sm">
        <div className="flex flex-col items-center gap-1 text-center p-8">
          <h1 className="text-2xl font-bold tracking-tight">
            Welcome to your Dashboard
          </h1>
          <p className="text-sm text-muted-foreground">
            You can manage your site from here. Select a menu item to get started.
          </p>
        </div>
      </div>
  );
}
