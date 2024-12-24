import React from "react";
import { CheckCircle2, AlertCircle, Clock } from "lucide-react";

const StatusBadge: React.FC<{ status: "pending" | "completed" | "failed" }> = ({
  status,
}) => {
  const config = {
    completed: {
      Icon: CheckCircle2,
      className: "bg-green-50 text-green-700 border-green-200",
    },
    failed: {
      Icon: AlertCircle,
      className: "bg-red-50 text-red-700 border-red-200",
    },
    pending: {
      Icon: Clock,
      className: "bg-blue-50 text-blue-700 border-blue-200",
    },
  };

  const { Icon, className } = config[status];

  return (
    <span
      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border ${className} text-xs font-medium capitalize`}
    >
      <Icon className="w-3.5 h-3.5" />
      {status}
    </span>
  );
};

export default StatusBadge;
