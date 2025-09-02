import { AuditLogFiltersProps } from "@/types/auditLog";

// components/AuditLogFilters.jsx
const AuditLogFilters = ({ filters, onFilterChange, onClearFilters }: AuditLogFiltersProps) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        onFilterChange({
            ...filters,
            [name]: value
        });
    };

    return (
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Filters</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
                <div className="flex flex-col">
                    <label htmlFor="eventType" className="text-sm font-medium text-gray-700 mb-1">
                        Event Type
                    </label>
                    <input
                        type="text"
                        id="eventType"
                        name="eventType"
                        value={filters.eventType}
                        onChange={handleInputChange}
                        placeholder="Filter by event type"
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="userName" className="text-sm font-medium text-gray-700 mb-1">
                        User
                    </label>
                    <input
                        type="text"
                        id="userName"
                        name="userName"
                        value={filters.userName}
                        onChange={handleInputChange}
                        placeholder="Filter by user name"
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="resource" className="text-sm font-medium text-gray-700 mb-1">
                        Resource
                    </label>
                    <input
                        type="text"
                        id="resource"
                        name="resource"
                        value={filters.resource}
                        onChange={handleInputChange}
                        placeholder="Filter by resource"
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="startDate" className="text-sm font-medium text-gray-700 mb-1">
                        Start Date
                    </label>
                    <input
                        type="date"
                        id="startDate"
                        name="startDate"
                        value={filters.startDate}
                        onChange={handleInputChange}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="endDate" className="text-sm font-medium text-gray-700 mb-1">
                        End Date
                    </label>
                    <input
                        type="date"
                        id="endDate"
                        name="endDate"
                        value={filters.endDate}
                        onChange={handleInputChange}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            <button
                onClick={onClearFilters}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors text-sm"
            >
                Clear Filters
            </button>
        </div>
    );
};

export default AuditLogFilters;