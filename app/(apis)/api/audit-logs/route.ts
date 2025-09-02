import { NextRequest, NextResponse } from "next/server";
import { AuditLog } from "@/types/auditLog";

const EVENT_TYPES = ["CREATE", "UPDATE", "DELETE", "READ", "LOGIN", "LOGOUT"] as const;
const RESOURCES = ["document", "user", "settings", "report", "dashboard"] as const;

const mockAuditLogs: AuditLog[] = Array.from({ length: 1000 }, (_, i) => ({
  id: `log-${i + 1}`,
  timestamp: new Date(
    Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
  ).toISOString(),
  eventType: EVENT_TYPES[Math.floor(Math.random() * EVENT_TYPES.length)],
  userId: `user-${Math.floor(Math.random() * 50) + 1}`,
  userName: `User ${Math.floor(Math.random() * 50) + 1}`,
  resource: RESOURCES[Math.floor(Math.random() * RESOURCES.length)],
  details: `Performed action on resource with ID ${Math.floor(
    Math.random() * 1000
  )}`,
  ipAddress: `192.168.1.${Math.floor(Math.random() * 255)}`,
  userAgent:
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
}));

export async function GET(request: NextRequest) {
  return NextResponse.json(mockAuditLogs, {
    status: 200,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}
