"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { useAuditLogStore } from "@/store/auditLog";
import AuditLogFilters from "@/components/auditLogs/AuditLogFilters";
import AuditLogTable from "@/components/auditLogs/AuditLogTable";
import Pagination from "@/components/Pagination";
import ResultsInfo from "@/components/auditLogs/ResultInfo";
import { AuditLogFiltersT } from "@/types/auditLog";

export default function AuditLogList() {
    const { logs, loading, error, fetchLogs } = useAuditLogStore();
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [filters, setFilters] = useState<AuditLogFiltersT>({
        eventType: "",
        userName: "",
        resource: "",
        startDate: "",
        endDate: ""
    });

    useEffect(() => {
        fetchLogs();
    }, [fetchLogs]);

    // Memoize filtered logs to avoid recalculating on every render
    const filteredLogs = useMemo(() => {
        return logs.filter(log => {
            const matchesEventType = !filters.eventType ||
                log.eventType.toLowerCase().includes(filters.eventType.toLowerCase());
            const matchesUserName = !filters.userName ||
                log.userName.toLowerCase().includes(filters.userName.toLowerCase());
            const matchesResource = !filters.resource ||
                log.resource.toLowerCase().includes(filters.resource.toLowerCase());

            // Date filtering
            let matchesDate = true;
            if (filters.startDate) {
                const startDate = new Date(filters.startDate);
                const logDate = new Date(log.timestamp);
                matchesDate = matchesDate && logDate >= startDate;
            }
            if (filters.endDate) {
                const endDate = new Date(filters.endDate);
                endDate.setHours(23, 59, 59, 999); // Set to end of day
                const logDate = new Date(log.timestamp);
                matchesDate = matchesDate && logDate <= endDate;
            }

            return matchesEventType && matchesUserName && matchesResource && matchesDate;
        });
    }, [logs, filters]);

    // Memoize pagination data
    const paginationData = useMemo(() => {
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentLogs = filteredLogs.slice(indexOfFirstItem, indexOfLastItem);
        const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);

        return { currentLogs, totalPages };
    }, [currentPage, itemsPerPage, filteredLogs]);

    // Memoize the paginate function
    const paginate = useCallback((pageNumber: number) => {
        setCurrentPage(pageNumber);
    }, []);

    // Memoize the filter change handler
    const handleFilterChange = useCallback((newFilters: AuditLogFiltersT) => {
        setFilters(newFilters);
        setCurrentPage(1); // Reset to first page when filters change
    }, []);

    // Memoize the clear filters function
    const clearFilters = useCallback(() => {
        const emptyFilters = {
            eventType: "",
            userName: "",
            resource: "",
            startDate: "",
            endDate: ""
        };
        setFilters(emptyFilters);
        setCurrentPage(1);
    }, []);

    if (loading) return (
        <div className="flex justify-center items-center h-64">
            <div className="text-xl text-gray-600">Loading logs...</div>
        </div>
    );

    if (error) return (
        <div className="flex justify-center items-center h-64">
            <div className="text-xl text-red-600">Error: {error}</div>
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Audit Logs</h2>
            <div className="max-h-[80vh] overflow-y-auto">
                {/* Filter Section */}
                <AuditLogFilters
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    onClearFilters={clearFilters}
                />

                {/* Results Count */}
                <ResultsInfo
                    currentItems={paginationData.currentLogs.length}
                    totalItems={filteredLogs.length}
                />

                {/* Table */}
                <AuditLogTable logs={paginationData.currentLogs} />

                {/* Pagination */}
                {filteredLogs.length > 0 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={paginationData.totalPages}
                        onPageChange={paginate}
                    />
                )}
            </div>
        </div>
    );
}