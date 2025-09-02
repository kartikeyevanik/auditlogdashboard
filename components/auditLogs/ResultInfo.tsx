import { ResultsInfoProps } from "@/types/auditLog";

const ResultsInfo = ({ currentItems, totalItems }:ResultsInfoProps) => {
  return (
    <div className="mb-4">
      <p className="text-gray-600">
        Showing {currentItems} of {totalItems} logs
      </p>
    </div>
  );
};

export default ResultsInfo;