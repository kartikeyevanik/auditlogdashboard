import AuditLogList from "@/components/auditLogs/AuditLogs";
import Sidebar from "@/components/Sidebar";

export default function Page() {
    return (
        <div className="flex">
            <Sidebar />
            <AuditLogList />
        </div>
    )
}