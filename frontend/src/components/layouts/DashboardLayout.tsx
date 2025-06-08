import { type ReactNode } from "react";
import Header from "./Header.tsx";
import Footer from "./Footer.tsx";

type DashboardLayoutProps = {
  children: ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />

      <main className="flex-1 container mx-auto px-4">{children}</main>

      <Footer />
    </div>
  );
};

export default DashboardLayout;
