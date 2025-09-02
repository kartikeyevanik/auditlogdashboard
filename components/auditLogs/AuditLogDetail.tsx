"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuditLogStore } from "@/store/auditLog";
import { AuditLog } from "@/types/auditLog";
import Link from "next/link";

export default function AuditLogDetail() {
    const params = useParams();
    const router = useRouter();
    const { logs, loading, fetchLogs } = useAuditLogStore();
    const [log, setLog] = useState<AuditLog | null>(null);

    useEffect(() => {
        if (logs.length === 0) {
            fetchLogs();
        }
    }, [logs, fetchLogs]);

    useEffect(() => {
        if (params.id && logs.length > 0) {
            const foundLog = logs.find(l => l.id === params.id);
            if (foundLog) {
                setLog(foundLog);
            }
        }
    }, [params.id, logs]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-xl text-gray-600">Loading log details...</div>
            </div>
        );
    }

    if (!log) {
        return (
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                    <h2 className="text-xl font-semibold text-red-800 mb-2">Log Not Found</h2>
                    <p className="text-red-600 mb-4">The requested audit log could not be found.</p>
                    <Link
                        href="/dashboard"
                        className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                    >
                        Back to Audit Logs
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="mb-6">
                <Link
                    href="/dashboard"
                    className="inline-flex items-center text-blue-500 hover:text-blue-700 transition-colors mb-4"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    Back to Audit Logs
                </Link>
                <h1 className="text-3xl font-bold text-gray-800">Audit Log Details</h1>
            </div>

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-medium text-gray-800">Log Information</h2>
                </div>

                <div className="px-6 py-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-sm font-medium text-gray-500 uppercase mb-1">Log ID</h3>
                            <p className="text-gray-800 font-mono">{log.id}</p>
                        </div>

                        <div>
                            <h3 className="text-sm font-medium text-gray-500 uppercase mb-1">Timestamp</h3>
                            <p className="text-gray-800">{new Date(log.timestamp).toLocaleString()}</p>
                        </div>

                        <div>
                            <h3 className="text-sm font-medium text-gray-500 uppercase mb-1">User</h3>
                            <p className="text-gray-800">{log.userName}</p>
                        </div>

                        <div>
                            <h3 className="text-sm font-medium text-gray-500 uppercase mb-1">Event Type</h3>
                            <p className="text-gray-800">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                    {log.eventType}
                                </span>
                            </p>
                        </div>

                        <div className="md:col-span-2">
                            <h3 className="text-sm font-medium text-gray-500 uppercase mb-1">Resource</h3>
                            <p className="text-gray-800">{log.resource}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Additional Details Section - You can expand this based on your data structure */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden mt-6">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-medium text-gray-800">Additional Information</h2>
                </div>

                <div className="px-6 py-4">
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <h3 className="text-sm font-medium text-gray-500 uppercase mb-1">Full Timestamp</h3>
                            <p className="text-gray-800">{new Date(log.timestamp).toString()}</p>
                        </div>

                        <div>
                            <h3 className="text-sm font-medium text-gray-500 uppercase mb-1">ISO Timestamp</h3>
                            <p className="text-gray-800 font-mono text-sm">{log.timestamp}</p>
                        </div>

                        {/* Add more fields as needed based on your AuditLog type */}
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex justify-end space-x-4">
                <button
                    onClick={() => router.push('/dashboard')}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                    Back to List
                </button>

                {/* Add more actions as needed, e.g., export, share, etc. */}
                <button
                    onClick={() => window.print()}
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                >
                    Print Details
                </button>
            </div>
        </div>
    );
}