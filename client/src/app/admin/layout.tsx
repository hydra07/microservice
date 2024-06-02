'use client'
import SideNav from "@/components/ui/admin/sidenav";
import isAuth from "@/components/privateRouter";// Adjust the import path accordingly

function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen flex-col md:flex-row pt-[56px] md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}

export default isAuth(AdminLayout);