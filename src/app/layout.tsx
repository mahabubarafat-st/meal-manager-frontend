"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";
import Link from "next/link";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-slate-50 text-slate-900`}>
        {/* Background Logo */}
        <div aria-hidden="true" className="fixed inset-0 z-0 flex items-center justify-center pointer-events-none select-none">
          <Image src="/cuet.png" alt="CUET Logo" className="w-2/3 max-w-2xl opacity-10 object-contain" width={500} height={500} />
        </div>
        {/* Top Navbar */}
        <nav className="relative z-10 w-full bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <Image src="/cuet.png" alt="CUET Logo" className="h-10 w-10 object-contain" width={40} height={40} />
            <span className="text-2xl font-bold tracking-tight">Meal Manager</span>
          </div>
          <div className="flex items-center gap-2">
            <NavigationMenu>
              <NavigationMenuList className="flex flex-row gap-6">
                <NavigationMenuItem>
                  <Link href="/home" className="nav-link">Home</Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/recharge" className="nav-link">Recharge</Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/settings" className="nav-link">Settings</Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/login" className="nav-link">Student Login</Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/admin/login" className="nav-link">Admin Login</Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/admin/dashboard" className="nav-link">Admin Dashboard</Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/admin/reports" className="nav-link">Admin Reports</Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/admin/settings" className="nav-link">Admin Settings</Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/hall-dashboard" className="nav-link">Hall Dining Dashboard</Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/admin/hall-provost" className="nav-link">Hall Provost</Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </nav>
        {/* Main Content */}
        <main className="relative z-10 p-10 min-h-[80vh] flex flex-col">
          <div className="flex-1">
            {children}
          </div>
        </main>
        <footer className="w-full text-center py-6 bg-white border-t border-slate-200 text-gray-500 text-sm mt-auto relative z-10">
          &copy; {new Date().getFullYear()} <a href="/creator" className="text-blue-600 hover:underline">Mahabub Arafat</a>. All rights reserved.
        </footer>
        <style jsx global>{`
          .nav-link {
            position: relative;
            padding: 0.25rem 0.5rem;
            border-radius: 0.375rem;
            transition: background 0.2s, color 0.2s, box-shadow 0.2s, transform 0.1s;
            font-weight: 500;
            outline: none;
            box-shadow: none;
            text-decoration: none;
          }
          .nav-link:active {
            background: #e0e7ff;
            color: #3730a3;
            transform: scale(0.96);
            box-shadow: 0 2px 8px 0 #a5b4fc55;
          }
          .nav-link:focus {
            box-shadow: 0 0 0 2px #6366f1;
          }
          .nav-link:hover {
            background: #f1f5f9;
            color: #1e293b;
            text-decoration: none;
          }
        `}</style>
      </body>
    </html>
  );
}