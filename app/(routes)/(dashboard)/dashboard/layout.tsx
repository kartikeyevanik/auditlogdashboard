import type { Metadata } from "next";
import "@/styles/globals.css";
import Sidebar from "@/components/Sidebar";



export const metadata: Metadata = {
    title: "Audit log dashboard",
    description: "we show log data to dash board",
};
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex">
            <Sidebar />
            {children}
        </div>
    );
}
