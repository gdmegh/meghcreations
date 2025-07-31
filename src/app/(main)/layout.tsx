import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 px-4 md:px-8">{children}</main>
      <Footer />
    </div>
  );
}
