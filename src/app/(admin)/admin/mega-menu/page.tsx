// src/app/(admin)/admin/mega-menu/page.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function MegaMenuPage() {
  return (
    <div className="p-4 md:p-8">
      <h1 className="text-3xl font-bold font-headline mb-6">Mega Menu Setup</h1>
      <Card>
        <CardHeader>
          <CardTitle>Configure Your Mega Menu</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="menu-item-1">Menu Item 1</Label>
            <Input id="menu-item-1" placeholder="e.g., UI Kits" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="menu-item-2">Menu Item 2</Label>
            <Input id="menu-item-2" placeholder="e.g., Themes" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="menu-item-3">Menu Item 3</Label>
            <Input id="menu-item-3" placeholder="e.g., Icons" />
          </div>
          <Button>Save Menu</Button>
        </CardContent>
      </Card>
    </div>
  );
}
