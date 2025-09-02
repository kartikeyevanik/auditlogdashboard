import { create } from "zustand";
import { AuditLog } from "@/types/auditLog";

interface AuditLogState {
    logs: AuditLog[];
    loading: boolean;
    error: string | null;
    fetchLogs: () => Promise<void>;
    clearLogs: () => void;
}

export const useAuditLogStore = create<AuditLogState>((set) => ({
    logs: [],
    loading: false,
    error: null,

    fetchLogs: async () => {
        set({ loading: true, error: null });
        try {
            const res = await fetch("http://localhost:3000/api/audit-logs");
            if (!res.ok) throw new Error("Failed to fetch audit logs");

            const data: AuditLog[] = await res.json();
            set({ logs: data, loading: false });
        } catch (err: any) {
            set({ error: err.message ?? "Unknown error", loading: false });
        }
    },

    clearLogs: () => set({ logs: [] }),
}));
